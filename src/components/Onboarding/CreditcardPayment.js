import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { ReactComponent as MysteryBox } from "../../images/mystery_box.svg";
import * as React from "react";
import { useState, useEffect } from "react";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

export const CreditcardPayment = (props) => {
  const { setContent } = props;
  const [inputValue, setInputValue] = useState(0);

  const handleIncrement = () => {
    setInputValue(inputValue + 1);
  };

  const handleDecrement = () => {
    if (inputValue > 0) {
      setInputValue(inputValue - 1);
    }
  };
  return (
    <div className="flexDirectionRow">
      <div className="leftModalContainerCreditcard">
        <MysteryBox />
        <div className="flexDirectionRow">
          <p className="rightSubHeadingTextSmall ">How many?</p>

          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="inputNumberIncrement"
          />
          <div>
            <button onClick={handleDecrement} className="mr-4 ml-3">
              -
            </button>
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
        <div className="flexDirectionRow mt-4">
          <p className="rightSubHeadingTextSmall ">Total Price</p>
          <p className="rightSubHeadingTextSmall ml-8">$1000</p>
        </div>

        <p
          style={{ color: "#646F85", width: "30%" }}
          className="rightSubHeadingTextSmall mt-5"
        >
          Game math it takes at least 20 to get to level 3
        </p>

        <br />
        <br />
      </div>
      <div className="rightModalContainer ">
        {" "}
        <div className="mt-4 mb-5">
          <p className="modalTitle">
            Get ARTISTNAME NFTs & Pay with credit card
          </p>

          <div className="flex justify-center items-center mt-5">
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

          <p
            style={{ color: "#646F85" }}
            className="rightSubHeadingTextSmall mt-5"
          >
            Crossmint enables anyone to seamlessly buy your NFTs with any
            payment method (from credit card to cross chain crypto), from
            anywhere in the world.
          </p>
          <button
            style={{ width: "105%" }}
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full  px-4 py-2 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 navBarStartBtn mt-4 mb-1 px-4"
            onClick={() => setContent("completedPayment")}
          >
            Continue
          </button>
          <div className="flex justify-center items-center mt-3">
            powered by{" "}
            <img
              width="20"
              src="https://www.crossmint.io/assets/crossmint/logo.svg"
            />
            crossmint
          </div>
        </div>
      </div>
    </div>
  );
};
