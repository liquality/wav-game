import { NftService } from "@liquality/wallet-sdk";
import { ReactComponent as NftTiles } from "../../images/nft_tiles.svg";

import * as React from "react";
import { useState, useEffect } from "react";
const imagePlaceholder =
  "https://flowbite.com/docs/images/examples/image-4@2x.jpg";
export const PrepareSend = ({ selectedNft }) => {
  //const [nfts, setNfts] = useState([]);

  const fetchNfts = async (address, chainId) => {};

  useEffect(() => {
    const fetchData = async () => {
      /* const nftData = await fetchNfts();
      setNfts(nftData); */
    };

    fetchData();

    return () => {
      //any cleanup
    };
  }, []);

  return (
    <div className="contentView flex justify-center">
      {" "}
      <div className="p-4 w-1/2 flex justify-center items-center margin-auto">
        <img
          src={
            selectedNft.metadata?.image?.replace(
              "ipfs://",
              "https://ipfs.io/ipfs/"
            ) || imagePlaceholder
          }
          alt={selectedNft.metadata?.name}
          className="nftImagePrepared w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        {/* Text container */}

        <div className="flexDirectionRow">
          {" "}
          <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />{" "}
          <p className="mt-2">Artist Name</p>
        </div>
        <p className="lineNoCenter mt-5 mb-4" style={{ width: "50%" }}></p>

        <p className="mb-4" style={{ width: "50%" }}>
          We made two special NFTs. You are going to hold randomized amounts of
          both NFTs. To move through each level, you will need:
        </p>
        <p className="mb-4">
          • 4 items to get to level 3 <br></br>• 8 to level 4 <br></br>• 16 to
          level 5 <br></br>• 32 to level 6
        </p>
        <p className="lineNoCenter mb-4" style={{ width: "50%" }}></p>

        <div className="flexDirectionRow mb-3">
          <p className="mr-3 mt-2 ml-5">Total $100 </p>
        </div>
      </div>
    </div>
  );
};
