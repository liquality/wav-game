import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

export const LoginModal = (props) => {
  const { show, setShow } = props;
  /*   const [tKey, setTKey] = useState<any>({});*/

  //const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <div className="flexDirectionRow">
          <div className="leftModalContainer">
            <p className="modalTitle">Log-in or register</p>
            <div className="mt-4 mb-5 ">
              <button className="modalButtonSignIn mb-3" onClick={handleClose}>
                Google
              </button>
              <button className="modalButtonSignIn  mb-3" onClick={handleClose}>
                Discord
              </button>
              <button className="modalButtonSignIn  mb-3" onClick={handleClose}>
                Facebook
              </button>
              <button className="modalButtonSignIn  mb-3" onClick={handleClose}>
                Twitch
              </button>
            </div>
            <p>Hej1</p>
            <div className="flex justify-center items-center">
              powered by <LiqualityLogo />
              Liquality
            </div>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://docs.liquality.io/"
              className="modalTerms flex justify-center items-center"
            >
              Terms & Conditions
            </a>
          </div>
          <div className="rightModalContainer ">
            {" "}
            <div className="mt-4 mb-5">
              <p className="rightSubHeadingText">First time here?</p>
              <p className="rightSubHeadingTextSmall mt-3">
                👋 Welcome to wavGAME
              </p>
              <p className="rightSubHeadingTextSmall mt-3">
                💰 With your registration we will also create a wallet
              </p>
              <p className="rightSubHeadingText mt-5">What is a wallet?</p>
              <p className="rightSubHeadingTextSmall mt-3">
                A place for all your digital assets. It allows you to view and
                use your NFTs across wavGAME.
              </p>

              <p
                style={{ color: "#646F85" }}
                className="rightSubHeadingTextSmall mt-3"
              >
                wavGAME uses tKey to securely set-up and access your in-game
                wallet with authentication factors. One key will be set to this
                particular device, and its web-based only.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
