import * as React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as GreenDots } from "../../images/green_dots.svg";
import { ReactComponent as GreenCheckmark } from "../../images/green_checkmark.svg";
import ProcessingTx from "../ProcessingTx";

export const ProcessingTrade = (props) => {
  const { setContent, txStatus, setHeaderText } = props;

  //Psuedo code for now
  useEffect(() => {
    const fetchData = async () => {
      if (txStatus.submited && txStatus.approval) {
        setTimeout(function () {
          setContent("tradeSuccess");
          setHeaderText("Your Card");
        }, 4000);
      }
    };

    fetchData();

    return () => {};
  }, [txStatus]);

  return (
    <div className="contentView flex">
      <div className=" justify-center items-center  m-auto">
        <div style={{ width: "100%" }}>
          <ProcessingTx txStatus={txStatus} />
          <div className="flex">
            <p className="flexDirectionRow">
              {txStatus.approval ? (
                <GreenCheckmark />
              ) : (
                <GreenDots className="mr-3 mt-3.5" />
              )}{" "}
              CONFIRMED
            </p>
          </div>
          <br></br>

          <div className="flex">
            <p className="flexDirectionRow">
              {txStatus.approval ? (
                <GreenCheckmark />
              ) : (
                <GreenDots className="mr-3 mt-3.5" />
              )}{" "}
              TRANSACTION SUBMITTED
            </p>
          </div>
          <br></br>
          <div className="flex">
            <p className="flexDirectionRow">
              {txStatus.approval ? (
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
