import * as React from "react";
import { Nft } from "@liquality/wallet-sdk";

export const NftImages = (props) => {
  const { nfts, selectedNft, setSelectedNft } = props;

  const replaceToRightImage = (nftImg) => {
    if (nftImg.endsWith(".svg")) {
      return (nftImg = nftImg
        .replace("-playable.png", ".png")
        .replace(".svg", ".png"));
    } else return nftImg;
  };

  const imagePlaceholder =
    "https://flowbite.com/docs/images/examples/image-4@2x.jpg";

  const readyToSendStyle = {
    border: "1px solid  #f251bc",
    borderRadius: "20px",
  };

  const renderMoreThanThreeImages = () => {
    let rows = [];
    if (nfts) {
      rows = nfts.slice(0, 50).map((nft, index) => {
        let nftImg = replaceToRightImage(nft.metadata?.image);

        console.log(nfts, "NFTSS");
        return (
          <div className="pr-5 mt-3 ">
            <div>
              <button className="relative" onClick={() => setSelectedNft(nft)}>
                <img
                  style={selectedNft?.id === nft.id ? readyToSendStyle : {}}
                  src={nftImg || imagePlaceholder}
                  alt={nft.metadata?.name}
                  className="nftImageSendMany w-full h-full object-cover"
                />
              </button>

              <div className="pt-1 ">
                {nft.id.endsWith(1) || nft.id.endsWith(2) ? (
                  <audio
                    controls
                    controlsList="nodownload"
                    data-testid="AssetMedia--audio"
                    loop
                    preload="auto"
                    src={`https://wavgame-data.netlify.app/songs/${nft.id}.wav`}
                    style={{
                      marginBottom: 5,
                      width: 100,
                      height: 20,
                    }}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : null}

                <p style={{ fontSize: 11 }}>{nft.metadata?.name}</p>
                <p style={{ fontSize: 11 }}>Amount: {nft.balance}</p>
              </div>
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
      rows = nfts.map((nft, index) => {
        let nftImg = replaceToRightImage(nft.metadata?.image);

        return (
          <div className="pr-5 mt-3">
            <button onClick={() => setSelectedNft(nft)}>
              <img
                style={selectedNft?.id === nft.id ? readyToSendStyle : {}}
                src={nftImg || imagePlaceholder}
                alt={nft.metadata?.name}
                className="nftImageSendTwo w-full h-full object-cover"
              />
            </button>

            <div className="pt-1">
              {nft.id.endsWith(1) || nft.id.endsWith(2) ? (
                <audio
                  controls
                  controlsList="nodownload"
                  data-testid="AssetMedia--audio"
                  loop
                  preload="auto"
                  src={`https://wavgame-data.netlify.app/songs/${nft.id}.wav`}
                  style={{
                    marginBottom: 5,
                    width: 237,
                    height: 20,
                  }}
                >
                  Your browser does not support the audio element.
                </audio>
              ) : null}
              <p style={{ fontSize: 11 }}> {nft.metadata?.name}</p>
              <p style={{ fontSize: 11 }}>Amount: {nft.balance}</p>
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
    let nftImg = replaceToRightImage(nfts[0].metadata?.image);

    return (
      <div className=" mt-1">
        <button onClick={() => setSelectedNft(nfts[0])}>
          <img
            style={selectedNft?.id === nfts[0].id ? readyToSendStyle : {}}
            src={nftImg || imagePlaceholder}
            alt={nfts[0].metadata?.name}
            className="nftImageSendOne w-full h-full object-cover"
          />
        </button>

        <div className="pt-1">
          {nfts[0].id.endsWith(1) || nfts[0].id.endsWith(2) ? (
            <audio
              controls
              controlsList="nodownload"
              data-testid="AssetMedia--audio"
              loop
              preload="auto"
              src={`https://wavgame-data.netlify.app/songs/${nfts[0].id}.wav`}
              style={{
                marginBottom: 5,
                width: 257,
                height: 30,
              }}
            >
              Your browser does not support the audio element.
            </audio>
          ) : null}
          <p style={{ fontSize: 11 }}> {nfts[0].metadata?.name}</p>
          <p style={{ fontSize: 11 }}>Amount: {nfts[0].balance}</p>
        </div>
      </div>
    );
  };

  let imageSizeToRender;
  if (nfts?.length === 1) {
    imageSizeToRender = renderOneImage();
  } else if (nfts?.length === 2 || nfts?.length === 3) {
    imageSizeToRender = renderTwoOrThreeImages();
  } else {
    imageSizeToRender = renderMoreThanThreeImages();
  }

  //https://flowbite.com/docs/images/examples/image-4@2x.jpg
  return (
    <>
      {nfts?.length > 6 ? (
        <div
          style={{ maxHeight: "400px" }}
          className="grid grid-cols-6 gap-4  overflow-y-auto"
        >
          {imageSizeToRender}
        </div>
      ) : (
        <div className="flexDirectionRow ">{imageSizeToRender}</div>
      )}
    </>
  );
};
