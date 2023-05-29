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
          </div>
          <div className="ml-3" id="container">
            <div id="blockTwo"></div>
            <div id="text">Level 2</div>
            <p className="levelCardText">Get a top live Song</p>
            <Notes className="levelCardSvg" />
          </div>
          <div className="ml-3" id="container">
            <div id="blockThree"></div>
            <div id="text">Level 3</div>
            <p className="levelCardText">Get an unreleased song</p>
            <Cd className="levelCardSvg" />
          </div>
          <div className="ml-3" id="container">
            <div id="blockFour"></div>
            <div id="text">Level 3</div>
            <p className="levelCardText">Get a limited physical item </p>
            <Microphone className="levelCardSvg" />
            <Union className="levelCardUnion" style={{ left: "90%" }} />
          </div>
          <div className="ml-3" id="container">
            <div id="blockFive"></div>
            <div id="text">Level 5</div>
            <p className="levelCardText">
              Get a limited unreleased track performance
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
          </div>
        </div>
      </div>

      <div className="m-auto text-center justify-center items-center ">
        <div className="mt-5 lineCoral"></div>
        <p className="webfont" style={{ fontSize: 64, color: "#FFA3DA" }}>
          OUR VISION
        </p>
        <div className="m-auto" style={{ width: "50%" }}>
          <p>
            We believe in connecting artists with their true fans. We are a
            community of artists, fans, founders, and devs, building and sharing
            our experiments with the WRLD.
          </p>
        </div>
        <div className="mt-3 flexDirectionRow">
          <p className="text-xs lightPink mt-5  m-auto">CONNECT ON DISCORD</p>
        </div>
        <SmallPinkArrow />

        <br></br>
        <div className=" mb-5 lineCoral"></div>
        <br></br>
      </div>
    </div>
  );
}
