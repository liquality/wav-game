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
    <div className="flexDirectionRow">
      <div className="leftModalContainerCreditcard">
        <MysteryBox />
        <div className="flexDirectionRow">
          <p className="rightSubHeadingTextSmall ">How many?</p>

          <div className="d-grid input-group">
            <button onClick={handleDecrement} className="ml-4">
              -
            </button>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="form-control inputNumberIncrement"
            />
            <button onClick={handleIncrement} className="ml-4">
              +
            </button>
          </div>
        </div>
        <div className="flexDirectionRow mt-4">
          <p className="rightSubHeadingTextSmall ">Total Price</p>
          <p className="rightSubHeadingTextSmall ml-8">$10</p>
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
      <div className="rightModalContainer -mb-2">
        {" "}
        <div className="mt-4 mb-2">
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

          <div className="flex justify-center items-center mt-5">
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
