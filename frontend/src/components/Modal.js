import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as ModalCloseX } from "../images/modal_close_x.svg";
import { PoweredByLiquality } from "./PoweredByLiquality";

export const CustomModal = (props) => {
  const { content, setShow, show, modalHeaderText } = props;
  const [tKey, setTKey] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {});

  console.log(window.innerHeight, "inner height");
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

        <p className="modal-header-text">
          {modalHeaderText ? (
            modalHeaderText
          ) : (
            <div className="modal-header-notext"></div>
          )}
        </p>
        <div className="line"></div>
        {content()}

        <div className="line"></div>
        <PoweredByLiquality />
      </Modal>
    </>
  );
};
