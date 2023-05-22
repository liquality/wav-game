import { useState } from "react";
import "./dashboard.css";
import { NavBar } from "./NavBar";

export const Dashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState(3);
  return (
    <div className="stretched device-xl no-transition">
      <NavBar />
      <div className="container px-4">
        <div className="flex flex-row">
          <div className="flex flex-row text-white side-bar dark:border dark:border-completedStroke">
            Side Bar
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-center my-5">
              <ul className="level-tabs">
                <li>
                  <div className="dark:text-completedStroke">LV 1</div>
                  <div onClick={() => setSelectedLevel(1)} className="level-bar dark:border dark:border-completedStroke dark:bg-completed"></div>
                  <div className="text-white text-center">COL:12</div>
                </li>
                <li>
                  <div className="dark:text-completedStroke">LV 2</div>
                  <div onClick={() => setSelectedLevel(2)} className="level-bar dark:border dark:border-completedStroke dark:bg-completed"></div>
                  <div className="text-white text-center">COL:12</div>
                </li>
                <li>
                  <div className="dark:text-activePinkStroke">LV 3</div>
                  <div onClick={() => setSelectedLevel(3)} className="level-bar dark:border dark:border-activePinkStroke dark:bg-activePink"></div>
                  <div className="text-white text-center">COL:12</div>
                </li>
                <li>
                  <div className="dark:text-lockedStroke">LV 4</div>
                  <div onClick={() => setSelectedLevel(4)} className="level-bar dark:border dark:border-lockedStroke dark:bg-locked"></div>
                  <div className="text-white text-center">COL:12</div>
                </li>
                <li>
                  <div className="dark:text-lockedStroke">LV 5</div>
                  <div onClick={() => setSelectedLevel(5)} className="level-bar dark:border dark:border-lockedStroke dark:bg-locked"></div>
                  <div className="text-white text-center">COL:12</div>
                </li>
                <li>
                  <div className="dark:text-lockedStroke">LV 6</div>
                  <div onClick={() => setSelectedLevel(6)} className="level-bar dark:border dark:border-lockedStroke dark:bg-locked"></div>
                  <div className="text-white text-center">COL:12</div>
                </li>
              </ul>
            </div>
            <div className="flex flex-row mt-5">
              <div
                onClick={() => setSelectedLevel(1)}
                className={`text-white px-5 py-4 flex flex-col justify-between level-card ${selectedLevel === 1 ? 'active' : 'inactive'} dark:border dark:border-completedStroke dark:bg-completed`}>
                <div className="flex flex-col justify-between">
                  <div className="level-card-level">
                    LEVEL 1
                  </div>
                  <div className="level-card-title">
                    Get 1 Unreleased Song
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="level-card-count">
                    You have 2.
                  </div>
                  <div>
                    <button className="bg-white p-3 text-activePink rounded-full">TRADE NOW</button>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedLevel(2)}
                className={`text-white px-5 py-4 flex flex-col justify-between level-card ${selectedLevel === 2 ? 'active' : 'inactive'} dark:border dark:border-completedStroke dark:bg-completed`}>
                <div className="flex flex-col justify-between">
                  <div className="level-card-level">
                    LEVEL 2
                  </div>
                  <div className="level-card-title">
                    Get 1 Unreleased Song
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="level-card-count">
                    You have 2.
                  </div>
                  <div>
                    <button className="bg-white p-3 text-activePink rounded-full">TRADE NOW</button>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedLevel(3)}
                className={`text-white px-5 py-4 flex flex-col justify-between level-card ${selectedLevel === 3 ? 'active' : 'inactive'} dark:border dark:border-activePinkStroke dark:bg-activePink`}>
                <div className="flex flex-col justify-between">
                  <div className="level-card-level">
                    LEVEL 3
                  </div>
                  <div className="level-card-title">
                    Get 1 Unreleased Song
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="level-card-count">
                    You have 2.
                  </div>
                  <div>
                    <button className="bg-white p-3 text-activePink rounded-full">TRADE NOW</button>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedLevel(4)}
                style={{
                  left: '-80px'
                }}
                className={`text-white px-5 py-4 flex flex-col justify-between level-card ${selectedLevel === 4 ? 'active' : 'inactive'} dark:border dark:border-lockedStroke dark:bg-locked`}>
                <div className="flex flex-col justify-between">
                  <div className="level-card-level">
                    LEVEL 4
                  </div>
                  <div className="level-card-title">
                    Get 1 Unreleased Song
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="level-card-count">
                    You have 2.
                  </div>
                  <div>
                    <button className="bg-white p-3 text-activePink rounded-full">TRADE NOW</button>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedLevel(5)}
                style={{
                  //left:'-80px'
                }}
                className={`text-white px-5 py-4 flex flex-col justify-between level-card ${selectedLevel === 5 ? 'active' : 'inactive'} dark:border dark:border-lockedStroke dark:bg-locked`}>
                <div className="flex flex-col justify-between">
                  <div className="level-card-level">
                    LEVEL 5
                  </div>
                  <div className="level-card-title">
                    Get 1 Unreleased Song
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="level-card-count">
                    You have 2.
                  </div>
                  <div>
                    <button className="bg-white p-3 text-activePink rounded-full">TRADE NOW</button>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setSelectedLevel(6)}
                style={{
                  //left:'-80px'
                }}
                className={`text-white px-5 py-4 flex flex-col justify-between level-card ${selectedLevel === 6 ? 'active' : 'inactive'} dark:border dark:border-lockedStroke dark:bg-locked`}>
                <div className="flex flex-col justify-between">
                  <div className="level-card-level">
                    LEVEL 6
                  </div>
                  <div className="level-card-title">
                    Get 1 Unreleased Song
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="level-card-count">
                    You have 2.
                  </div>
                  <div>
                    <button className="bg-white p-3 text-activePink rounded-full">TRADE NOW</button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>

    </div>
  );
};


