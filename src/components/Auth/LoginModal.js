import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { AuthService, tryRegisterSW } from "@liquality/wallet-sdk";
import { DataContext } from "../../DataContext";

const verifierMap = {
  google: {
    name: "Google",
    typeOfLogin: "google",
    clientId:
      "852640103435-0qhvrgpkm66c9hu0co6edkhao3hrjlv3.apps.googleusercontent.com",
    verifier: "liquality-google-testnet",
  },
};

// 1. Setup Service Provider
const directParams = {
  baseUrl: `http://localhost:3005/serviceworker`,
  enableLogging: true,
  networkUrl: "https://goerli.infura.io/v3/a8684b771e9e4997a567bbd7189e0b27",
  network: "testnet",
};

export const LoginModal = (props) => {
  const { show, setShow } = props;
  const [tKey, setTKey] = useState({});
  //const [show, setShow] = useState(false);
  const [loginResponse, setLoginResponse] = useState({});
  //const { loginResponse, setLoginResponse } = React.useContext(DataContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const init = async () => {
      const registration = tryRegisterSW("/serviceworker/sw.js");
      const tKeyResponse = await AuthService.init(directParams);
      setTKey(tKeyResponse);
    };

    init();
  }, [loginResponse]);
  console.log(loginResponse, "LOGINRESPONSE");

  const createNewWallet = async () => {
    const response = await AuthService.createWallet(tKey, verifierMap);
    setLoginResponse(response);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <div className="flexDirectionRow">
          <div className="leftModalContainer">
            <p className="modalTitle">Log-in or register</p>
            <div className="mt-4 mb-5 ">
              <button
                className="modalButtonSignIn mb-3"
                onClick={() => createNewWallet()}
              >
                Google
              </button>
              <button
                className="modalButtonSignIn  mb-3"
                onClick={() => createNewWallet()}
              >
                Discord
              </button>
              <button
                className="modalButtonSignIn  mb-3"
                onClick={() => createNewWallet()}
              >
                Facebook
              </button>
              <button
                className="modalButtonSignIn  mb-3"
                onClick={() => createNewWallet()}
              >
                Twitch
              </button>
            </div>
            <br />
            <br />
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
