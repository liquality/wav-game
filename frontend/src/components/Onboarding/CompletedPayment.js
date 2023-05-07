import * as React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { ReactComponent as Congrats } from "../../images/congrats.svg";

export const CompletedPayment = (props) => {
  const { handleClose } = props;

  return (
    <div className="text-center mx-auto">
      <div className="flexDirectionRow mt-4">
        <p className="modalTitle mb-3">Completed. Congratulations</p>
        <Congrats />
      </div>

      <div className="flex justify-center items-center mt-3 mb-2">
        <div
          style={{
            width: "55%",
            height: "35vh",
            backgroundColor: "grey",
            color: "white",
          }}
        >
          NFT placeholder IMG
        </div>
      </div>
      <p style={{ color: "#646F85" }} className="rightSubHeadingTextSmall ">
        NFT Name
      </p>

      <button
        style={{ width: "90%" }}
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full  px-4 py-2 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 navBarStartBtn mt-4 mb-1 px-4"
        onClick={() => handleClose()}
      >
        Start earning rare NFTs
      </button>
      <div className="flex justify-center items-center mt-3 mb-3">
        powered by <LiqualityLogo />
        Liquality
      </div>
    </div>
  );
};
