import { ReactComponent as SmallPinkArrow } from "../../images/small_pink_arrow.svg";
import Tk from "../../images/artists/tk.jpg";

import { useEffect, useState } from "react";
import CustomButton from "../Button";
import { getGameIdBasedOnHref, shortenAddress } from "../../utils";

export const CompletedPayment = ({
  setContent,
  handleClose,
  setCrossmintData,
  crossmintData,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [artist, setArtist] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const _artist = await getGameIdBasedOnHref();
      setArtist(_artist);
    };
    fetchData();
    return () => {
      //any cleanup
    };
    //todo rerender session here
  }, [artist, crossmintData]);

  const buyMore = async () => {
    setContent("creditcardPayment");
  };

  let selectedNft = {};
  return (
    <div className="contentView flex justify-center">
      {" "}
      <div className="p-4 w-1/2 flex-col justify-center items-center ">
        <img
          src={`https://wavgame-data.netlify.app/images/${crossmintData?.tokenId[0]}.svg`}
          alt={selectedNft?.metadata?.name}
          className="nftImagePrepared w-full h-full object-cover m-auto"
        />

        <div style={{ marginLeft: -260 }} className="">
          <p className="greyUpperCaseText mb-1">
            {selectedNft?.contract?.type}
          </p>

          <a
            className="hover:no-underline hover:text-decoration-none"
            href={`https://mumbai.polygonscan.com/address/${crossmintData?.walletAddress}`}
            target="blank"
            rel="noreferrer"
          >
            <p className="greyUpperCaseText  lightPink flexDirectionRow ">
              {shortenAddress(crossmintData?.walletAddress)}

              <SmallPinkArrow className="ml-2 mt-1" />
            </p>
          </a>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        <div className="flexDirectionRow">
          {" "}
          {artist.image ? (
            <img
              className="avatarImage ml-2 object-cover"
              src={require(`../../images/artists/${artist?.image}`)}
              alt="Artist Avatar"
            />
          ) : null}
          <p className="mt-2">{artist.name}</p>
        </div>
        <div className="mt-12 mb-4">
          {" "}
          <p className="mt-3 greyUpperCaseText ">ERC-1155</p>
          <a
            href={`https://www.sound.xyz/${artist.id}`}
            target="blank"
            className="flexDirectionRow  lightPink hover:no-underline hover:decoration-none no-underline"
          >
            {`sound.xyz/${artist.id}`} <SmallPinkArrow className="ml-2 mt-1" />
          </a>
          <a
            href={`${process.env.REACT_APP_EXPLORER_URL}/tx/${crossmintData?.txId}`}
            target="blank"
            className=" flexDirectionRow  lightPink hover:no-underline hover:decoration-none no-underline"
          >
            {shortenAddress(crossmintData?.txId)}{" "}
            <SmallPinkArrow className="ml-2 mt-1" />
          </a>
        </div>

        <p className="lineNoCenter mt-2 " style={{ width: "50%" }}></p>

        <p className=" mt-24 greySmallText" style={{ width: "50%" }}>
          Congratulations! Your collectible purchase was successfull. You can
          now start playing the game.
        </p>

        <div className="flexDirectionRow mb-3 mt-3">
          <CustomButton pink type="big" onClick={buyMore}>
            BUY MORE
          </CustomButton>
          <button className="ml-5 mr-5" onClick={handleClose}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
