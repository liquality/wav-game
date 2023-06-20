import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as ModalCloseX } from "../images/modal_close_x.svg";
import { PoweredByLiquality } from "./PoweredByLiquality";

export const CustomModal = (props) => {
  const { content, setShow, show, modalHeaderText } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => { });

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
        <div className="line"></div>
        <div class="modal-body">
          {content()}
        </div>
        <div className="line"></div>
        <PoweredByLiquality />
      </Modal>
    </>
  );
};
