import { ReactComponent as NftPreview } from "../../images/nft_preview.svg";
import { ReactComponent as NftBigPreview } from "../../images/nft_preview_big.svg";

import { ReactComponent as DoubleArrow } from "../../images/double_arrow.svg";
import * as React from "react";
import { useState, useEffect } from "react";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { fetchSession } from "../../utils";

export const TradeStart = (props) => {
  const { setContent } = props;
  const [nftAmount, setNftAmount] = useState(1);

  return (
    <div className=" contentView flex">
      <div className="p-4 w-1/2 justify-center items-center margin-auto">
        {/* Big image container */}{" "}
        <div
          className="justify-center items-center "
          style={{
            paddingLeft: "20%",
            width: "70%",
            height: "70%",
          }}
        >
          {" "}
          <p className="webfont coral text-2xl">Level 2</p>
          <p className=" mt">Trade 2 top live songs</p>
          <div className="flexDirectionRow mt-3">
            <NftPreview className="mr-1 "></NftPreview>{" "}
            <NftPreview></NftPreview>
          </div>
        </div>{" "}
      </div>
      <div className="w-1/2 flex flex-col justify-center">
        {/* Text container */}

        <div className="flexDirectionRow">
          {" "}
          {/*     <img
            className="avatarImage ml-2"
            src="https://avatars.githubusercontent.com/u/34882183?v=4"
            alt="Artist Avatar"
          />{" "} */}
          <p className="mt-2">Level 3</p>
        </div>
        <p className="lineNoCenter mt-5 mb-4" style={{ width: "50%" }}></p>

        <p className="mb-4" style={{ width: "50%" }}>
          text text burn burn text text burn burn text text burn burn text text
          burn burn text text burn burn
        </p>

        <p className="lineNoCenter mb-4" style={{ width: "50%" }}></p>

        <div className="flexDirectionRow mb-3">
          bu bä
          <p className="mr-3 mt-2 ml-5">Total $100 </p>
        </div>
        <button className="pinkBtn">Next</button>
      </div>
    </div>
  );
};
