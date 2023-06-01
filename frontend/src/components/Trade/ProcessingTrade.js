import * as React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as GreenDots } from "../../images/green_dots.svg";
import { ReactComponent as GreenCheckmark } from "../../images/green_checkmark.svg";
import ProcessingTx from "../ProcessingTx";

export const ProcessingTrade = (props) => {
  const { setContent } = props;
  const [txHash, setTxHash] = useState("xx");

  const startTrade = async (data) => {
    //Trade here from liq sdk
    //const txHash = await sendNft(nftData)
    const txHash = "";
    setTxHash(txHash);
    setContent("processingTrade");
  };

  //Psuedo code for now
  useEffect(() => {
    const fetchData = async () => {
      await startTrade("nftData");
    };

    fetchData();

    return () => {};
  }, [txHash, setTxHash, startTrade]);

  return (
    <div className="contentView flex">
      <div className=" justify-center items-center  m-auto">
        <div style={{ width: "100%" }}>
          <ProcessingTx txHash={txHash} setTxHash={setTxHash} />
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
