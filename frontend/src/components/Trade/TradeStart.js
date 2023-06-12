import { ReactComponent as NftPreview } from "../../images/nft_preview.svg";
import { ReactComponent as NftBigPreview } from "../../images/nft_preview_big.svg";

import { ReactComponent as DoubleArrow } from "../../images/double_arrow.svg";
import * as React from "react";
import { useState, useEffect } from "react";
import CustomButton from "../Button";
import { WAV_NFT_ADDRESS, WAV_PROXY_ADDRESS } from "../../data/contract_data";
import { getGameIdBasedOnHref, getPrivateKey, getPublicKey } from "../../utils";
import { ethers } from "ethers";

export const TradeStart = (props) => {
  const { setContent, gameContract, nftContract, setTxHash } = props;
  const [nftAmount, setNftAmount] = useState(1);

  const getArtist = async () => {
    const artist = await getGameIdBasedOnHref();
    return artist;
  };

  //A trade makes a player level up
  const startTrade = async (data) => {
    // Level UP
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/Vnr65MaW03LZ6ri9KBKrOEZjjcmMGSQ3"
      );
      const artist = await getArtist();
      const signer = new ethers.Wallet(getPrivateKey(), provider);

      //TODO: based on artist.number_id & user_id, you have to get the game_level from userdb
      console.log(
        "PK:",
        getPrivateKey(),
        "PUBLIC ADDRESS:",
        getPublicKey(),
        "SIGNER OBJ:",
        signer
      );

      /*      const mint = await gameContract
        .connect(signer)
        .collect(1000, getPublicKey(), 1, {
          value: ethers.utils.parseEther("0.0005"),
        });  */

      // Check approval
      const approved = await nftContract.isApprovedForAll(
        getPublicKey(),
        WAV_PROXY_ADDRESS
      );

      if (!approved) {
        const getApprovalHash = await nftContract
          .connect(signer)
          .setApprovalForAll(WAV_PROXY_ADDRESS, true);
      }

      //TODO use SDK and gelato to call levelUp() gaslessly
      //TODO gameID should come from db
      let txHashLevelUp = await gameContract
        .connect(signer)
        .levelUp(artist.number_id, 2);
      //TODO: add level up to db here

      setTxHash(txHashLevelUp);
      setContent("processingTrade");
    } catch (err) {
      console.log("Something with wrong with trade ERROR:", err);
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
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
