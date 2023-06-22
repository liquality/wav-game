import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as ModalCloseX } from "../images/modal_close_x.svg";
import { PoweredByLiquality } from "./PoweredByLiquality";
import Crossmint from "../images/powered_by_crossmintPNG.png";

export const CustomModal = (props) => {
  const { content, setShow, show, modalHeaderText, type } = props;

  const handleClose = () => setShow(false);

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
        <button className="modal-close-x" onClick={handleClose}>
          <ModalCloseX />
        </button>

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
