import * as React from "react";

import { ReactComponent as LiqualityLogo } from "../../images/liquality_logo.svg";
import { SpinningLoader } from "../SpinningLoader";
import CustomButton from "../Button";

export const LoginOrRegister = (props) => {
  const { createNewWallet, loading } = props;

  return (
    <>
      {loading ? (
        <div className="contentView m-5 p-5 flex justify-center items-center ">
          <div className="m-4 p-4">
            <SpinningLoader />
          </div>
        </div>
      ) : (
        <div className="flexDirectionRow">
          <div className="leftModalContainer">
            <p className="enter">enter</p>
            <p className="wavGameHeader">wavGAME</p>

            <div className="mt-4 mb-5 ">
              <CustomButton type="big" disabled>
                Disabled Button
              </CustomButton>
              <CustomButton type="small" pink>
                Smallpink
              </CustomButton>
              <CustomButton type="big" white>
                Big whit
              </CustomButton>
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
            <div style={{ width: "18rem" }}>
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
      )}
    </>
  );
};
