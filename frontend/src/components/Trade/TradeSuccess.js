import { ReactComponent as SmallPinkArrow } from "../../images/small_pink_arrow.svg";
import { useContext, useEffect, useState } from "react";
import CustomButton from "../Button";
import { getGameIdBasedOnHref, shortenAddress } from "../../utils";
import { DataContext } from "../../DataContext";
import ContractService from "../../services/ContractService";

export const TradeSuccess = ({
  setContent,
  userNfts,
  handleClose,
  level,
  txStatus,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [artist, setArtist] = useState("");
  const [tokenIdForNewLevel, setTokenIdForNewLevel] = useState(null);
  const [canStillTrade, setCanStillTrade] = useState(false);

  const { setNfts, setNftCount } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      const _artist = await getGameIdBasedOnHref();
      setArtist(_artist);

      if (userNfts) {
        const _tokenIdForCurrentLevel = await getWhichTokenIdForLevel(
          level,
          _artist
        );
        const _tokenIdForNewLevel = await getWhichTokenIdForLevel(
          level + 1,
          _artist
        );
        setTokenIdForNewLevel(_tokenIdForNewLevel);

        const levelNftCount = await ContractService.tokenBalance(
          _tokenIdForCurrentLevel
        );
        setCanStillTrade(levelNftCount >= 2);
      }
    };

    fetchData();
    return () => {
      //any cleanup
    };
    //todo rerender session here
  }, [userNfts]);

  const getWhichTokenIdForLevel = async (levelUp, artist) => {
    let firstChar = artist.number_id.toString()[0];
    return firstChar + 0 + levelUp;
  };

  const tradeMore = async () => {
    setContent("tradeStart");
  };

  const handleCancelClick = async () => {
    handleClose();
    //To rerender nfts and count, set to null so useeffect hook can fetch again in parent components
    setNfts(null);
    setNftCount(null);
  };

  return (
    <div className="contentView flex justify-center">
      {" "}
      <div className="p-4 w-1/2 flex-col justify-center items-center ">
        <img
          src={`https://wavgame-data.netlify.app/images/${tokenIdForNewLevel}.png`}
          alt=""
          className="nftImagePrepared w-full h-full object-cover m-auto"
        />

        <div style={{ marginLeft: -260 }} className="">
          <p className="greyUpperCaseText mb-1">ERC-1155</p>

          <a
            className="hover:no-underline hover:text-decoration-none"
            href={`https://mumbai.polygonscan.com/address/${txStatus?.txHash}`}
            target="blank"
            rel="noreferrer"
          >
            <p className="greyUpperCaseText  lightPink flexDirectionRow ">
              {shortenAddress(txStatus.txHash)}

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
            href={artist?.sound_link}
            target="blank"
            className="flexDirectionRow  lightPink hover:no-underline hover:decoration-none no-underline"
          >
            {artist?.sound_link} <SmallPinkArrow className="ml-2 mt-1" />
          </a>
          <a
            href={`${process.env.REACT_APP_EXPLORER_URL}/tx/${txStatus?.txHash}`}
            target="blank"
            className=" flexDirectionRow  lightPink hover:no-underline hover:decoration-none no-underline"
          >
            {shortenAddress(txStatus?.txHash)}{" "}
            <SmallPinkArrow className="ml-2 mt-1" />
          </a>
        </div>

        <p className="lineNoCenter mt-2 " style={{ width: "50%" }}></p>

        <p className=" mt-48 greySmallText" style={{ width: "50%" }}>
          Congratulations!{" "}
          {level > 2 ? "We will reach out to you to make arrangements." : null}
        </p>

        {/* TODO: if user doesnt have more nfts to trade, we should disable this */}
        <div className="flexDirectionRow mb-3 mt-3">
          <CustomButton
            pink
            type="big"
            onClick={tradeMore}
            disabled={!canStillTrade}
          >
            TRADE MORE
          </CustomButton>
          <button className="ml-5 mr-5" onClick={() => handleCancelClick()}>
            See Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
