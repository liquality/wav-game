import { NftService } from "@liquality/wallet-sdk";
import { useState, useEffect } from "react";
import CustomButton from "../Button";
import { NftImages } from "./NftImages";
import { SpinningLoader } from "../SpinningLoader";
import { getPublicKey } from "../../utils";
import { CHAIN_ID } from "../../data/contract_data";

export const SendStart = ({
  selectedNft,
  setSelectedNft,
  setContent,
  handleClose,
}) => {
  const [nfts, setNfts] = useState(null);
  const [loadingNfts, setLoadingNfts] = useState(false);

  const fetchNfts = async (address, chainId) => {
    //TODO: fetch your own public address from localstorage instead
    const nfts = await NftService.getNfts(getPublicKey(), CHAIN_ID);
    return nfts;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!nfts) {
        setLoadingNfts(true);
        const nftData = await fetchNfts();
        setNfts(nftData);
        setLoadingNfts(false);
      }
    };

    fetchData();
  }, [selectedNft, nfts]);

  return (
    <div className="contentView flex justify-center">
      <div className="p-4 ml-5 flexDirectionRow ">
        <div>
          {" "}
          <div className="flexDirectionCol mt-1">
            {loadingNfts ? (
              <div style={{ marginTop: 150, marginBottom: 50 }}>
                <SpinningLoader />
              </div>
            ) : (
              <>
                <p>
                  WavGame Collection - {nfts?.length === 1 ? <br></br> : null}
                  Season 1 | 2
                </p>

                {/* This should be an img read from metadata, if multiple images, show a grid/row */}
                <NftImages
                  nfts={nfts}
                  selectedNft={selectedNft}
                  setSelectedNft={setSelectedNft}
                />
              </>
            )}
          </div>
          <div className="flexDirectionCol">
            <div
              style={{ left: "40%", bottom: "20%" }}
              className="flexDirectionRow m-auto absolute "
            >
              <CustomButton
                disabled={selectedNft === null ? true : false}
                pink
                type="big"
                onClick={() => setContent("prepareSend")}
              >
                CONTINUE
              </CustomButton>
              <button className=" ml-5 mr-5" onClick={handleClose}>
                CANCEL
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
