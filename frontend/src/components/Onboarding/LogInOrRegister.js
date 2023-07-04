import { SpinningLoader } from "../SpinningLoader";
import CustomButton from "../Button";
import { PoweredByLiquality } from "../PoweredByLiquality";

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
            <div style={{ width: "80%" }}>
              <div className="mt-4 mb-48">
                <p className="eyebrowLg mt-5">
                  <b>WELCOME</b>
                </p>
                <p className="rightSubHeadingTextSmall mt-3">
                  Your registration creates a wallet to securely hold your cards.
                </p>
                <div className="rightSubHeadingTextSmall mt-5">
                  <ul className="list">
                    <li>optimized for Chrome</li>
                    <li>log-in with the same account to play games in progress</li>
                    <li>use one Google account per browser only</li>
                    <li>all payments in USD</li>
                  </ul>
                </div>
              </div>

              <PoweredByLiquality notCenter={true} />
              <a
                className="modalTerms mt-3"
                href="/terms"
                target="blank"
                rel="noreferrer"
              > Terms & Conditions</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
