import * as React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as GreenDots } from "../../images/green_dots.svg";
import { ReactComponent as GreenCheckmark } from "../../images/green_checkmark.svg";
import ProcessingTx from "../ProcessingTx";
import CustomButton from "../Button";

export const ProcessingSend = (props) => {
  const { setContent, txHash } = props;
  const handleExplorerClick = () => {
    window.open(`https://polygonscan.com/address/${txHash}`, "_blank");
  };
  return (
    <div className="contentView flex">
      <div className=" justify-center items-center  m-auto">
        <div style={{ width: "100%" }}>
          <ProcessingTx txHash={txHash} />
          {txHash ? (
            <div className="flex">
              <p className="flexDirectionRow">
                <GreenCheckmark className="mr-3" /> NFT(S) SENT
              </p>
            </div>
          ) : null}

          <br></br>

          <br></br>
          <div className="flex">
            <div
              style={{ bottom: "18%" }}
              className="flexDirectionRow mb-3 absolute "
            >
              <CustomButton pink type="big" onClick={handleExplorerClick}>
                SEE ON EXPLORER
              </CustomButton>
              <button
                className="ml-5 mr-5"
                onClick={() => setContent("sendStart")}
              >
                SEND MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
