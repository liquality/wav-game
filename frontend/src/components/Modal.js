import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as ModalCloseX } from "../images/modal_close_x.svg";

export const CustomModal = (props) => {
  const { content, setShow, show } = props;
  const [tKey, setTKey] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {});

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <button className="modal-close-x" onClick={handleClose}>
          <ModalCloseX />
        </button>

        <div className="line">heeej</div>
        {content()}
      </Modal>
    </>
  );
};
