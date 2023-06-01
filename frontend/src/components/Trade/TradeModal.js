import { useState, useEffect } from "react";
import { PickArtist } from "../Onboarding/PickArtist";
import { CreditcardPayment } from "../Onboarding/CreditcardPayment";
import { CompletedPayment } from "../Onboarding/CompletedPayment";
import { CustomModal } from "../Modal";
import { TradeStart } from "./TradeStart";
import { ProcessingTrade } from "./ProcessingTrade";

export const TradeModal = (props) => {
  const { show, setShow } = props;
  const [content, setContent] = useState("tradeStart");
  const [headerText, setHeaderText] = useState("Trade");

  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const init = async () => {};

    init();
  }, [content]);

  const createNewWallet = async () => {
    setLoading(true);

    setLoading(false);
    //TODO: create user in db here
    setContent("pickAvatar");
    setHeaderText("Pick An Avatar");
  };

  const whichContentToRender = () => {
    if (content === "tradeStart") {
      return <TradeStart setContent={setContent} />;
      //TODO
    } else if (content === "processingTrade") {
      return (
        <ProcessingTrade
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else if (content === "pickArtist") {
      return (
        <PickArtist setHeaderText={setHeaderText} setContent={setContent} />
      );
    } else if (content === "creditcardPayment") {
      return (
        <CreditcardPayment
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else if (content === "completedPayment") {
      return (
        <CompletedPayment
          setHeaderText={setHeaderText}
          handleClose={handleClose}
        />
      );
    } else return null;
  };

  return (
    <>
      <CustomModal
        show={show}
        setShow={setShow}
        content={whichContentToRender}
        modalHeaderText={headerText}
      >
        {" "}
        {whichContentToRender()}
      </CustomModal>
    </>
  );
};
