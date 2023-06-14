import { ReactComponent as NftPreview } from "../../images/nft_preview.svg";
import { ReactComponent as NftBigPreview } from "../../images/nft_preview_big.svg";

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
  getGameIdBasedOnHref,
  getPrivateKey,
  getPublicKey,
} from "../../utils";
import { ethers } from "ethers";
import { NftService, TransactionService } from "@liquality/wallet-sdk";
import UserService from "../../services/UserService";

export const TradeStart = (props) => {
  const { setContent, gameContract, nftContract, setTxHash } = props;
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  const getArtist = async () => {
    const artist = await getGameIdBasedOnHref();
    return artist;
  };

  const fetchGameByUserIdAndArtistId = async () => {
    const artist = await getArtist();
    try {
      const user = await UserService.getGameByUserId(
        fetchSession().id, //userid
        artist.number_id,
        fetchSession().token
      );

      return user;
    } catch (err) {
      console.log(err, "Error fetching user");
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!game) {
        const _game = await fetchGameByUserIdAndArtistId();
        setGame(_game);
      }
      const artist = await getArtist();

      const hej = await UserService.levelUpTrade(
        {
          userId: fetchSession().id,
          gameId: artist.number_id,
        },
        fetchSession().token
      );
      console.log(hej, "LEVELDED UP");
    };

    init();
  }, [game]);
  console.log(game, "what game?");

  //A trade makes a player level up both in contract & in db
  const startTrade = async (data) => {
    // Level UP
    try {
      const provider = new ethers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/Vnr65MaW03LZ6ri9KBKrOEZjjcmMGSQ3"
      );

      const artist = await getArtist();
      const privateKey = getPrivateKey();
      const signer = new ethers.Wallet(privateKey, provider);

      //TODO: based on artist.number_id & user_id, you have to get the game_level from userdb

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
        let txHashApproval = TransactionService.sendGaslessly(
          WAV_NFT_ADDRESS,
          approvalTx.data,
          privateKey,
          CHAIN_ID
        );
      }

      //TODO use SDK and gelato to call levelUp() gaslessly
      //TODO gameID should come from db
      let levelUpTx = await gameContract.levelUp.populateTransaction(
        artist.number_id,
        game.level
      );

      let txHashLevelUp = TransactionService.sendGaslessly(
        WAV_PROXY_ADDRESS,
        levelUpTx.data,
        privateKey,
        CHAIN_ID
      );

      if (txHashLevelUp) {
        //add a level in DB
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

  console.log(getPublicKey(), "pub key");

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

                <NftPreview className="mr-1 " />
                <NftPreview />
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
            <div className=" pr-5 flexDirectionColumn ">
              <p className="webfont coral text-2xl">Level 3</p>
              <p className=" mb-3">Trade 2 top live songs</p>
              {/* Should be replaced with fetched nft contract image (nft of unreleased song) */}
              <NftBigPreview />
            </div>
            <p>{error}</p>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
