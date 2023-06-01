import { useState, PropsWithChildren, useTransition } from "react";
import "../../App.css";
import "./dashboard.css";
import { Sidebar } from "../Artist/Sidebar";
import classNames from "classnames";
import { TradeModal } from "../../components/Trade/TradeModal";

const levels = [
  {
    id: 1,
    label: "LVL 1",
    status: "completed",
    title: "LEVEL 1",
    content: "Get 1 Unreleased Song",
    count: "You have 2.",
  },
  {
    id: 2,
    label: "LVL 2",
    status: "completed",
    title: "LEVEL 2",
    content: "Get 1 Unreleased Song",
    count: "You have 2.",
  },
  {
    id: 3,
    label: "LVL 3",
    status: "active",
    title: "LEVEL 3",
    content: "Get 1 Unreleased Song",
    count: "You have 2.",
  },
  {
    id: 4,
    label: "LV 4",
    status: "locked",
    title: "LEVEL 4",
    content: "Get 1 Unreleased Song",
    count: "You have 2.",
  },
  {
    id: 5,
    label: "LVL 5",
    status: "locked",
    title: "LEVEL 5",
    content: "Get 1 Unreleased Song",
    count: "You have 2.",
  },
  {
    id: 6,
    label: "LVL 6",
    status: "locked",
    title: "LEVEL 6",
    content: "Get 1 Unreleased Song",
    count: "You have 2.",
  },
];

const levelStyles = {
  completed: {
    border: "border-completedStroke",
    text: "text-completedStroke",
    background: "bg-completed",
  },
  active: {
    border: "border-activePinkStroke",
    text: "text-activePinkStroke",
    background: "bg-activePink",
  },
  locked: {
    border: "border-lockedStroke",
    text: "text-lockedStroke",
    background: "bg-locked",
  },
};

export const Dashboard = (props: PropsWithChildren) => {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTrade, setShowTrade] = useState(false);

  const [isPending, startTransition] = useTransition();
  function onSelectLevel(level: number) {
    startTransition(() => {
      setSelectedLevel(level);
    });
  }

  return (
    <div className="">
      {/* <NavBar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} /> */}

      <div className="grid md:grid-cols-sidebar mt-3 container">
        <Sidebar artist={""} open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="grid md:ml-20">
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row w-full justify-between items-center game-header text-white pt-20">
              <div className="game-header-level">LEVEL: 3 </div>
              <div className="game-header-title">TK’S GAME_</div>
              <div className="game-header-counter">COLLECTABLES: 42</div>
            </div>
            <div className="flex justify-center my-5">
              <ul className="level-tabs">
                {levels.map((level) => {
                  const styles = levelStyles[level.status];
                  return (
                    <li key={level.id} onClick={() => onSelectLevel(level.id)}>
                      <div className={`${styles.text}`}>{level.label}</div>
                      <div
                        className={`level-bar dark:border ${styles.border} ${styles.background}`}
                      ></div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-row mt-5">
              {levels.map((level) => {
                const styles = levelStyles[level.status];
                return (
                  <div
                    key={level.id}
                    onClick={() => onSelectLevel(level.id)}
                    className={classNames({
                      [`dark:border ${styles.border} ${styles.background}`]:
                        true,
                      "text-white px-5 py-4 flex flex-col justify-between level-card":
                        true,
                      active: selectedLevel === level.id,
                    })}
                  >
                    <div className="flex flex-col justify-between">
                      <div className="level-card-level">{level.title}</div>
                      <div className="level-card-title">{level.content}</div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="level-card-count">{level.count}</div>
                      <div>
                        <button
                          className="bg-white p-3 text-activePink level-card-action"
                          onClick={() => setShowTrade(true)}
                        >
                          TRADE NOW
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <TradeModal setShow={setShowTrade} show={showTrade} />
    </div>
  );
};
