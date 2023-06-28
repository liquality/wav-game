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
import UserService from "../../services/UserService";

const subtitleText = {
  1: { from: 'Trade 2 Live Songs', to: 'Get 1 Top Live Song' },
  2: { from: 'Trade 2 Top Live Songs', to: 'Get 1 Unreleased Song + Listening Room' },
  3: {
    from: 'Trade 2 Unreleased Songs', to: 'Get 1 Limited Physical Item',
    claimed: 'All of this level\'s prizes have been claimed already! Keep trading for your chance to win other rewards and claim the full set holder rewards.'
  },
  4: {
    from: 'Trade 2 Physical Items', to: 'Get 1 Unreleased Track Performance or Listening Party',
    claimed: 'All of this level\'s prizes have been claimed already! Keep trading for your chance to win other rewards and claim the full set holder rewards.'
  },
  5: {
    from: 'Trade 2 Unreleased Track Performances', to: 'Your Chance to Win',
    claimed: 'A winner for the 1-on-1 trip + concert has been claimed already! Keep trading for your chance to win the full set holder reward.'
  },

}


export const TradeStart = (props) => {
  const {
    setContent,
    gameContract,
    nftContract,
    setTxStatus,
    userNfts,
    level,
    txStatus,
  } = props;
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [tokenIdForNewLevel, setTokenIdForNewLevel] = useState(null);
  const [tokenIdForCurrentLevel, setTokenIdForCurrentLevel] = useState(null);
  const [fromSubtitle, setFromSubtitle] = useState('');
  const [toSubtitle, setToSubtitle] = useState('');
  const [burnStatus, setBurnStatus] = useState(false);

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
        const _tokenIdForNewLevel = await getWhichTokenIdForLevel(level + 1);
        setTokenIdForNewLevel(_tokenIdForNewLevel);
        setTokenIdForCurrentLevel(_tokenIdForCurrentLevel);
      }

      if (!game) {
        const _game = await fetchGameByUserIdAndArtistId();
        setGame(_game);
      }

      if (game) {
        const _burnStatus = await UserService.getLevelBurnStatus(
          game.game_symbol_id,
          level,
          getPublicKey()
        );

        setBurnStatus(_burnStatus);
      }
    };

    const subtitles = subtitleText[level];
    if (burnStatus) {
      setFromSubtitle(subtitles.claimed);
    } else {

      setFromSubtitle(subtitles.from);
    }
    setToSubtitle(subtitles.to);


    init();
  }, [
    game,
    userNfts,
    tokenIdForNewLevel,
    tokenIdForCurrentLevel,
    level,
    txStatus,
    burnStatus
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
        const approvalTx =
          await nftContract.setApprovalForAll.populateTransaction(
            WAV_PROXY_ADDRESS,
            true
          );
        await TransactionService.sendGaslessly(
          WAV_NFT_ADDRESS,
          approvalTx.data,
          privateKey,
          CHAIN_ID
        );
      }
      setTxStatus({
        txHash: null,
        submited: false,
        approval: true,
      });

      let levelUpTx = await gameContract.levelUp.populateTransaction(
        artist?.number_id,
        level + 1
      );

      let txHashLevelUp = await TransactionService.sendGaslessly(
        WAV_PROXY_ADDRESS,
        levelUpTx.data,
        privateKey,
        CHAIN_ID
      );
      console.log("txHashLevelUp >> ", txHashLevelUp)
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
    }
  };

  return (
    <div className="contentView flex justify-around">
      <div className="p-4 ml-5 flexDirectionRow ">
        <div>
          {" "}
          <div className="flexDirectionRow">
            <div className="flexDirectionColumn">
              <p className="webfont coral text-2xl">Level {level}</p>
              <p className=" mb-3">{fromSubtitle}</p>

              {/* Should be replaced with fetched nft contract image (2 nfts of live song) */}

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
            </div>

            <div className="pr-5 pt-5 mt-4 flexDirectionColumn m-start">
              <DoubleArrow className="m-auto" />
              <CustomButton
                onClick={() => startTrade()}
                pink
                type="big"
                mt="50px"
                mb="50px"
                ml="50px"
                mr="40px"
              >
                TRADE
              </CustomButton>

              <DoubleArrow className="m-auto" />
            </div>
            <div className="pr-5 flexDirectionColumn ">
              <p className="webfont coral text-2xl">Level {level + 1}</p>
              <p className="mb-3">{toSubtitle}</p>
              {/* Should be replaced with fetched nft contract image (nft of unreleased song) */}
              {tokenIdForNewLevel && !isNaN(tokenIdForNewLevel) ? (
                <img
                  src={`https://wavgame-data.netlify.app/images/${tokenIdForNewLevel}.png`}
                  className="nftBigPreviewTrade"
                  alt="NFT Preview"
                />
              ) : null}
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
