import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { AuthService, tryRegisterSW } from "@liquality/wallet-sdk";
import { DataContext } from "../../DataContext";
import { LoginOrRegister } from "./LogInOrRegister";
import { PickAvatar } from "./PickAvatar";
import { Welcome } from "./Welcome";
import { PickArtist } from "./PickArtist";
import { CreditcardPayment } from "./CreditcardPayment";
import { CompletedPayment } from "./CompletedPayment";

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
  const [content, setContent] = useState("pickArtist");

  //const [show, setShow] = useState(false);
  const [loginResponse, setLoginResponse] = useState({});
  //const { loginResponse, setLoginResponse } = React.useContext(DataContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const init = async () => {
      await tryRegisterSW("/serviceworker/sw.js");
      const tKeyResponse = await AuthService.init(directParams);
      setTKey(tKeyResponse);
    };

    init();
  }, [loginResponse, content]);

  const createNewWallet = async () => {
    const response = await AuthService.createWallet(tKey, verifierMap);
    setLoginResponse(response);
    setContent("pickAvatar");
  };

  const whichContentToRender = () => {
    if (content === "loginOrRegister") {
      return <LoginOrRegister createNewWallet={createNewWallet} />;
    } else if (content === "pickAvatar") {
      return <PickAvatar setContent={setContent} />;
    } else if (content === "welcome") {
      return <Welcome setContent={setContent} />;
    } else if (content === "pickArtist") {
      return <PickArtist setContent={setContent} />;
    } else if (content === "creditcardPayment") {
      return <CreditcardPayment setContent={setContent} />;
    } else if (content === "completedPayment") {
      return <CompletedPayment handleClose={handleClose} />;
    } else return null;
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        {" "}
        {/* Add a close button */}
        <button className="" onClick={handleClose}></button>
        {whichContentToRender()}
      </Modal>
    </>
  );
};
