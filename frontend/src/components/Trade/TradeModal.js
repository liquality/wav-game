import { useState, useContext } from "react";

import { CustomModal } from "../Modal";
import { TradeStart } from "./TradeStart";
import { ProcessingTrade } from "./ProcessingTrade";
import { DataContext } from "../../DataContext";
import { TradeSuccess } from "./TradeSuccess";

export const TradeModal = (props) => {
  const { show, setShow, level, setLevel } = props;
  const [content, setContent] = useState("tradeStart");
  const [headerText, setHeaderText] = useState("Trade");
  const { nfts } = useContext(DataContext);

  const [txStatus, setTxStatus] = useState({
    hash: null,
    submited: false,
    approval: false,
  });

  const showTradeModal = () => {
    setShow(!show);
    setLevel(level);
  };

  const handleClose = () => {
    setShow(false);
  };

  const whichContentToRender = () => {
    if (content === "tradeStart") {
      return (
        <TradeStart
          userNfts={nfts}
          setContent={setContent}
          setTxStatus={setTxStatus}
          level={level}
          txStatus={txStatus}
        />
      );
    } else if (content === "processingTrade") {
      return (
        <ProcessingTrade
          txStatus={txStatus}
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else if (content === "tradeSuccess") {
      return (
        <TradeSuccess
          userNfts={nfts}
          level={level}
          txStatus={txStatus}
          setHeaderText={setHeaderText}
          setContent={setContent}
          handleClose={handleClose}
        />
      );
    } else return null;
  };

  return (
    <>
      <CustomModal
        show={show}
        setShow={showTradeModal}
        content={whichContentToRender}
        modalHeaderText={headerText}
      >
        {" "}
        {whichContentToRender()}
      </CustomModal>
    </>
  );
};
