import * as React from "react";
import { Nft } from "@liquality/wallet-sdk";

export const NftImages = (props) => {
  const { nfts, selectedNft, setSelectedNft } = props;

  const imagePlaceholder =
    "https://flowbite.com/docs/images/examples/image-4@2x.jpg";

  const readyToSendStyle = {
    border: "1px solid  #f251bc",
    borderRadius: "20px",
  };

  const renderMoreThanThreeImages = () => {
    let rows = [];
    if (nfts) {
      rows = nfts.slice(0, 7).map((nft, index) => {
        return (
          <div className="pr-5 mt-3">
            <button onClick={() => setSelectedNft(nft)}>
              <img
                style={selectedNft?.id === nft.id ? readyToSendStyle : {}}
                src={
                  nft.metadata?.image?.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  ) || imagePlaceholder
                }
                alt={nft.metadata?.name}
                className="nftImageSendMany w-full h-full object-cover"
              />
            </button>

            <div className="pt-1">
              <p style={{ fontSize: 11 }}> LVL {index + 1}</p>
              <p style={{ fontSize: 11 }}> {nft.contract.name}</p>
              <p style={{ fontSize: 11 }}>{nft.contract.name}</p>
            </div>
          </div>
        );
      });
    } else {
      return <p>No NFTs available</p>;
    }

    return rows;
  };

  const renderTwoOrThreeImages = () => {
    let rows = [];
    if (nfts) {
      rows = nfts.slice(0, 7).map((nft, index) => {
        return (
          <div className="pr-5 mt-3">
            <button onClick={() => setSelectedNft(nft)}>
              <img
                style={selectedNft?.id === nft.id ? readyToSendStyle : {}}
                src={
                  nft.metadata?.image?.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  ) || imagePlaceholder
                }
                alt={nft.metadata?.name}
                className="nftImageSendTwo w-full h-full object-cover"
              />
            </button>

            <div className="pt-1">
              <p style={{ fontSize: 11 }}>LVL {index + 1}</p>
              <p style={{ fontSize: 11 }}> {nft.contract.name}</p>
              <p style={{ fontSize: 11 }}>{nft.contract.name}</p>
            </div>
          </div>
        );
      });
    } else {
      return <p>No NFTs available</p>;
    }

    return rows;
  };

  const renderOneImage = () => {
    return (
      <div className=" mt-1">
        <button onClick={() => setSelectedNft(nfts[0])}>
          <img
            style={selectedNft?.id === nfts[0].id ? readyToSendStyle : {}}
            src={
              nfts[0].metadata?.image?.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              ) || imagePlaceholder
            }
            alt={nfts[0].metadata?.name}
            className="nftImageSendOne w-full h-full object-cover"
          />
        </button>

        <div className="pt-1">
          <p style={{ fontSize: 11 }}> LVL {1}</p>
          <p style={{ fontSize: 11 }}> {nfts[0].contract.name}</p>
          <p style={{ fontSize: 11 }}>{nfts[0].contract.name}</p>
        </div>
      </div>
    );
  };

  let imageSizeToRender;
  if (nfts.length === 1) {
    imageSizeToRender = renderOneImage();
  } else if (nfts.length === 2 || nfts.length === 3) {
    imageSizeToRender = renderTwoOrThreeImages();
  } else {
    imageSizeToRender = renderMoreThanThreeImages();
  }

  //https://flowbite.com/docs/images/examples/image-4@2x.jpg
  return <div className="flexDirectionRow ">{imageSizeToRender}</div>;
};
