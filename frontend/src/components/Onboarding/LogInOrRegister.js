import * as React from "react";

import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

export const LoginOrRegister = (props) => {
  const { createNewWallet } = props;

  return (
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
          <p className="rightSubHeadingTextSmall mt-5">
            <b>👋 Welcome to wavGAME</b>
          </p>
          <p className="rightSubHeadingTextSmall mt-3">
            💰 Your registration creates a wallet to securely hold your NFTs.
          </p>
          <p className="rightSubHeadingTextSmall mt-5">
            To find your games in progress you must log-in with the same
            credentials you registered with.
          </p>
        </div>
      </div>
    </div>
  );
};
