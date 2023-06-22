import { ReactComponent as GreenCheckmark } from "../../images/green_checkmark.svg";
import ProcessingTx from "../ProcessingTx";
import CustomButton from "../Button";
import { useEffect } from "react";
import { NftService } from "@liquality/wallet-sdk";
import { getPrivateKey } from "../../utils";
import { WAV_NFT_ADDRESS } from "../../data/contract_data";
import { useState } from "react";
import { CHAIN_ID } from "../../data/contract_data";

export const ProcessingSend = (props) => {
  const { setContent, sendRequest } = props;
  const [txStatus, setTxStatus] = useState({hash:null});

  useEffect(() => {
    const sendNft = async () => {
      try {
        const transferRequest = {
          contractAddress: WAV_NFT_ADDRESS,
          receiver: sendRequest.address,
          tokenIDs: [sendRequest.tokenID],
          amounts: [1]
        };

        let pk = getPrivateKey();
        let txHash = await NftService.transferNft(
          transferRequest,
          CHAIN_ID,
          pk,
          true
        );
        setTxStatus({hash:txHash});
      } catch (err) {
        console.log(err, "error transfering nft >>> ");
      }
    };
    sendNft()
  })

  const handleExplorerClick = (explorer) => {
    window.open(`${(process.env.EXPLORER_URL)}/tx/${txStatus.hash}`, "_blank");
  };
  return (
    <div className="contentView flex">
      <div className=" justify-center items-center  m-auto">
        <div style={{ width: "100%" }}>
        <ProcessingTx txStatus={txStatus} />
          {txStatus.hash ? (
            <div className="flex">
              <p className="flexDirectionRow">
                <GreenCheckmark className="mr-3" /> NFT(S) SENT
              </p>
            </div>
          ) : null}

          <br></br>

          <br></br>
          <div className="flex">
            <div
              style={{ bottom: "18%" }}
              className="flexDirectionRow mb-3 absolute "
            >
              <CustomButton pink type="big" onClick={handleExplorerClick(process.env.EXPLORER_URL)}>
                SEE ON EXPLORER
              </CustomButton>
              <button
                className="ml-5 mr-5"
                onClick={() => setContent("sendStart")}
              >
                SEND MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
