import { useState, useEffect } from "react";

import { CustomModal } from "../Modal";
import { SendStart } from "./SendStart";
import { PrepareSend } from "./PrepareSend";
import { ProcessingSend } from "./ProcessingSend";

export const SendModal = (props) => {
  const { show, setShow } = props;
  const [content, setContent] = useState("sendStart");
  const [selectedNft, setSelectedNft] = useState(null);
  const [sendRequest, setSendRequest] = useState({ address: "", tokenID: 0 });
  const [txStatus, setTxStatus] = useState({ hash: "" });
  const [headerText, setHeaderText] = useState("Send");

  const handleClose = () => setShow(false);

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
          setHeaderText={setHeaderText}
        />
      );
      //TODO
    } else if (content === "prepareSend") {
      return (
        <PrepareSend
          setContent={setContent}
          setSendRequest={setSendRequest}
          handleClose={handleClose}
          selectedNft={selectedNft}
        />
      );
    } else if (content === "processingSend") {
      return (
        <ProcessingSend
          content={content}
          setContent={setContent}
          handleClose={handleClose}
          sendRequest={sendRequest}
          setTxStatus={setTxStatus}
          txStatus={txStatus}
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
        txStatus={txStatus}
        modalHeaderText={headerText}
      >
        {" "}
        {whichContentToRender()}
      </CustomModal>
    </>
  );
};
