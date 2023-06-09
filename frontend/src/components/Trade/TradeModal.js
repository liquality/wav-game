import { useState, useEffect } from "react";
import { PickArtist } from "../Onboarding/PickArtist";
import { CreditcardPayment } from "../Onboarding/CreditcardPayment";
import { CompletedPayment } from "../Onboarding/CompletedPayment";
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
import { NftService } from "@liquality/wallet-sdk";

export const TradeModal = (props) => {
  const { show, setShow } = props;
  const [content, setContent] = useState("tradeStart");
  const [headerText, setHeaderText] = useState("Trade");
  const [nftContract, setNftContract] = useState(null);
  const [gameContract, setGameContract] = useState(null);

  const [wavNfts, setWavNfts] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
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

        const nfts = await NftService.getNftsForContract(
          WAV_NFT_ADDRESS,
          80001
        );
        setWavNfts(nfts);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initializeContract();
  }, []);

  console.log(
    wavNfts,
    "wav nfts from alchemy",
    nftContract,
    "nft contract, proxy:",
    gameContract
  );

  const createNewWallet = async () => {
    setLoading(true);

    setLoading(false);
    //TODO: create user in db here
    setContent("pickAvatar");
    setHeaderText("Pick An Avatar");
  };

  //TODO you need collect() you need to call gameIds array that Oluchi hardcoded
  //

  const whichContentToRender = () => {
    if (content === "tradeStart") {
      return <TradeStart setContent={setContent} />;
      //TODO
    } else if (content === "processingTrade") {
      return (
        <ProcessingTrade
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else if (content === "pickArtist") {
      return (
        <PickArtist setHeaderText={setHeaderText} setContent={setContent} />
      );
    } else if (content === "creditcardPayment") {
      return (
        <CreditcardPayment
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else if (content === "completedPayment") {
      return (
        <CompletedPayment
          setHeaderText={setHeaderText}
          handleClose={handleClose}
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
