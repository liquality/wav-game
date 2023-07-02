import { ReactComponent as NftTiles } from "../../images/OneNftTile.svg";
import { useEffect, useState, useContext } from "react";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { fetchSession, getPublicKey } from "../../utils";
import { useNavigate } from "react-router-dom";
import { messageTypes } from "../../services/Websocket/MessageHandler";
import eventBus from "../../services/Websocket/EventBus";
import StaticDataService from "../../services/StaticDataService";
import { DataContext } from "../../DataContext";

export const CreditcardPayment = (props) => {
  const {
    selectedId,
    setHeaderText,
    setCrossmintData,
    crossmintData,
    setContent,
  } = props;
  const { getMoreLevel } = useContext(DataContext);

  const [nftAmount, setNftAmount] = useState(1);

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

  console.log(crossmintData, "crossmint data?");
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
    console.log("Websocket event sent BÄÄ", data);
  };

  useEffect(() => {
    const fetchData = async () => {
      eventBus.on(messageTypes.CROSSMINT_SUCCESS, listenToCrossmintSuccess);
      const _tokenIdForCurrentLevel = await getWhichTokenIdForLevel();
      setTokenIdForCurrentLevel(_tokenIdForCurrentLevel);
    };
    fetchData();
    return () => {
      //any cleanup
      eventBus.remove(messageTypes.CROSSMINT_SUCCESS, listenToCrossmintSuccess);
    };
  }, []);

  let totalNFTsPrice = (0.0005 * nftAmount).toString();
  const whArgs = {
    id: fetchSession().id,
  };
  const whArgsSerialized = JSON.stringify(whArgs);
  console.log(whArgsSerialized, "wh args serialized");

  return (
    <div className=" contentView flex">
      <div className="p-4 w-1/2 flex justify-center items-center margin-auto">
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
                src={`https://wavgame-data.netlify.app/images/${tokenIdForCurrentLevel}.svg`}
                className=" absolute mr-1 nftPreviewTrade "
                alt="NFT Preview"
              />
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
          To move through each level, you will need:
        </p>
        <p className="mb-4">
          • 4 items to get to level 3 <br></br>• 8 to level 4 <br></br>• 16 to
          level 5 <br></br>• 32 to level 6
        </p>
        <p className="lineNoCenter mb-4" style={{ width: "50%" }}></p>

        <div className="flexDirectionRow mb-3">
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
            <b>TOTAL:</b> ${10 * nftAmount}{" "}
          </p>
        </div>
        <CrossmintPayButton
          onClick={handleDoneWithCheckout}
          clientId={process.env.REACT_APP_CROSSMINT_CLIENT_ID}
          environment={process.env.REACT_APP_CROSSMINT_ENVIRONMENT}
          className="xmint-btn"
          mintTo={getPublicKey()}
          whPassThroughArgs={whArgsSerialized}
          mintConfig={{
            type: "erc-1155",
            _amount: nftAmount,
            totalPrice: totalNFTsPrice,
            _recipient: getPublicKey(),
            _gameID: selectedId.number_id,

            // your custom minting arguments...
          }}
        />
      </div>
    </div>
  );
};
