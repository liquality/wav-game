import { ReactComponent as NftTiles } from "../../images/nft_tiles.svg";
import { ReactComponent as MysteryBox } from "../../images/mystery_box.svg";
import * as React from "react";
import { useState, useEffect } from "react";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { fetchSession } from "../../utils";

export const CreditcardPayment = (props) => {
  const { setContent } = props;
  const [nftAmount, setNftAmount] = useState(1);

  const handleIncrement = () => {
    setNftAmount(nftAmount + 1);
  };

  const handleDecrement = () => {
    if (nftAmount > 0) {
      setNftAmount(nftAmount - 1);
    }
  };

  const handleAmountChange = (event) => {
    const { name, value } = event.target;
    //prevent negative nrs
    var inputValue = Number(value) < 0 ? 0 : value;

    setNftAmount(inputValue);
  };

  return (
    <div className="flex">
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
          <NftTiles />
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
          <p className="mt-2">Artist Name</p>
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
          <p className="mr-3 mt-2 ml-5">Total $100 </p>
        </div>

        <CrossmintPayButton
          clientId="_YOUR_CLIENT_ID_"
          environment="_ENVIRONMENT_"
          className="xmint-btn"
          mintConfig={{
            type: "erc-721",
            quantity: "_NUMBER_OF_NFTS_",
            totalPrice: "_PRICE_IN_NATIVE_TOKEN_",
            // your custom minting arguments...
          }}
        />
      </div>
    </div>
  );
};
