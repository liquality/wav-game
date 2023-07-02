import { useState, useEffect, useContext } from "react";

import { CustomModal } from "../Modal";
import { TradeStart } from "./TradeStart";
import { ProcessingTrade } from "./ProcessingTrade";
import { ethers } from "ethers";
import {
  WAV_NFT_ABI,
  WAV_NFT_ADDRESS,
  WAV_PROXY_ABI,
  WAV_PROXY_ADDRESS,
} from "../../data/contract_data";
import { DataContext } from "../../DataContext";
import { TradeSuccess } from "./TradeSuccess";

export const TradeModal = (props) => {
  const { show, setShow, level, setLevel } = props;
  const [content, setContent] = useState("tradeStart");
  const [headerText, setHeaderText] = useState("Trade");
  const [nftContract, setNftContract] = useState(null);
  const [gameContract, setGameContract] = useState(null);
  const { nfts } = useContext(DataContext);

  const [txStatus, setTxStatus] = useState({
    hash: null,
    submited: false,
    approval: false,
  });

  const showTradeModal = () => {
    setShow(!show);
    setLevel(level);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const initializeContract = async () => {
      try {
        //TODO use infura hardcoded url mumbai rpc
        const provider = new ethers.JsonRpcProvider(
          process.env.REACT_APP_RPC_URL
        );
        // Create a new instance of the contract using the ABI and address
        const _nftContract = new ethers.Contract(
          WAV_NFT_ADDRESS,
          WAV_NFT_ABI,
          provider
        );
        const _gameContract = new ethers.Contract(
          WAV_PROXY_ADDRESS,
          WAV_PROXY_ABI,
          provider
        );
        setNftContract(_nftContract);
        setGameContract(_gameContract);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    if (!gameContract || !nftContract) {
      initializeContract();
    }
  }, [gameContract, nftContract, txStatus]);

  const whichContentToRender = () => {
    if (content === "tradeStart") {
      return (
        <TradeStart
          userNfts={nfts}
          setContent={setContent}
          gameContract={gameContract}
          nftContract={nftContract}
          setTxStatus={setTxStatus}
          level={level}
          txStatus={txStatus}
        />
      );
    } else if (content === "processingTrade") {
      return (
        <ProcessingTrade
          txStatus={txStatus}
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else if (content === "tradeSuccess") {
      return (
        <TradeSuccess
          userNfts={nfts}
          level={level}
          txStatus={txStatus}
          setHeaderText={setHeaderText}
          setContent={setContent}
          handleClose={handleClose}
        />
      );
    } else return null;
  };

  return (
    <>
      <CustomModal
        show={show}
        setShow={showTradeModal}
        content={whichContentToRender}
        modalHeaderText={headerText}
      >
        {" "}
        {whichContentToRender()}
      </CustomModal>
    </>
  );
};
