import { ReactComponent as NftPreview } from "../../images/nft_preview.svg";
import { ReactComponent as NftBigPreview } from "../../images/nft_preview_big.svg";

import { ReactComponent as DoubleArrow } from "../../images/double_arrow.svg";
import * as React from "react";
import { useState, useEffect } from "react";
import CustomButton from "../Button";

export const TradeStart = (props) => {
  const { setContent } = props;
  const [nftAmount, setNftAmount] = useState(1);

  return (
    <div className="contentView flex justify-around">
      <div className="p-4 ml-5 flexDirectionRow ">
        <div>
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

            <div className="pr-5 pt-5 mt-4 flexDirectionColumn m-start">
              <DoubleArrow className="m-auto" />
              <CustomButton
                onClick={() => setContent("processingTrade")}
                pink
                type="big"
                mt="50px"
                mb="50px"
                ml="50px"
                mr="40px"
              >
                TRADE
              </CustomButton>

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
