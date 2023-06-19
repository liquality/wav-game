import NftPreview from "../../images/nft_preview.png";
import NftBigPreview from "../../images/nft_preview_big.png";

import { ReactComponent as DoubleArrow } from "../../images/double_arrow.svg";
import * as React from "react";
import { useState, useEffect } from "react";
import CustomButton from "../Button";
import {
  CHAIN_ID,
  WAV_NFT_ADDRESS,
  WAV_PROXY_ADDRESS,
} from "../../data/contract_data";
import {
  fetchSession,
  filterArrayByIdStartingWith,
  getGameIdBasedOnHref,
  getPrivateKey,
  getPublicKey,
} from "../../utils";
import { ethers } from "ethers";
import { NftService, TransactionService } from "@liquality/wallet-sdk";
import UserService from "../../services/UserService";

export const TradeStart = (props) => {
  const { setContent, gameContract, nftContract, setTxHash, userNfts } = props;
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [parsedNfts, setParsedNfts] = useState(null);

  const getArtist = async () => {
    const artist = await getGameIdBasedOnHref();
    return artist;
  };

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

  const parseNfts = async () => {
    const artist = await getArtist();
    console.log(userNfts, artist.number_id, "nr id");

    try {
      const nftsResult = await filterArrayByIdStartingWith(
        userNfts,
        artist.number_id
      );
      return nftsResult;
    } catch (err) {
      console.log(err, "Error fetching user");
    }
  };

  useEffect(() => {
    const init = async () => {
      if (userNfts) {
        const _parsedNfts = await parseNfts();
        console.log(_parsedNfts, "PARSED?");
        setParsedNfts(_parsedNfts);
      }
      if (!game) {
        const _game = await fetchGameByUserIdAndArtistId();
        setGame(_game);
      }
    };

    init();
  }, [game, userNfts]);

  console.log(parsedNfts, "parsednft");

  //LVL UP: A trade makes a player level up both in contract & in db
  const startTrade = async (data) => {
    try {
      const provider = new ethers.JsonRpcProvider(
        process.env.REACT_APP_RPC_URL
      );

      const artist = await getArtist();
      const privateKey = getPrivateKey();
      const signer = new ethers.Wallet(privateKey, provider);

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
        let txHashApproval = await TransactionService.sendGaslessly(
          WAV_NFT_ADDRESS,
          approvalTx.data,
          privateKey,
          CHAIN_ID
        );
      }

      let levelUpTx = await gameContract.levelUp.populateTransaction(
        artist?.number_id,
        game.level
      );

      let txHashLevelUp = await TransactionService.sendGaslessly(
        WAV_PROXY_ADDRESS,
        levelUpTx.data,
        privateKey,
        CHAIN_ID
      );

      if (txHashLevelUp) {
        //Lvl up in DB
        await UserService.levelUpTrade(
          {
            userId: fetchSession().id,
            gameId: artist?.number_id,
          },
          fetchSession().token
        );
        setTxHash(txHashLevelUp);
        setContent("processingTrade");
      } else {
        //Set transaction failed error msg
        setError("Transaction failed, please check the logs");
      }
    } catch (err) {
      console.log(err, "ERROR, Something with wrong with trade:");
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
              <p className="webfont coral text-2xl">Level 2</p>
              <p className=" mb-3">Trade 2 top live songs</p>
              <div className="flexDirectionRow">
                {/* Should be replaced with fetched nft contract image (2 nfts of live song) */}

                <img src={NftPreview} className="mr-1" alt="NFT Preview" />
                <img src={NftPreview} alt="NFT Preview" />
              </div>
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
              <p className="webfont coral text-2xl">Level 3</p>
              <p className="mb-3">Trade 2 top live songs</p>
              {/* Should be replaced with fetched nft contract image (nft of unreleased song) */}
              <img src={NftBigPreview} alt="NFT Preview" />
            </div>
          </div>
        </div>{" "}
      </div>
      <p>{error}</p>
    </div>
  );
};
