import * as React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { AuthService, tryRegisterSW } from "@liquality/wallet-sdk";
import { DataContext } from "../../DataContext";
import { LoginOrRegister } from "./LogInOrRegister";
import { PickAvatar } from "./PickAvatar";
import { PickArtist } from "./PickArtist";
import { CreditcardPayment } from "./CreditcardPayment";
import { CompletedPayment } from "./CompletedPayment";
import { CustomModal } from "../Modal";
import UserService from "../../services/UserService";

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
  web3AuthClientId:
    "BJTC4gveo6EM5dm2cLJnPUiBH3n6IeirFpMwHP1GrFyhW4_UnGN88We66cELQS4HNrPYcKLiNIjASG9pS4fboFE",
};

export const LoginModal = (props) => {
  const { show, setShow } = props;
  const [tKey, setTKey] = useState({});
  const [content, setContent] = useState("loginOrRegister");
  const [headerText, setHeaderText] = useState("");

  const [loading, setLoading] = useState(false);
  const [loginResponse, setLoginResponse] = useState({});
  //const { loginResponse, setLoginResponse } = React.useContext(DataContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const init = async () => {
      try {
        await tryRegisterSW("/serviceworker/sw.js");
        const tKeyResponse = await AuthService.init(directParams);
        setTKey(tKeyResponse);
      } catch (err) {
        console.log(err, "error inited");
      }
    };

    init();
  }, [loginResponse, content]);

  const createNewWallet = async () => {
    setLoading(true);
    const response = await AuthService.createWallet(tKey, verifierMap);
    setLoginResponse(response);
    setLoading(false);
    //TODO: create user in db here
    setContent("pickAvatar");
    setHeaderText("Pick An Avatar");
  };

  const whichContentToRender = () => {
    if (content === "loginOrRegister") {
      return (
        <LoginOrRegister
          setHeaderText={setHeaderText}
          createNewWallet={createNewWallet}
          loading={loading}
        />
      );
    } else if (content === "pickAvatar") {
      return (
        <PickAvatar
          setHeaderText={setHeaderText}
          setContent={setContent}
          serviceproviderName={loginResponse.loginResponse.userInfo.email}
          publicAddress={loginResponse.loginResponse.publicAddress}
        />
      );
    } else if (content === "pickArtist") {
      return (
        <PickArtist setHeaderText={setHeaderText} setContent={setContent} />
      );
    } else if (content === "creditcardPayment") {
      return (
        <CreditcardPayment
          setHeaderText={setHeaderText}
          setContent={setContent}
        />
      );
    } else if (content === "completedPayment") {
      return (
        <CompletedPayment
          setHeaderText={setHeaderText}
          handleClose={handleClose}
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
