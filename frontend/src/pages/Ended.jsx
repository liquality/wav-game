import "../index.css";
import { ReactComponent as HeroShapeEnded } from "../images/game_ended_hero.svg";
import { ReactComponent as EndedGraphic } from "../images/ended_graphic.svg";
import { ReactComponent as Twitter } from "../images/twitter.svg";
import { ReactComponent as Discord } from "../images/discord.svg";
import { ReactComponent as Telegram } from "../images/telegram.svg";
import { ReactComponent as Github } from "../images/github.svg";
import { ReactComponent as StarFilled } from "../images/star_filled.svg";
import { ReactComponent as StarUnfilled } from "../images/star_unfilled.svg";

import { ReactComponent as SmallPinkArrow } from "../images/small_pink_arrow.svg";
import { ReactComponent as DecoratedLine } from "../images/decorated_line.svg";

import { ReactComponent as TwitterIcon } from "../images/twitter.svg";
import { ReactComponent as InstagramIcon } from "../images/instagram.svg";
import { ReactComponent as TikTokIcon } from "../images/tiktok.svg";
import LensIcon from "../images/lenster.png";
import { useState } from "react";
import UserService from "../services/UserService";
import { fetchSession } from "../utils";

export const Ended = (props) => {
  //const { onSubmit } = props;
  const [rating, setRating] = useState(0);

  const starRating = [1, 2, 3, 4, 5];

  const handleStarClick = async (item) => {
    setRating(item);
    if (fetchSession().id) {
      await UserService.updateUser(
        fetchSession().id,
        {
          feedback_rating: item,
        },
        fetchSession().token
      );
    }
  };
  console.log(rating, "rating");
  const renderStars = () => {
    if (starRating.length > 0) {
      return starRating.map((item, index) => {
        let buttonStyle;
        if (item <= rating) {
          buttonStyle = <StarFilled />;
        } else {
          buttonStyle = <StarUnfilled />;
        }
        return (
          <div className="flexDirectionRow mb-3" key={index}>
            <button
              onClick={() => handleStarClick(item)}
              className="flexDirectionRow"
            >
              {buttonStyle}
            </button>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div className="flex col justify-center items-center relative flex-col">
      <HeroShapeEnded />
      <EndedGraphic />

      <div className="mt-3 mb-5" style={{ width: "45%", margin: "auto" }}>
        <p className="text-s	mb-5 text-center softPink">
          If you won an item that was not digital in nature (like a physical
          item, or the main prize), we will be in touch with you shortly.
        </p>

        <p className="text-s mb-3 text-center softPink mt-4">FOLLOW WAVGAME</p>
        <div className="flex text-center justify-center items-center ">
          <a
            className="md:hover:text-white-700 "
            href="https://twitter.com/wavWRLD_"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://www.instagram.com/wavwrld.eth"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://www.tiktok.com/@wavwrld"
            target="_blank"
            rel="noreferrer"
          >
            <TikTokIcon />
          </a>{" "}
          <a
            className="md:hover:text-white-700 ml-3"
            href="https://lenster.xyz/u/wavwrld"
            target="_blank"
            rel="noreferrer"
          >
            <img src={LensIcon} alt="" />
          </a>{" "}
        </div>
      </div>

      {/* Rate the GAME with stars */}
      <div
        className="builtWithLiqSDKContainer relative"
        style={{
          width: "701px",
          height: "258px",
        }}
      >
        <div
          className="builtWithLiqSDKContainer absolute"
          style={{
            width: "701px",
            height: "258px",
            bottom: "3%",
            right: "1%",
            zIndex: 100,
            border: "1px solid #7a2ed6",
          }}
        >
          <p className="game-header-title lightCoral">Enjoyed the game?</p>
          <p className="text-s	mb-3 text-center softPink">
            We'd love to know how much. Rate us and take a{" "}
            <a
              className="no-underline hover:no-underline lightPink"
              href="https://app.spinamp.xyz/platform/wavgame"
              target="blank"
            >
              <u>survey.</u>
            </a>
          </p>
          <div className="flexDirectionRow mt-5 justify-center items-center">
            {renderStars()}
          </div>
        </div>
      </div>

      {/* Our vision */}
      <div className="m-auto text-center justify-center items-center">
        <div className="mt-48"></div>
        <p className="webfont lightCoral" style={{ fontSize: "64px" }}>
          OUR VISION
        </p>
        <div className="m-auto" style={{ width: "50%" }}>
          <p style={{ fontSize: "23px", lineHeight: "34px" }}>
            wavWRLD connects artists with their true fans. We are a community of
            artists, fans, founders, and devs, building and sharing our
            experiments with the WRLD.
          </p>
        </div>

        <a
          className="hover:no-underline hover:text-decoration-none"
          href="https://t.me/+QtvBTQK24iw5Mzcx"
          target="blank"
          rel="noreferrer"
        >
          <p
            className="text-xs no-underline lightPink flexDirectionRow mt-5 text-center justify-center items-center"
            style={{
              lineHeight: 1.4,
            }}
          >
            CONNECT ON TELEGRAM <SmallPinkArrow className="ml-2" />
          </p>
        </a>

        <br />
        <div className="flex justify-center items-center relative mt-5 mb-5">
          <DecoratedLine />
        </div>
        <br />
      </div>
      {/* Built with the LIQ SDK */}
      <div className="flex flex-row justify-center items-center mt-5 mb-5">
        <div className="grid grid-cols-2 gap-4 builtWithLiqSDKContainer">
          <div
            className="webfont lightCoral "
            style={{
              fontSize: 64,
              lineHeight: 0.6,
              marginTop: 20,
            }}
          >
            BUILT WITH THE <br></br> LIQUALITY WEB3 SDK
          </div>

          <div
            style={{
              marginTop: 20,
            }}
          >
            <p
              className="text-s"
              style={{
                lineHeight: 1.4,
              }}
            >
              Liquality offers open-source tools for developers <br></br>
              to streamline user experience and ease the entry <br></br>
              to the decentralized web.
            </p>
            <div
              style={{
                marginTop: "1rem",
              }}
            ></div>

            <a
              href="https://docs.liquality.io/"
              target="blank"
              rel="noreferrer"
              className="hover:no-underline"
            >
              {" "}
              <p
                className="text-xs lightPink flexDirectionRow "
                style={{
                  lineHeight: 1.4,
                }}
              >
                SEE SDK DOCUMENTATION <SmallPinkArrow className="ml-2 mt-1" />
              </p>
            </a>
            <div
              className="lightPink flexDirectionRow mt-5"
              style={{
                lineHeight: 1.4,
              }}
            >
              <a
                href="https://twitter.com/Liquality_io/"
                target="blank"
                rel="noreferrer"
              >
                <Twitter className="mr-3 " />
              </a>
              <a href="https://t.me/liquality" target="blank" rel="noreferrer">
                <Telegram className="mr-3 " />
              </a>
              <a
                href="https://github.com/liquality"
                target="blank"
                rel="noreferrer"
              >
                <Github className="mr-3 -mt-1" />
              </a>{" "}
              <a
                href="https://discord.com/invite/35yAGaQ3gx"
                target="blank"
                rel="noreferrer"
              >
                {" "}
                <Discord className="mr-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
