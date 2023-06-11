import { useState, useEffect, useTransition } from "react";
import "../../App.css";
import "./artist.css";
import { Sidebar } from "./Sidebar";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

import classNames from "classnames";
import { TradeModal } from "../../components/Trade/TradeModal";
import { GameCards } from "../../components/GameCards/GameCards";
import { GameTabs } from "../../components/GameTabs/GameTabs";
import Leaderboard from "./Leaderboard";
import { ReactComponent as RewardsTout } from "../../images/rewards_tout.svg";
import levels from "../../data/levels.json";
import { SendModal } from "../../components/Send/SendModal";
import StaticDataService from "../../services/StaticDataService";
import { useParams } from "react-router-dom";
import { getPublicKey } from "../../utils";

export const Artist = (props) => {
  const [selectedLevel, setSelectedLevel] = useState(3);
  let routeParams = useParams();
  const [artist, setArtist] = useState({});
  const [image, setImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [_isPending, startTransition] = useTransition();
  const [showTrade, setShowTrade] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [levelClicked, setLevelClicked] = useState(null);

  const fetchArtist = async (id) => {
    try {
      const artist = await StaticDataService.findArtistById(id);
      return artist;
    } catch (err) {
      console.log(err, "Error fetching the artist");
    }
  };

  const setShowTradeAndGetLevel = (level) => {
    setShowTrade(true);
    setLevelClicked(level);
  };

  useEffect(() => {
    const fetchData = async () => {
      const artistId = routeParams.artistId || "tk"; // TODO: remove the default
      const _artist = await fetchArtist(artistId);
      const _image = (await import(`../../images/artists/${_artist.image}`))
        .default;
      setArtist(_artist);
      setImage(_image);
    };

    fetchData();

    return () => {
      //any cleanup
    };
  }, [routeParams]);

  function onSelectLevel(level) {
    startTransition(() => {
      setSelectedLevel(level);
    });
  }

  return (
    <div className="container flex">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        artist={artist}
        image={image}
      />
      <div className="flex flex-col items-center md:ml-20">
        <div className="flex flex-col md:flex-row w-full justify-between items-center game-header text-white pt-20">
          <div className="game-header-level">LEVEL: 3 </div>
          <div className="game-header-title">
            {artist?.name?.toUpperCase()}'s GAME_
          </div>
          <div className="game-header-counter">COLLECTABLES: 42</div>
        </div>
        <div className="flex flex-row md:flex-col justify-center my-5">
          <GameTabs levels={levels} currentLevel={1} />
        </div>
        <div className="w-full flex flex-col justify-center">
          <GameCards
            setShowTrade={setShowTradeAndGetLevel}
            levels={levels}
            currentLevel={1}
          />
        </div>
        <div className="flex flex-col  items-center   pt-24 mt-12">
          <div className="flex flex-col justify-center items-center  mb-24 relative">
            <RewardsTout className="mt-5" />

            <div style={{ left: "20%", top: "35%" }} className="absolute">
              <span className="lightCoral">
                EXCLUSIVE REWARDS FOR <br></br> FULL SET HOLDERS!
              </span>
            </div>
          </div>
          <Leaderboard setShowSendModal={setShowSend} />
        </div>
        <div className="flex flex-col  items-center   pt-24 mt-12"></div>
      </div>

      <TradeModal setShow={setShowTrade} show={showTrade} />

      <SendModal setShow={setShowSend} show={showSend} />
    </div>
  );
};
