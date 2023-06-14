import { useState, useEffect } from "react";

import { AuthService, tryRegisterSW } from "@liquality/wallet-sdk";
import { LoginOrRegister } from "./LogInOrRegister";
import { PickAvatar } from "./PickAvatar";
import { PickArtist } from "./PickArtist";
import { CreditcardPayment } from "./CreditcardPayment";
import { CompletedPayment } from "./CompletedPayment";
import { CustomModal } from "../Modal";
import { seeIfUserCanLogIn } from "../../utils";
import UserService from "../../services/UserService";

const verifierMap = {
  google: {
    name: "Google",
    typeOfLogin: "google",
    clientId:
      "852640103435-0qhvrgpkm66c9hu0co6edkhao3hrjlv3.apps.googleusercontent.com",
    verifier: "liquality-wavgame",
  },
};

// 1. Setup Service Provider
const directParams = {
  baseUrl: window.location.href.startsWith("http://localhost:3005")
    ? `http://localhost:3005/serviceworker`
    : `https://wav-game-staging-public.liquality.io/serviceworker`,
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
  const [selectedId, setSelectedId] = useState(null);

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

  const loginUser = async (serviceprovider_name) => {
    try {
      UserService.loginUser(serviceprovider_name).then((response) => {
        localStorage.setItem("session", JSON.stringify(response));
      });
    } catch (err) {
      console.log("Error logging in user");
    }
  };

  const createNewWallet = async () => {
    //Dont create new wallet if user has localstorage shares
    if (seeIfUserCanLogIn()) {
      setLoading(true);
      const response = await AuthService.loginUsingSSO(tKey, verifierMap);
      localStorage.setItem("loginResponse", JSON.stringify(response));
      await loginUser(response.loginResponse?.userInfo?.email);
      setLoginResponse(response);
      //some ugly code here but works for now lol
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 2000);
    } else {
      setLoading(true);
      const response = await AuthService.createWallet(tKey, verifierMap);
      localStorage.setItem("loginResponse", JSON.stringify(response));
      setLoginResponse(response);
      setLoading(false);
      //TODO: create user in db here
      setContent("pickAvatar");
      setHeaderText("Pick An Avatar");
    }
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
          serviceproviderName={loginResponse?.loginResponse?.userInfo?.email}
          publicAddress={loginResponse?.loginResponse?.publicAddress}
        />
      );
    } else if (content === "pickArtist") {
      return (
        <PickArtist
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setHeaderText={setHeaderText}
          setContent={setContent}
          type={"onboarding"}
          handleClose={handleClose}
        />
      );
    } else if (content === "creditcardPayment") {
      return (
        <CreditcardPayment
          selectedId={selectedId}
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
