import { useState, useEffect } from "react";

import { CustomModal } from "../Modal";
import { TradeStart } from "./TradeStart";
import { ProcessingTrade } from "./ProcessingTrade";
import { ethers } from "ethers";
import {
  CHAIN_ID,
  WAV_NFT_ABI,
  WAV_NFT_ADDRESS,
  WAV_PROXY_ABI,
  WAV_PROXY_ADDRESS,
} from "../../data/contract_data";
import { NftService } from "@liquality/wallet-sdk";
import { getPublicKey } from "../../utils";

export const TradeModal = (props) => {
  const { show, setShow, level, setLevel } = props;
  const [content, setContent] = useState("tradeStart");
  const [headerText, setHeaderText] = useState("Trade");
  const [nftContract, setNftContract] = useState(null);
  const [gameContract, setGameContract] = useState(null);
  const [wavContractNfts, setWavContractNfts] = useState(null);
  const [userNfts, setUserNfts] = useState(null);

  const [txHash, setTxHash] = useState(null);

  const showTradeModal = () => {
    setShow(!show);
    setLevel(level);
  };

  useEffect(() => {
    const initializeContract = async () => {
      try {
        //TODO use infura hardcoded url mumbai rpc
        const provider = new ethers.JsonRpcProvider(
          process.env.REACT_APP_RPC_URL
        );
        // Create a new instance of the contract using the ABI and address
        const nftContract = new ethers.Contract(
          WAV_NFT_ADDRESS,
          WAV_NFT_ABI,
          provider
        );
        const gameContract = new ethers.Contract(
          WAV_PROXY_ADDRESS,
          WAV_PROXY_ABI,
          provider
        );
        setNftContract(nftContract);
        setGameContract(gameContract);

        const contractNfts = await NftService.getNftsForContract(
          WAV_NFT_ADDRESS,
          CHAIN_ID
        );
        const userNfts = await NftService.getNfts(getPublicKey(), CHAIN_ID);
        setUserNfts(userNfts);
        setWavContractNfts(contractNfts);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initializeContract();
  }, []);

  const whichContentToRender = () => {
    if (content === "tradeStart") {
      return (
        <TradeStart
          userNfts={userNfts}
          setContent={setContent}
          gameContract={gameContract}
          nftContract={nftContract}
          setTxHash={setTxHash}
        />
      );
    } else if (content === "processingTrade") {
      return (
        <ProcessingTrade
          txHash={txHash}
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else return null;
  };

  return (
    <>
      <CustomModal
        show={show}
        setShow={setShow}
        content={whichContentToRender}
        modalHeaderText={headerText}
      >
        {" "}
        {whichContentToRender()}
      </CustomModal>
    </>
  );
};
