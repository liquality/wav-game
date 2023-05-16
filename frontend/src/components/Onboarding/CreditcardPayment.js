import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { ReactComponent as MysteryBox } from "../../images/mystery_box.svg";
import * as React from "react";
import { useState, useEffect } from "react";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

export const CreditcardPayment = (props) => {
  const { setContent } = props;
  const [inputValue, setInputValue] = useState(1);

  const handleIncrement = () => {
    setInputValue(inputValue + 1);
  };

  const handleDecrement = () => {
    if (inputValue > 0) {
      setInputValue(inputValue - 1);
    }
  };
  return (
    /*  <div className="flexDirectionRow">
      <div className="flexDirectionRow">
        <div
          className="flex justify-center items-center align-center mt-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5px",
            width: "150px",
            height: "200px",
            backgroundColor: "white",
          }}
        >
         
        </div>
      </div>
      <div className="rightModalContainer -mb-2">
        {" "}
        <div className="mt-4 mb-2">
          <p className="modalTitle">
            Get ARTISTNAME NFTs & Pay with credit card
          </p>

  

          <p
            style={{ color: "#646F85" }}
            className="rightSubHeadingTextSmall mt-5"
          >
            Crossmint enables anyone to seamlessly buy your NFTs with any
            payment method (from credit card to cross chain crypto), from
            anywhere in the world.
          </p>
        </div>
      </div>
    </div> */

    <div className="flex">
      <div className=" w-1/2 flex justify-center items-center margin-auto">
        {/* Big image container */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5px",
            width: "200px",
            height: "450px",
            backgroundColor: "white",
          }}
        ></div>
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

        <p className="mb-4">Unreleased Song</p>
        <p className="mb-6">Unreleased Song Title</p>
        <br></br>
        <p className="lineNoCenter" style={{ width: "50%" }}></p>

        <p className="mb-4">Game Rules</p>
        <p className="mb-4">
          • 4 items to get to level 3 <br></br>• 8 to level 4 <br></br>•16 to
          level 5 <br></br>•32 to level 6
        </p>
        <p className="lineNoCenter mb-4" style={{ width: "50%" }}></p>

        <div className="flexDirectionRow">
          <p className="mr-3">QUANTITYBOX </p>{" "}
          <p className="mr-3 ml-3">Total $100 </p>
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
