import { ReactComponent as NftPreview } from "../../images/nft_preview.svg";
import { ReactComponent as NftBigPreview } from "../../images/nft_preview_big.svg";

import { ReactComponent as DoubleArrow } from "../../images/double_arrow.svg";
import * as React from "react";
import { useState, useEffect } from "react";

export const TradeStart = (props) => {
  const { setContent } = props;
  const [nftAmount, setNftAmount] = useState(1);

  return (
    <div className="contentView flex">
      <div className="p-4 flexDirectionRow  margin-auto">
        <div
          className="justify-center items-center "
          style={{
            paddingLeft: "20%",
          }}
        >
          {" "}
          <div className="flexDirectionRow">
            <div className="flexDirectionColumn">
              <p className="webfont coral text-2xl">Level 2</p>
              <p className=" mb-3">Trade 2 top live songs</p>
              <div className="flexDirectionRow">
                <NftPreview className="mr-1 " />
                <NftPreview />
              </div>
            </div>

            <div className="pr-5 pt-5 mt-3 flexDirectionColumn">
              <DoubleArrow className="m-auto" />
              <button style={{ width: "140px" }} className="pinkBtn m-5">
                TRADE
              </button>
              <DoubleArrow className="m-auto" />
            </div>
            <div className=" pr-5 flexDirectionColumn ">
              <p className="webfont coral text-2xl">Level 3</p>
              <p className=" mb-3">Trade 2 top live songs</p>
              <NftBigPreview />
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
