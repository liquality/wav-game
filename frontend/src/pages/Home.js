import React, { useEffect, useState } from "react";
import { ReactComponent as HowToPlay } from "../images/how_to_play.svg";
import { ReactComponent as SmallPinkArrow } from "../images/small_pink_arrow.svg";
import { ReactComponent as HeroShape } from "../images/hero_shape_home.svg";
import { ReactComponent as ArtistText } from "../images/artist_text.svg";
import { ReactComponent as Cd } from "../images/cd.svg";
import { ReactComponent as Notes } from "../images/notes.svg";
import { ReactComponent as Microphone } from "../images/microphone.svg";
import { ReactComponent as Union } from "../images/union.svg";
import { ReactComponent as GlitterOne } from "../images/glitter_one.svg";
import { ReactComponent as GlitterTwo } from "../images/glitter_two.svg";
import { ReactComponent as SparkleOne } from "../images/sparkle_one.svg";
import { ReactComponent as SparkleTwo } from "../images/sparkle_two.svg";
import { ReactComponent as Arrow } from "../images/arrow_home.svg";
import { ReactComponent as Winner } from "../images/winner.svg";
import { ReactComponent as RewardsTout } from "../images/rewards_tout.svg";
import { ReactComponent as DecoratedLine } from "../images/decorated_line.svg";
import { ReactComponent as Twitter } from "../images/twitter.svg";
import { ReactComponent as Discord } from "../images/discord.svg";
import { ReactComponent as Telegram } from "../images/telegram.svg";
import { ReactComponent as Github } from "../images/github.svg";
import { useNavigate } from "react-router-dom";
import { ArtistGrid } from "../components/ArtistGrid";
import { LoginModal } from "../components/Onboarding/LoginModal";
import StaticDataService from "../services/StaticDataService";
import { fetchSession } from "../utils";
import UserService from "../services/UserService";
import { Button } from "../components/Button/Button";

export default function Home(props) {
  const { setChooseArtistView, setShowPickArtistModal, setSelectedArtist } = props;
  const [show, setShow] = React.useState(false);
  const [artistData, setArtistData] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedArtistItem, setSelectedArtistItem] = useState(null);
  const [artistImages, setArtistImages] = useState({});
  const navigate = useNavigate();

  const fetchArtist = async (id) => {
    try {
      return await StaticDataService.getArtists();
    } catch (err) {
      console.log(err, "Error fetching the artist");
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      const artists = await fetchArtist();
      const images = await StaticDataService.getArtistImages();
      const token = fetchSession()?.token;
      if (token) {
        const _games = await UserService.getGameByUserId(
          fetchSession()?.id, //userid
          "",
          token
        );
        setGames(_games);
      }

      setArtistImages(images);
      setArtistData(artists);
    };

    init();
  }, []);

  const handleArtistClick = (artist) => {
    setSelectedArtistItem(artist);
  };

  const handleChooseArtist = () => {
    if (fetchSession()?.token) {
      // check game status if it not started yet we redirect to the modal, if not just redirecto to the page
      const game = games?.find((g) => {
        return g.artist_name === selectedArtistItem?.id
      });

      if (game) {
        navigate(`/artist/${game.artist_name}`);
      } else {
        setSelectedArtist(selectedArtistItem);
        setChooseArtistView("gameIncentives");
        setShowPickArtistModal(true);
      }
    } else {
      setShow(true);
    }
  }
  return (
    <div className="mt-5">
      {/* Welcome to wavgame hero */}
      <div className="flex justify-center items-center relative">
        <HeroShape />
        <span className="absolute left-34 top-32 welcomeToWavGame">
          Welcome to Wavgame
        </span>
        <div
          style={{ left: "46%", top: "65%", width: '35%' }}
          className="flex flex-wrap absolute p-3"
        >
          <p className="flex">
            Win your favorite artists' collectibles. A fun burn-to-win on-chain
            experience made up of 6 levels.
          </p>
        </div>
        <br></br>
      </div>
      {/* Artists text */}
      <div className="lineCoral mb-5 mt-5"></div>
      <div className="flex justify-center items-center">
        {" "}
        <ArtistText />
      </div>

      <p className="text-center softPink mb-5">
        We are at the the intersection of music and Web3, giving meaning to
        <br></br>creators’ collective experiences.
      </p>

      {/* Artist grid */}
      <ArtistGrid
        selectedId={selectedArtistItem}
        artistData={artistData}
        artistImages={artistImages}
        games={games}
        handleClick={handleArtistClick}
      />
      <br></br>
      <br></br>
      <div className="mt-2 mb-24 flex justify-center items-center">
        <Button
          size={'large'}
          disabled={!selectedArtistItem}
          mode={'pink'}
          onClick={handleChooseArtist}
        >
          CHOOSE ARTIST
        </Button>

      </div>

      {/* How to play */}
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

        {/* 6 cards with levels */}
        <div className="mt-5 p-5 flexDirectionRow">
          <div id="container">
            <div id="blockOne"></div>
            <div id="text">Level 1</div>
            <p className="levelCardText">
              Buy 32 artist collectibles toward winning the main prize{" "}
            </p>
            <Union className="levelCardUnion" />
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
              TRADE 2
            </p>
          </div>
          <div className="ml-3" id="container">
            <div id="blockFour"></div>
            <div id="text">Level 4</div>
            <p className="levelCardText">Play to reveal </p>
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
              TRADE 2
            </p>
          </div>
          <div className="ml-3" id="container">
            <div id="blockFive"></div>
            <div id="text">Level 5</div>
            <p className="levelCardText">Play to reveal</p>
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
            <div id="blockSix"></div>
            <div id="text">Level 6</div>
            <p className="levelCardText">
              1 WINNER gets A 1-ON- 1 TRIP & CONCERT
            </p>
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
        {/* end of 6 cards with levels */}
        {/* Rewards tout */}
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
        <div className="mt-24 mb-24 flex justify-center items-center">
          <button className="pinkBtn " onClick={() => setShow(true)}>
            {" "}
            START GAME
          </button>
        </div>

        <br></br>
      </div>

      {/* Our vision */}
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

        <a
          className="hover:no-underline hover:text-decoration-none"
          href="https://discord.com/invite/35yAGaQ3gx"
          target="blank"
          rel="noreferrer"
        >
          <p
            className="text-xs no-underline lightPink flexDirectionRow mt-5 text-center justify-center items-center"
            style={{
              lineHeight: 1.4,
            }}
          >
            CONNECT ON DISCORD <SmallPinkArrow className="ml-2" />
          </p>
        </a>

        <br />
        <div className="flex justify-center items-center relative mt-5 mb-5">
          <DecoratedLine />
        </div>
        <br />
      </div>
      {/* Built with the LIQ SDK */}
      <div className="flex justify-center items-center relative mt-5 mb-5">
        <div className="builtWithLiqSDKContainer">
          <p
            className="absolute webfont lightCoral "
            style={{
              left: "15%",
              bottom: "0%",
              top: "10%",
              fontSize: 64,
              lineHeight: 0.6,
            }}
          >
            Built with the <br></br> Liquality SDK
          </p>

          <div
            className="absolute "
            style={{
              right: "20%",
              top: "10%",
              width: "30%",
            }}
          >
            <p
              className="absolute text-s"
              style={{
                lineHeight: 1.4,
              }}
            >
              Liquality provides open-source infrastructure <br></br> legos that
              make web3 easy for users <br></br>and developers while maintaining
              the values of Web3.
            </p>
            <div
              style={{
                marginBottom: "25%",
              }}
            ></div>

            <a
              href="https://docs.liquality.io/"
              target="blank"
              rel="noreferrer"
            >
              {" "}
              <p
                className="absolute text-xs lightPink flexDirectionRow"
                style={{
                  lineHeight: 1.4,
                }}
              >
                SEE SDK DOCUMENTATION <SmallPinkArrow className="ml-2 mt-1" />
              </p>
            </a>

            <div
              style={{
                marginBottom: "35%",
              }}
            ></div>
            <p
              className="absolute  lightPink flexDirectionRow"
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
            </p>
          </div>
        </div>
      </div>
      <LoginModal setShow={setShow} show={show} />
    </div>
  );
}
