import { ReactComponent as GreenCheckmark } from "../../images/green_checkmark.svg";
import ProcessingTx from "../ProcessingTx";
import { useEffect, useState } from "react";
import { NftService } from "@liquality/wallet-sdk";
import { getPrivateKey } from "../../utils";
import { WAV_NFT_ADDRESS } from "../../data/contract_data";
import { CHAIN_ID } from "../../data/contract_data";

export const ProcessingSend = (props) => {
  const { content, setContent, sendRequest, setTxStatus, txStatus } = props;
  const [txError, setTxError] = useState("");

  useEffect(() => {
    const sendNft = async () => {
      if (content === "processingSend") {
        try {
          const transferRequest = {
            contractAddress: WAV_NFT_ADDRESS,
            receiver: sendRequest.address,
            tokenIDs: [sendRequest.tokenID],
            amounts: [sendRequest.nftAmount],
          };

          let pk = getPrivateKey();
          let txHash = await NftService.transferNft(
            transferRequest,
            CHAIN_ID,
            pk,
            true
          );
          if (txHash) {
            setTxStatus({ hash: txHash });
          } else {
            setTxError("Error transfering NFT(s)");
          }
        } catch (err) {
          setTxError("Error transfering NFT(s)");
          console.log(err, "error transfering nft >>> ");
        }
      }
    };
    sendNft();
  });

  return (
    <div className="contentView flex">
      <div className=" justify-center items-center  m-auto">
        <div style={{ width: "100%" }}>
          <ProcessingTx txStatus={txStatus} content={content} />
          {txStatus.hash ? (
            <div className="flex">
              <p className="flexDirectionRow">
                <GreenCheckmark className="mr-3" /> NFT(S) SENT
              </p>
            </div>
          ) : null}

          <br></br>

          <br></br>

          {txStatus.hash ? (
            <div className="flex">
              <div
                style={{ bottom: "18%" }}
                className="flexDirectionRow mb-3 absolute "
              >
                <a
                  style={{}}
                  className="button button-js"
                  type="button"
                  href={`${process.env.REACT_APP_EXPLORER_URL}/tx/${txStatus.hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  SEE ON EXPLORER
                </a>
                <button
                  className="ml-5 mr-5"
                  onClick={() => setContent("sendStart")}
                >
                  SEND MORE
                </button>
              </div>
            </div>
          ) : (
            <p>{txError}</p>
          )}
        </div>
      </div>
    </div>
  );
};
