import * as React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as GreenDots } from "../../images/green_dots.svg";
import { ReactComponent as GreenCheckmark } from "../../images/green_checkmark.svg";
import ProcessingTx from "../ProcessingTx";

export const ProcessingTrade = (props) => {
  const { setContent, txHash } = props;

  //Psuedo code for now
  useEffect(() => {
    const fetchData = async () => {};

    fetchData();

    return () => {};
  }, []);

  return (
    <div className="contentView flex">
      <div className=" justify-center items-center  m-auto">
        <div style={{ width: "100%" }}>
          <ProcessingTx txHash={txHash} />
          <div className="flex">
            <p className="flexDirectionRow">
              <GreenCheckmark className="mr-3" /> CONFIRMED
            </p>
          </div>
          <br></br>

          <div className="flex">
            <p className="flexDirectionRow">
              <GreenCheckmark className="mr-3" /> TRANSACTION SUBMITTED
            </p>
          </div>
          <br></br>
          <div className="flex">
            <p className="flexDirectionRow">
              {txHash ? (
                <GreenCheckmark />
              ) : (
                <GreenDots className="mr-3 mt-3.5" />
              )}{" "}
              CHECKING APPROVAL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
