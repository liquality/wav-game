import { NftService } from "@liquality/wallet-sdk";
import { getPrivateKey, getPublicKey, shortenAddress } from "../../utils";
import { ReactComponent as SmallPinkArrow } from "../../images/small_pink_arrow.svg";

import { ReactComponent as CopyIcon } from "../../images/copy_icon.svg";
import { ReactComponent as Polygon } from "../../images/polygon.svg";
import { useState } from "react";
import CustomButton from "../Button";

const imagePlaceholder =
  "https://flowbite.com/docs/images/examples/image-4@2x.jpg";

export const PrepareSend = ({
  setTxHash,
  setContent,
  selectedNft,
  handleClose,
}) => {
  const [addressInput, setAddressInput] = useState("");

  const sendNft = async (address, chainId) => {
    const transferRequest = {
      contractAddress: selectedNft.contract.address,
      receiver: addressInput,
      tokenIDs: [selectedNft.id],
    };

    let pk = getPrivateKey();
    setContent("processingSend");

    let txHash = await NftService.transferNft(transferRequest, 80001, pk, true);
    setTxHash(txHash);
  };

  const handleSendInput = (e) => {
    setAddressInput(e.target.value);
  };

  console.log(process.env.REACT_APP_GELATO_API_KEY, "api key", selectedNft);

  return (
    <div className="contentView flex justify-center">
      {" "}
      <div className="p-4 w-1/2 flex-col justify-center items-center ">
        <img
          src={
            selectedNft.metadata?.image?.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            ) || imagePlaceholder
          }
          alt={selectedNft.metadata?.name}
          className="nftImagePrepared w-full h-full object-cover m-auto"
        />
        <div style={{ marginLeft: -260 }} className="">
          <p className="greyUpperCaseText mb-1">{selectedNft.contract?.type}</p>

          <a
            className="hover:no-underline hover:text-decoration-none"
            href={`https://mumbai.polygonscan.com/address/${selectedNft.contract?.address}`}
            target="blank"
            rel="noreferrer"
          >
            <p className="greyUpperCaseText  lightPink flexDirectionRow ">
              {shortenAddress(selectedNft.contract?.address)}

              <SmallPinkArrow className="ml-2 mt-1" />
            </p>
          </a>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        {/* Text container */}

        <div className="flexDirectionRow">
          {" "}
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />{" "}
          <p className="mt-2">{selectedNft.metadata?.name.split(" - ")[0]}</p>
        </div>

        <div className="mt-3">
          {" "}
          <p className="greyUpperCaseText">{selectedNft.metadata?.name}</p>
        </div>

        <p className="lineNoCenter mt-2 " style={{ width: "50%" }}></p>

        <p className="mt-4 greySmallText" style={{ width: "50%" }}>
          Transferring the NFT won't impact your reward. You'll still receive it
          [as one of the initial [n] in level [n]].
        </p>
        <p className="mt-5 mb-2 greyUpperCaseText">
          SEND FROM YOUR POLYGON ACCOUNT
        </p>
        <p className=" pb-5 userMenuAddressText flexDirectionRow">
          <Polygon className="mr-3" />
          {shortenAddress(getPublicKey())} <CopyIcon className="ml-2 mt-1" />
        </p>
        <input
          style={{ width: "50%" }}
          className="passwordInputBox"
          type="text"
          placeholder="Send to..."
          id="nftAmount"
          name="nftAmount"
          value={addressInput}
          onChange={handleSendInput}
          required
        />

        <p className=" greySmallText mt-4" style={{ width: "50%" }}>
          All fees paid by wavWRLD / Average network speed
        </p>

        <div className="flexDirectionRow mb-3 mt-3">
          <CustomButton
            disabled={!addressInput ? true : false}
            pink
            type="big"
            onClick={sendNft}
          >
            SEND
          </CustomButton>
          <button className="ml-5 mr-5" onClick={handleClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
