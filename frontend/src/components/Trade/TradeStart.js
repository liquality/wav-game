import { ReactComponent as DoubleArrow } from "../../images/double_arrow.svg";
import { useState, useEffect } from "react";
import CustomButton from "../Button";
import {
  CHAIN_ID,
  WAV_NFT_ADDRESS,
  WAV_PROXY_ADDRESS,
} from "../../data/contract_data";
import {
  fetchSession,
  getGameIdBasedOnHref,
  getPrivateKey,
  getPublicKey,
} from "../../utils";
import { NftService, TransactionService } from "@liquality/wallet-sdk";
import ContractService from "../../services/ContractService";
import UserService from "../../services/UserService";

const subtitleText = {
  1: { from: "Trade 2 Live Songs", to: "Get 1 Top Live Song" },
  2: {
    from: "Trade 2 Top Live Songs",
    to: "Get 1 Unreleased Song + Listening Room",
  },
  3: {
    from: "Trade 2 Unreleased Songs",
    to: "Get 1 Limited Physical Item",
    claimed:
      "All of this level's prizes have been claimed already! Keep trading for your chance to win other rewards and claim the full set holder rewards.",
  },
  4: {
    from: "Trade 2 Physical Items",
    to: "Get 1 custom-made song",
    claimed:
      "All of this level's prizes have been claimed already! Keep trading for your chance to win other rewards and claim the full set holder rewards.",
  },
  5: {
    from: "Trade 2 custom-made songs",
    to: "An entry into the raffle for a trip + 1:1 concert",
    claimed: "Each Level 6 card qualifies for a raffle entry.",
  },
};

export const TradeStart = (props) => {
  const { setContent, setTxStatus, userNfts, level, txStatus } = props;

  const toLevel = level + 1;
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [tokenIdForNewLevel, setTokenIdForNewLevel] = useState(null);
  const [tokenIdForCurrentLevel, setTokenIdForCurrentLevel] = useState(null);
  const [fromSubtitle, setFromSubtitle] = useState("");
  const [toSubtitle, setToSubtitle] = useState("");
  const [earlyBirdOpen, setEarlyBirdOpen] = useState(false);

  const subtitles = subtitleText[level];
  const getArtist = async () => {
    const artist = await getGameIdBasedOnHref();
    return artist;
  };

  useEffect(() => {
    const fetchGameByUserIdAndArtistId = async () => {
      const artist = await getArtist();
      try {
        const user = await UserService.getGameByUserId(
          fetchSession().id, //userid
          artist?.number_id,
          fetchSession().token
        );

        return user;
      } catch (err) {
        console.log(err, "Error fetching user");
      }
    };

    const getWhichTokenIdForLevel = async (levelUp) => {
      const artist = await getArtist();
      let firstChar = artist.number_id.toString()[0];
      return firstChar + 0 + levelUp;
    };

    const init = async () => {
      if (userNfts) {
        const _tokenIdForCurrentLevel = await getWhichTokenIdForLevel(level);
        const _tokenIdForNewLevel = await getWhichTokenIdForLevel(toLevel);
        setTokenIdForNewLevel(_tokenIdForNewLevel);
        setTokenIdForCurrentLevel(_tokenIdForCurrentLevel);
      }

      if (!game) {
        const _game = await fetchGameByUserIdAndArtistId();
        setGame(_game);
      }

      if (game) {
        const _earlyBirdOpen =
          await ContractService.canBecomeEarlyBirdCollector(
            game.game_symbol_id,
            toLevel
          );
        setEarlyBirdOpen(_earlyBirdOpen);
      }
    };

    if (earlyBirdOpen) {
      setToSubtitle(subtitles.to);
    } else {
      setToSubtitle(subtitles.claimed || subtitles.to);
    }
    setFromSubtitle(subtitles.from);

    init();
  }, [
    game,
    userNfts,
    tokenIdForNewLevel,
    tokenIdForCurrentLevel,
    level,
    txStatus,
    earlyBirdOpen,
  ]);

  //LVL UP: A trade makes a player level up both in contract & in db
  const startTrade = async (data) => {
    try {
      setContent("processingTrade");

      const artist = await getArtist();
      const privateKey = getPrivateKey();
      // Check approval
      const approved = await NftService.isApprovedForAll(
        WAV_NFT_ADDRESS,
        getPublicKey(),
        WAV_PROXY_ADDRESS,
        CHAIN_ID
      );

      if (!approved) {
        const approvalTxData = await ContractService.setApprovalForAllTxData();

        await TransactionService.sendGaslessly(
          WAV_NFT_ADDRESS,
          approvalTxData,
          privateKey,
          CHAIN_ID
        );
      }
      setTxStatus({
        txHash: null,
        submited: false,
        approval: true,
      });
      let levelUpTxData = await ContractService.levelUpTxData(
        artist?.number_id,
        level + 1
      );

      let txHashLevelUp = await TransactionService.sendGaslessly(
        WAV_PROXY_ADDRESS,
        levelUpTxData,
        privateKey,
        CHAIN_ID
      );

      setTxStatus({
        txHash: txHashLevelUp,
        submited: true,
        approval: true,
      });

      if (!txHashLevelUp) {
        //Set transaction failed error msg
        setError("Transaction failed, please check the logs");
      }
    } catch (err) {
      setError("Transaction failed, please check the logs");
      console.log("Error trade >> ", err);
    }
  };

  console.log(level, "LEVEL curr?");
  return (
    <div className="contentView flex justify-around container">
      <div className="p-4 flexDirectionRow">
        <div className="">
          {" "}
          <div className="grid grid-cols-3">
            <div className="flexDirectionColumn">
              <p className="webfont coral text-2xl">Level {level}</p>
              <p className=" mb-3">{fromSubtitle}</p>

              {/* Should be replaced with fetched nft contract image (2 nfts of live song) */}

              <div className="relative">
                {tokenIdForCurrentLevel ? (
                  <div className="flexDirectionRow">
                    <img
                      src={`https://wavgame-data.netlify.app/images/${tokenIdForCurrentLevel}.png`}
                      className="mr-1 nftPreviewTrade "
                      alt="NFT Preview"
                    />
                    <img
                      src={`https://wavgame-data.netlify.app/images/${tokenIdForCurrentLevel}.png`}
                      className="mr-1 nftPreviewTrade "
                      alt="NFT Preview"
                    />
                  </div>
                ) : null}
                {level === 1 ? (
                  <audio
                    controls
                    controlsList="nodownload"
                    data-testid="AssetMedia--audio"
                    loop
                    preload="auto"
                    src={`https://wavgame-data.netlify.app/songs/${tokenIdForCurrentLevel}.wav`}
                    style={{
                      zIndex: 9999999,
                      position: "absolute",
                      bottom: "-25%",
                      left: "2%",
                      height: 40,
                    }}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : null}
              </div>
            </div>

            <div className="pr-5 pt-5 mt-4 flexDirectionColumn m-start">
              <DoubleArrow className="m-auto " />
              <div className="m-auto ">
                <CustomButton
                  onClick={() => startTrade()}
                  pink
                  type="big"
                  mt="50px"
                  mb="50px"
                  ml="30%"
                >
                  TRADE
                </CustomButton>
              </div>

              <DoubleArrow className="m-auto" />
            </div>
            <div className="pr-5 flexDirectionColumn ">
              <p className="webfont coral text-2xl">Level {toLevel}</p>
              <p className="mb-3">{toSubtitle}</p>
              {/* Should be replaced with fetched nft contract image (nft of unreleased song) */}
              <div className="relative">
                {tokenIdForNewLevel && !isNaN(tokenIdForNewLevel) ? (
                  <img
                    src={`https://wavgame-data.netlify.app/images/${tokenIdForNewLevel}.png`}
                    className="nftBigPreviewTrade"
                    alt="NFT Preview"
                  />
                ) : null}

                {level === 1 ? (
                  <audio
                    controls
                    controlsList="nodownload"
                    data-testid="AssetMedia--audio"
                    loop
                    preload="auto"
                    src={`https://wavgame-data.netlify.app/songs/${tokenIdForNewLevel}.wav`}
                    style={{
                      zIndex: 9999999,
                      position: "absolute",
                      bottom: "3%",
                      right: "31%",
                      width: 180,
                      height: 30,
                    }}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : null}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="flexDirectionCol">
        <p>{error}</p>
      </div>
    </div>
  );
};
