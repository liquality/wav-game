import { useState, useTransition } from "react";
import "../../App.css";
import "./artist.css";
import { Sidebar } from "./Sidebar";
import classNames from "classnames";
import { TradeModal } from "../../components/Trade/TradeModal";
import { GameCards } from "../../components/GameCards/GameCards";
import { GameTabs } from "../../components/GameTabs/GameTabs";
import Leaderboard from "./Leaderboard";
import { ReactComponent as RewardsTout } from "../../images/rewards_tout.svg";
import levels from "../../data/levels.json";
import { SendModal } from "../../components/Send/SendModal";

export const Artist = (props) => {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [_isPending, startTransition] = useTransition();
  const [showTrade, setShowTrade] = useState(false);
  const [showSend, setShowSend] = useState(false);

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
        artist={props.artist}
      />
      <div className="flex flex-col items-center md:ml-20">
        <div className="flex flex-col md:flex-row w-full justify-between items-center game-header text-white pt-20">
          <div className="game-header-level">LEVEL: 3 </div>
          <div className="game-header-title">TK’S GAME_</div>
          <div className="game-header-counter">COLLECTABLES: 42</div>
        </div>
        <div className="flex flex-row md:flex-col justify-center my-5">
          <GameTabs levels={levels} currentLevel={1} />
        </div>
        <div className="w-full flex flex-col justify-center">
          <GameCards levels={levels} currentLevel={1} />
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
