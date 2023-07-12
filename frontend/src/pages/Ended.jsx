import "../index.css";
import { ReactComponent as HeroShapeEnded } from "../images/game_ended_hero.svg";
import { ReactComponent as EndedGraphic } from "../images/ended_graphic.svg";
import { ReactComponent as Twitter } from "../images/twitter.svg";
import { ReactComponent as Discord } from "../images/discord.svg";
import { ReactComponent as Telegram } from "../images/telegram.svg";
import { ReactComponent as Github } from "../images/github.svg";
import { ReactComponent as SmallPinkArrow } from "../images/small_pink_arrow.svg";

export const Ended = (props) => {
  //const { onSubmit } = props;

  return (
    <div className="flex col justify-center items-center relative flex-col">
      <HeroShapeEnded />
      <EndedGraphic />

      <div className="mt-3 mb-5" style={{ width: "45%", margin: "auto" }}>
        <p className="text-s	mb-3 text-center softPink">
          If you won an item that was not digital in nature (like a physical
          item, or the main prize), we will be in touch with you shortly.
        </p>
      </div>

      <div
        className="grid grid-cols-2 gap-4 builtWithLiqSDKContainer relative"
        style={{
          width: "701px",
          height: "258px",
        }}
      >
        <div
          className="grid grid-cols-2 gap-4 builtWithLiqSDKContainer absolute"
          style={{
            width: "701px",
            height: "258px",
            bottom: "3%",
            right: "1%",
            zIndex: 100,
          }}
        >
          <p>bu be</p>
        </div>
      </div>

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
