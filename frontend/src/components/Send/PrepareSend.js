import { ReactComponent as SmallPinkArrow } from "../../images/small_pink_arrow.svg";

import { ReactComponent as CopyIcon } from "../../images/copy_icon.svg";
import { ReactComponent as Polygon } from "../../images/polygon.svg";
import { useEffect, useState } from "react";
import CustomButton from "../Button";
import { getPublicKey, shortenAddress } from "../../utils";
import StaticDataService from "../../services/StaticDataService";

const imagePlaceholder =
  "https://flowbite.com/docs/images/examples/image-4@2x.jpg";

export const PrepareSend = ({
  setSendRequest,
  setContent,
  selectedNft,
  handleClose,
}) => {
  const [addressInput, setAddressInput] = useState("");
  const [nftAmount, setNftAmount] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [artist, setArtist] = useState(null);

  const sendNft = async () => {
    setSendRequest({
      nftAmount: nftAmount,
      address: addressInput,
      tokenID: selectedNft.id,
    });
    setContent("processingSend");
  };

  const handleSendInput = (e) => {
    setAddressInput(e.target.value);
  };

  const handleNftAmountInput = (e) => {
    if (e.target.value <= selectedNft.balance) {
      setNftAmount(e.target.value);
      setErrorMsg("");
    } else {
      setErrorMsg("NFT amount must be lower or equal to your balance");
    }
  };

  //findArtistByNumberId

  useEffect(() => {
    const fetchData = async () => {
      console.log();
      if (selectedNft && !artist) {
        let firstChar = selectedNft.id.toString()[0];
        const _artist = await StaticDataService.findArtistByNumberId(
          firstChar * 1000
        );
        console.log(firstChar * 1000, "first char ", _artist);
        setArtist(_artist);
      }
    };
    fetchData();
  }, [artist, selectedNft]);

  const handleCopyClick = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        //"Text copied to clipboard: ", text);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

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
        <div className="nftImagePrepared w-full h-full object-cover m-auto">
          {" "}
          <p className="mt-3 greyUpperCaseText ">
            {selectedNft.contract?.type}
          </p>
          <a
            href={artist?.sound_link}
            target="blank"
            className="flexDirectionRow  lightPink hover:no-underline hover:decoration-none no-underline"
          >
            {artist?.sound_link} <SmallPinkArrow className="ml-2 mt-1" />
          </a>
          <a
            href={`https://testnets.opensea.io/${selectedNft.contract.address}`}
            target="blank"
            className=" flexDirectionRow  lightPink hover:no-underline hover:decoration-none no-underline"
          >
            {shortenAddress(selectedNft.contract.address)}{" "}
            <SmallPinkArrow className="ml-2 mt-1" />
          </a>
        </div>
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
          {artist ? (
            <img
              className="avatarImage ml-2"
              src={require(`../../images/artists/${artist?.image}`)}
              alt="Artist Avatar"
            />
          ) : null}
          <p className="mt-2">{artist?.name}</p>
        </div>

        <div className="mt-3">
          {" "}
          <p className="greyUpperCaseText">
            {selectedNft.metadata?.name}{" "}
            <p className="greyUpperCaseText bold">
              Balance: {selectedNft.balance}
            </p>
          </p>
        </div>

        <p className="lineNoCenter mt-2 " style={{ width: "50%" }}></p>

        <p className="mt-4 greySmallText" style={{ width: "50%" }}>
          Keep one card for each level to get the full set.
        </p>
        <p className="mt-5 mb-2 greyUpperCaseText">
          SEND FROM YOUR POLYGON ACCOUNT
        </p>
        <button
          onClick={() => handleCopyClick(getPublicKey())}
          className=" pb-5 userMenuAddressText flexDirectionRow"
        >
          <Polygon className="mr-3" />
          {shortenAddress(getPublicKey())} <CopyIcon className="ml-2 mt-1" />
        </button>
        <div className="flexDirectionRow">
          <input
            style={{ width: "30%" }}
            className="passwordInputBox"
            type="text"
            placeholder="Enter polygon address..."
            id="nftAmount"
            name="nftAmount"
            value={addressInput}
            onChange={handleSendInput}
            required
          />
          <input
            style={{ width: "15%", marginLeft: 10 }}
            className="passwordInputBox"
            type="number"
            placeholder="Amount..."
            id="nftAmount"
            name="nftAmount"
            value={nftAmount}
            onChange={handleNftAmountInput}
            required
          />
        </div>
        <p className=" greySmallText lightPink" style={{ width: "70%" }}>
          {errorMsg}
        </p>

        <p className=" greySmallText mt-4" style={{ width: "50%" }}>
          Transfer fees paid by wavWRLD
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
