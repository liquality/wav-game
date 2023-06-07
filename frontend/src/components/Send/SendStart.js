import { NftService } from "@liquality/wallet-sdk";
import { useState, useEffect } from "react";
import CustomButton from "../Button";
import { NftImages } from "./NftImages";

export const SendStart = ({
  selectedNft,
  setSelectedNft,
  setContent,
  handleClose,
}) => {
  const [nfts, setNfts] = useState([]);

  const fetchNfts = async (address, chainId) => {
    //TODO: fetch your own public address from localstorage instead
    const nfts = await NftService.getNfts(
      "0xe7910F0b83ad155737043c771E2594f74B0BB739",
      137
    );
    return nfts;
  };

  useEffect(() => {
    const fetchData = async () => {
      const nftData = await fetchNfts();
      setNfts(nftData);
    };

    fetchData();
  }, [selectedNft]);

  return (
    <div className="contentView flex justify-center">
      <div className="p-4 ml-5 flexDirectionRow ">
        <div>
          {" "}
          <div className="flexDirectionCol mt-1">
            <p>
              TK WavGame Collection - {nfts.length === 1 ? <br></br> : null}
              Season 1 | 2
            </p>

            {/* This should be an img read from metadata, if multiple images, show a grid/row */}
            <NftImages
              nfts={nfts.slice(0, 3)}
              selectedNft={selectedNft}
              setSelectedNft={setSelectedNft}
            />
          </div>
          <div className="flexDirectionCol">
            <br></br>
            <br></br>
            <div className="flexDirectionRow m-auto">
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
