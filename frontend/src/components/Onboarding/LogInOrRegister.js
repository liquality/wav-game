import * as React from "react";

import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";

export const LoginOrRegister = (props) => {
  const { createNewWallet } = props;

  return (
    <div className="flexDirectionRow">
      <div className="leftModalContainer">
        <p className="enter">enter</p>
        <p className="wavGameHeader">wavGAME_</p>

        <div className="mt-4 mb-5 ">
          <button
            className="modalButtonSignIn mb-3"
            onClick={() => createNewWallet()}
          >
            Google
          </button>
          <br></br>
          <button
            className="modalButtonSignIn  mb-3"
            onClick={() => createNewWallet()}
          >
            Discord
          </button>{" "}
          <br></br>
          <button
            className="modalButtonSignIn  mb-3"
            onClick={() => createNewWallet()}
          >
            Facebook
          </button>{" "}
          <br></br>
          <button
            className="modalButtonSignIn  mb-3"
            onClick={() => createNewWallet()}
          >
            Twitch
          </button>{" "}
        </div>
        <br />
        <br />
      </div>
      <div className="rightModalContainer ">
        {" "}
        <div style={{ width: 170 }}>
          <div className="mt-4 mb-5">
            <p className="eyebrowLg mt-5">
              <b>WELCOME</b>
            </p>
            <p className="rightSubHeadingTextSmall mt-3">
              Your registration creates a wallet to securely hold your NFTs.
            </p>
            <p className="rightSubHeadingTextSmall mt-5">
              To find your games in progress you must log-in with the same
              credentials you registered with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
