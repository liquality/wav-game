import { ReactComponent as NftTiles } from "../../images/OneNftTile.svg";
import { useEffect, useState, useContext } from "react";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { fetchMaticPriceInUSD, fetchSession, getPublicKey } from "../../utils";
import { useNavigate } from "react-router-dom";
import { messageTypes } from "../../services/Websocket/MessageHandler";
import eventBus from "../../services/Websocket/EventBus";
import StaticDataService from "../../services/StaticDataService";
import ContractService from "../../services/ContractService";
import { DataContext } from "../../DataContext";
import CustomButton from "../Button";

export const CreditcardPayment = (props) => {
  const {
    selectedId,
    setHeaderText,
    setCrossmintData,
    crossmintData,
    setContent,
    handleClose,
  } = props;
  const { getMoreLevel } = useContext(DataContext);

  const [nftAmount, setNftAmount] = useState(1);
  const [feePerMint, setFeePerMint] = useState(null);
  const [maticPriceInUsd, setMaticPriceInUsd] = useState(null);

  const [tokenIdForCurrentLevel, setTokenIdForCurrentLevel] = useState(null);
  const getWhichTokenIdForLevel = async () => {
    const artist = await StaticDataService.findArtistById(selectedId.id);
    let firstChar = artist.number_id.toString()[0];
    return firstChar + 0 + getMoreLevel;
  };

  const navigate = useNavigate();

  const handleDoneWithCheckout = () => {
    navigate(`/artist/${selectedId.id}`);
  };

  const handleSkipPayment = () => {
    window.location.href = `/artist/${selectedId.id}`;
    handleClose();
  };

  const handleAmountChange = (event) => {
    const { name, value } = event.target;
    //prevent negative nrs
    var inputValue = Number(value) < 0 ? 0 : value;
    setNftAmount(inputValue);
  };

  const listenToCrossmintSuccess = (data, sender) => {
    //do smth here
    setContent("completedPayment");
    setHeaderText("COMPLETED PURCHASE, CONGRATS!");
    setCrossmintData(data);
    console.log("Websocket event sent", data);
  };

  useEffect(() => {
    const fetchData = async () => {
      eventBus.on(messageTypes.CROSSMINT_SUCCESS, listenToCrossmintSuccess);
      const fee = await ContractService.getFeePerMint();
      const _feePerMint = parseFloat(fee);
      setFeePerMint(_feePerMint);
      const _tokenIdForCurrentLevel = await getWhichTokenIdForLevel();
      setTokenIdForCurrentLevel(_tokenIdForCurrentLevel);
      const _maticPriceInUsd = await fetchMaticPriceInUSD(_feePerMint);
      setMaticPriceInUsd(_maticPriceInUsd);
    };
    fetchData();
    return () => {
      //any cleanup
      eventBus.remove(messageTypes.CROSSMINT_SUCCESS, listenToCrossmintSuccess);
    };
  }, []);
  console.log('maticPriceInUsd', maticPriceInUsd);

  let totalNFTsPrice = (parseFloat(maticPriceInUsd) * nftAmount).toString()
  
  console.log('totalNFTsPrice', totalNFTsPrice);
  const whArgs = {
    id: fetchSession().id,
  };
  const whArgsSerialized = JSON.stringify(whArgs);

  const mintConfigProd = {
    type: "erc-1155",
    _amount: nftAmount,
    totalPrice: totalNFTsPrice,
    _recipient: getPublicKey(),
    _artistID: selectedId.number_id,
  };

  const mintConfigDev = {
    type: "erc-1155",
    _amount: nftAmount,
    totalPrice: totalNFTsPrice,
    _recipient: getPublicKey(),
    _gameID: selectedId.number_id,
  };

  let totalPriceInUSD = (maticPriceInUsd * nftAmount).toFixed(2);
  return (
    <div className=" contentView flex mb-4">
      <div className="p-4 w-1/2 flex justify-center items-center margin-auto pb-5">
        {/* Big image container e*/}

        <div
          className="relative"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5px",
            width: "70%",
            height: "70%",
          }}
        >
          {" "}
          {tokenIdForCurrentLevel ? (
            <div className="absolute flexDirectionRow nft-game-incentives">
              <img
                src={`https://wavgame-data.netlify.app/images/${tokenIdForCurrentLevel}.png`}
                className=" absolute mr-1 nftPreviewTrade "
                alt="NFT Preview"
              />
              <audio
                controls
                controlsList="nodownload"
                data-testid="AssetMedia--audio"
                loop
                preload="auto"
                src={`https://wavgame-data.netlify.app/songs/${tokenIdForCurrentLevel}.wav`}
                style={{
                  zIndex: 9999999,
                  position: "absolute",
                  bottom: "15px",
                  left: "15%",
                  height: 40,
                }}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <NftTiles
              style={{
                width: "406px",
                height: "515px",
              }}
            />
          )}
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        {/* Text container */}

        <div className="flexDirectionRow">
          {" "}
          <img
            className="avatarImage ml-2"
            src={require(`../../images/artists/${selectedId?.image}`)}
            alt="Artist Avatar"
          />{" "}
          <p className="mt-2">{selectedId.name}</p>
        </div>
        <p className="lineNoCenter mt-5 mb-4" style={{ width: "50%" }}></p>

        <p className="mb-4" style={{ width: "50%" }}>
          Buy cards:
        </p>

        <p className="mb-4">
          • 1 to get a live song
          <br></br>• 2 to trade to level 2<br></br>• 32 to get to level 6
          <br></br>• 63 to get to an artist's full set
        </p>
        <p className="mb-4">
          Level 4-6 have limited prizes, and you can always play for the full
          set. Once the transaction completes, close the Crossmint window to
          continue.
        </p>
        <p className="lineNoCenter mb-4" style={{ width: "50%" }}></p>

        <div className="flexDirectionRow mb-1">
          <input
            style={{ width: "20%" }}
            className="passwordInputBox"
            type="number"
            placeholder="Quantity"
            id="nftAmount"
            name="nftAmount"
            value={nftAmount}
            onChange={handleAmountChange}
            required
          />
          <p className="mr-3 mt-2 ml-5">
            <b>TOTAL:</b> ${totalPriceInUSD}{" "}
          </p>
        </div>
        <p className="text-xs mb-2 mt-1 ml-1">
          You can confirm the final price next, which includes a payment
          provider fee
        </p>
        <div className="flexDirectionRow">
          <CrossmintPayButton
            onClick={handleDoneWithCheckout}
            clientId={process.env.REACT_APP_CROSSMINT_CLIENT_ID}
            environment={process.env.REACT_APP_CROSSMINT_ENVIRONMENT}
            className="xmint-btn"
            mintTo={getPublicKey()}
            whPassThroughArgs={whArgsSerialized}
            mintConfig={
              process.env.REACT_APP_CROSSMINT_ENVIRONMENT === "staging"
                ? mintConfigDev
                : mintConfigProd
            }
          />
          <button className="ml-4 mt-2" onClick={() => handleSkipPayment()}>
            SKIP, GO TO ARTIST GAME{" "}
          </button>
          {/*    <CustomButton
            ml={"50px"}
            mt="15px"
            type="small"
            pink
            onClick={() => handleDoneWithCheckout}
          >
            Skip
          </CustomButton> */}
        </div>
      </div>
    </div>
  );
};
