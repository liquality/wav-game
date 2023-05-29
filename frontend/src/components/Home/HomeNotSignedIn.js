import React from "react";

import { ReactComponent as HowToPlay } from "../../images/how_to_play.svg";
import { ReactComponent as SmallPinkArrow } from "../../images/small_pink_arrow.svg";
import { ReactComponent as HeroShape } from "../../images/hero_shape_home.svg";
import { ReactComponent as ArtistText } from "../../images/artist_text.svg";
import { ReactComponent as Cd } from "../../images/cd.svg";
import { ReactComponent as Notes } from "../../images/notes.svg";
import { ReactComponent as Microphone } from "../../images/microphone.svg";
import { ReactComponent as Union } from "../../images/union.svg";
import { ReactComponent as GlitterOne } from "../../images/glitter_one.svg";
import { ReactComponent as GlitterTwo } from "../../images/glitter_two.svg";
import { ReactComponent as SparkleOne } from "../../images/sparkle_one.svg";
import { ReactComponent as SparkleTwo } from "../../images/sparkle_two.svg";
import { ReactComponent as Arrow } from "../../images/arrow_home.svg";
import { ReactComponent as Winner } from "../../images/winner.svg";
import { ReactComponent as RewardsTout } from "../../images/rewards_tout.svg";
import { ReactComponent as DecoratedLine } from "../../images/decorated_line.svg";

import { ArtistGrid } from "../ArtistGrid";

export default function HomeWhenNotSignedIn() {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState({});

  const handleArtistClick = () => {
    console.log("Artist clicked, should refer thi his/her website");
  };
  return (
    <div className="mt-5">
      <div className="flex justify-center items-center relative">
        <HeroShape />
        <span className="absolute left-34 top-32 welcomeToWavGame">
          Welcome to Wavgame
        </span>
        <div
          style={{ width: "40%", left: "46%", top: "67%" }}
          className="absolute"
        >
          <span className=" ">
            Win your favorite artists' collectibles. A fun burn-to-win on-chain
            experience made up of 6 levels.
          </span>
        </div>
        <br></br>
      </div>

      <div className="lineCoral mb-5 mt-5"></div>
      <div className="flex justify-center items-center">
        {" "}
        <ArtistText />
      </div>

      <p className="text-center softPink mb-5">
        We are at the the intersection of music and Web3, giving meaning to
        <br></br>creators’ collective experiences.
      </p>

      <ArtistGrid handleClick={handleArtistClick} />
      <br></br>
      <br></br>

      <div className="lighterGreyHomeContainer mt-5">
        <br></br>
        <br></br>
        <div className="flex justify-center items-center mt-5">
          <HowToPlay />
          <br></br>
        </div>
        <div className="mt-3" style={{ width: "40%", margin: "auto" }}>
          <p className="text-s	text-center softPink">
            At each level, trade 2 collectables for one. At the final level, one
            lucky winner takes the ultimate prize from their favorite artist.
          </p>
        </div>
        <div className="mt-5 p-5 flexDirectionRow">
          <div id="container">
            <div id="blockOne"></div>
            <div id="text">Level 1</div>
            <p className="levelCardText">From 1 artist, buy 32 collectables </p>
            <Union className="levelCardUnion" />
            <Arrow
              className="levelCardSvg"
              style={{ left: "10%", bottom: "0%", top: "110%" }}
            />
            <p
              className="levelCardSvg lightCoral text-xs"
              style={{ left: "10%", bottom: "0%", top: "120%" }}
            >
              TRADE 1
            </p>
          </div>
          <div className="ml-3" id="container">
            <div id="blockTwo"></div>
            <div id="text">Level 2</div>
            <p className="levelCardText">Get a top live Song</p>
            <Notes className="levelCardSvg" />
            <Arrow
              className="levelCardSvg"
              style={{ left: "10%", bottom: "0%", top: "110%" }}
            />
            <p
              className="levelCardSvg lightCoral text-xs"
              style={{ left: "10%", bottom: "0%", top: "120%" }}
            >
              TRADE 2
            </p>
          </div>
          <div className="ml-3" id="container">
            <div id="blockThree"></div>
            <div id="text">Level 3</div>
            <p className="levelCardText">Get an unreleased song</p>
            <Cd className="levelCardSvg" />{" "}
            <Arrow
              className="levelCardSvg"
              style={{ left: "10%", bottom: "0%", top: "110%" }}
            />
            <p
              className="levelCardSvg lightCoral text-xs"
              style={{ left: "10%", bottom: "0%", top: "120%" }}
            >
              TRADE 3
            </p>
          </div>
          <div className="ml-3" id="container">
            <div id="blockFour"></div>
            <div id="text">Level 3</div>
            <p className="levelCardText">Get a limited physical item </p>
            <Microphone className="levelCardSvg" />
            <Union className="levelCardUnion" style={{ left: "90%" }} />{" "}
            <Arrow
              className="levelCardSvg"
              style={{ left: "10%", bottom: "0%", top: "110%" }}
            />{" "}
            <p
              className="levelCardSvg lightCoral text-xs"
              style={{ left: "10%", bottom: "0%", top: "120%" }}
            >
              TRADE 4
            </p>
          </div>
          <div className="ml-3" id="container">
            <div id="blockFive"></div>
            <div id="text">Level 5</div>
            <p className="levelCardText">
              Get a limited unreleased track performance
            </p>
            <Arrow
              className="levelCardSvg"
              style={{ left: "10%", bottom: "0%", top: "110%" }}
            />

            <p
              className="levelCardSvg lightCoral text-xs"
              style={{ left: "10%", bottom: "0%", top: "120%" }}
            >
              TRADE 5
            </p>
          </div>

          <div className="ml-3" id="container">
            <div id="blockSix"></div>
            <div id="text">Level 6</div>
            <p className="levelCardText">1 WINNER gets THE ULTIMATE REWARD!</p>
            <GlitterOne
              className="levelCardSvg"
              style={{ left: "10%", top: "60%" }}
            />
            <GlitterTwo
              className="levelCardSvg"
              style={{ left: "70%", top: "80%" }}
            />
            <SparkleOne
              className="levelCardSvg"
              style={{ left: "70%", top: "10%" }}
            />
            <SparkleTwo
              className="levelCardSvg"
              style={{ left: "80%", top: "-10%" }}
            />
            <Winner
              className="levelCardSvg"
              style={{ left: "30%", bottom: "0%", top: "110%" }}
            />
          </div>
        </div>
        <div className="flex justify-center items-center relative mt-5">
          <RewardsTout className="mt-5" />

          <div style={{ left: "34%", top: "35%" }} className="absolute">
            <span className="lightCoral">
              EXCLUSIVE REWARDS FOR <br></br> FULL SET HOLDERS
            </span>
          </div>
          <div style={{ left: "34%", top: "58%" }} className="absolute">
            <span className="text-xs">
              Didn’t win the final prize? Don’t fret, as a full set <br></br>
              holder you will still be rewarded.
            </span>
          </div>
        </div>
        <div className="mt-24"></div>
        <br></br>
      </div>

      <div className="m-auto text-center justify-center items-center">
        <div className="mt-5"></div>
        <p className="webfont lightCoral" style={{ fontSize: "64px" }}>
          OUR VISION
        </p>
        <div className="m-auto" style={{ width: "50%" }}>
          <p>
            We believe in connecting artists with their true fans. We are a
            community of artists, fans, founders, and devs, building and sharing
            our experiments with the WRLD.
          </p>
        </div>
        <div className="mt-3 flex flex-row">
          <p className="text-xs lightPink mt-5 m-auto">CONNECT ON DISCORD</p>
        </div>
        <SmallPinkArrow />

        <br />
        <div className="flex justify-center items-center relative mt-5 mb-5">
          <DecoratedLine />
        </div>
        <br />
      </div>
    </div>
  );
}
