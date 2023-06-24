import { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as ModalCloseX } from "../images/modal_close_x.svg";
import { PoweredByLiquality } from "./PoweredByLiquality";
import Crossmint from "../images/powered_by_crossmintPNG.png";
import { DataContext } from "../DataContext";

export const CustomModal = (props) => {
  const { content, setShow, show, modalHeaderText, type, txStatus } = props;
  const { setNfts, setNftCount } = useContext(DataContext);

  const handleClose = () => {
    setShow(false);
    //To rerender nfts and count, set to null so useeffect hook can fetch again in parent components
    setNfts(null);
    setNftCount(null);
  };

  useEffect(() => {});

  let logo;
  if (type === "creditCard") {
    logo = (
      <div className="text-center mx-auto">
        <div className="flex justify-center items-center mt-3 mb-3">
          <img src={Crossmint} alt="crossmint" />
        </div>
      </div>
    );
  } else if (type === "none") {
    logo = null;
  } else {
    logo = <PoweredByLiquality />;
  }

  return (
    <>
      <Modal
        style={{ minHeight: `${window.innerHeight}px` }}
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modal"
      >
        {content !== "processingSend" ||
        (content === "processingSend" && txStatus.hash) ? (
          <button className="modal-close-x" onClick={handleClose}>
            <ModalCloseX />
          </button>
        ) : null}

        <div className="modal-header-text">
          {modalHeaderText ? (
            modalHeaderText
          ) : (
            <div className="modal-header-notext"></div>
          )}
        </div>
        <div className="modal-body">
          <div className="line"></div>
          {content()}
          <div className="line"></div>
        </div>
        {logo}
      </Modal>
    </>
  );
};
