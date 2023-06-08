import { useState, useEffect } from "react";
import { PickArtist } from "../Onboarding/PickArtist";
import { CreditcardPayment } from "../Onboarding/CreditcardPayment";
import { CompletedPayment } from "../Onboarding/CompletedPayment";
import { CustomModal } from "../Modal";
import { SendStart } from "./SendStart";
import { PrepareSend } from "./PrepareSend";
import { ProcessingSend } from "./ProcessingSend";

export const SendModal = (props) => {
  const { show, setShow } = props;
  const [content, setContent] = useState("sendStart");
  const [headerText, setHeaderText] = useState("Send");
  const [selectedNft, setSelectedNft] = useState(null);

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const init = async () => {};

    init();
  }, [content]);

  const whichContentToRender = () => {
    if (content === "sendStart") {
      return (
        <SendStart
          setContent={setContent}
          handleClose={handleClose}
          selectedNft={selectedNft}
          setSelectedNft={setSelectedNft}
        />
      );
      //TODO
    } else if (content === "prepareSend") {
      return (
        <PrepareSend
          setContent={setContent}
          setTxHash={txHash}
          handleClose={handleClose}
          selectedNft={selectedNft}
        />
      );
    } else if (content === "processingSend") {
      return (
        <ProcessingSend
          setContent={setContent}
          handleClose={handleClose}
          txHash={txHash}
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
