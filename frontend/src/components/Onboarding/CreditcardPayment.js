import { ReactComponent as NftTiles } from "../../images/OneNftTile.svg";
import { useState } from "react";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { getPublicKey } from "../../utils";
import { useNavigate } from "react-router-dom";

export const CreditcardPayment = (props) => {
  const { setContent, selectedId } = props;
  const [nftAmount, setNftAmount] = useState(1);

  const navigate = useNavigate();

  const handleDoneWithCheckout = () => {
    navigate(`/artist/${selectedId.id}`);
  };

  const handleAmountChange = (event) => {
    const { name, value } = event.target;
    //prevent negative nrs
    var inputValue = Number(value) < 0 ? 0 : value;
    setNftAmount(inputValue);
  };

  let totalNFTsPrice = (0.0005 * nftAmount).toString();
  return (
    <div className=" contentView flex">
      <div className="p-4 w-1/2 flex justify-center items-center margin-auto">
        {/* Big image container */}

        <div
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
          <NftTiles style={{ width: "406px", height: "515px" }} />
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
          We made two special NFTs. You are going to hold randomized amounts of
          both NFTs. To move through each level, you will need:
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
          clientId="d40b03b9-09a3-4ad8-a4f8-15fef67cad21"
          environment="staging"
          className="xmint-btn"
          mintTo={getPublicKey()}
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
