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
            <p className="enter violet">enter</p>
            <p className="wavGameHeader">wavGAME</p>
            <br></br>
            <p className="text-s">Register or Log-in</p>
            <div className="mt-4 mb-5 ">
              <CustomButton
                mb="10px"
                type="big"
                onClick={() => createNewWallet()}
                pink
              >
                GOOGLE
              </CustomButton>
              <br></br>
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
