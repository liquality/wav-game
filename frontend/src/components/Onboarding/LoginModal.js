import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, tryRegisterSW } from "@liquality/wallet-sdk";
import { LoginOrRegister } from "./LogInOrRegister";
import { PickAvatar } from "./PickAvatar";
import { PickArtist } from "./PickArtist";
import { CreditcardPayment } from "./CreditcardPayment";
import { CompletedPayment } from "./CompletedPayment";
import { CustomModal } from "../Modal";
import { fetchSession, seeIfUserCanLogIn } from "../../utils";
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
  baseUrl: window.location.origin + "/serviceworker",
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
  const navigate = useNavigate();
  const handleClose = () => setShow(false);

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
      const response = await UserService.loginUser(serviceprovider_name);
      localStorage.setItem("session", JSON.stringify(response));
      return response;
    } catch (err) {
      console.log("Error logging in user");
    }
  };

  const fetchGamesByUserId = async () => {
    try {
      const token = fetchSession()?.token;
      if (token) {
        return await UserService.getGameByUserId(
          fetchSession()?.id, //userid
          "",
          token
        );
      }
    } catch (err) {
      console.log(err, "Error fetching user");
    }
    return null;
  };

  const createNewWallet = async () => {
    //Dont create new wallet if user has localstorage shares
    const response = await AuthService.createWallet(tKey, verifierMap);
    const canUserLogin = await loginUser(
      response.loginResponse?.userInfo?.email
    );

    if (canUserLogin) {
      setLoading(true);
      localStorage.setItem("loginResponse", JSON.stringify(response));
      setLoginResponse(response);

      // get the games and redirect to the latest created
      const games = await fetchGamesByUserId();
      if (games && games.length > 0) {
        const sortedGames = games.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const { artist_name } = sortedGames[0];
        if (artist_name) {
          setLoading(false);
          navigate(`/artist/${artist_name}`);
          setLoading(false);
          setShow(false);
        } else {
          window.location.reload();
        }
      } else {
        window.location.reload();
      }
    } else {
      setLoading(true);
      localStorage.setItem("loginResponse", JSON.stringify(response));
      setLoginResponse(response);
      setLoading(false);
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
          handleClose={handleClose}
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

  let typeOfLogo;
  if (content === "creditcardPayment") {
    typeOfLogo = "creditCard";
  } else if (content === "loginOrRegister") {
    typeOfLogo = "none";
  } else typeOfLogo = null;
  return (
    <>
      <CustomModal
        type={typeOfLogo}
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
