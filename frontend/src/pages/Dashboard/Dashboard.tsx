import { useState } from "react";
import "./dashboard.css";
import { NavBar } from "./NavBar";

export const Dashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const levels = [
    {
      id: 1,
      title: 'GET 1 UNRELEASED SONG',
      description: 'You need 2 top life songs to trade for this.',
      status: 'completed'
    },
    {
      id: 2,
      top: '21/100 CLAIMED',
      title: 'GET 1 UNRELEASED SONG',
      description: 'You need 2 top life songs to trade for this.',
      status: 'completed'
    },
    {
      id: 3,
      title: 'GET 1 UNRELEASED SONG',
      description: 'You need 2 top life songs to trade for this.',
      status: 'active'
    },
    {
      id: 4,
      title: 'GET 1 UNRELEASED SONG',
      description: 'You need 2 top life songs to trade for this.',
      status: 'locked'
    },
    {
      id: 5,
      title: 'GET 1 UNRELEASED SONG',
      description: 'You need 2 top life songs to trade for this.',
      status: 'locked'
    },
  ];

  const getLevelClasses = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          background: 'completed',
          border: 'completedStroke'
        };
      case 'active':
        return {
          background: 'activePink',
          border: 'activePinkStroke'
        };
      case 'locked':
        return {
          background: 'lockedGray',
          border: 'lockedGrayStroke'
        };
      default:
        return {
          background: 'activePink',
          border: 'activePinkStroke'
        };
    }
  };

  return (
    <div className="bg-dark stretched device-xl no-transition">
      <NavBar />
      <div className="container mx-auto">
        <div  style={{'width': '50%'}} className="text-white grid grid-rows-1 grid-flow-col gap-4">
          {levels.map((level) => {
            const levelClasses = getLevelClasses(level.status);
            const activeClass = selectedLevel === level.id ? 'active' : 'inactive';
            return (<div key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`flex level-card ${activeClass} dark:border dark:border-${levelClasses.border} dark:bg-${levelClasses.background}`}>
              <div>
              {level.title}
              </div>
            </div>)
          })}

          {/* <div className="rounded-lg text-white grid grid-rows-1 grid-flow-col grid-cols-5 gap-4">
            <div className="rounded-lg dark:border dark:border-completedStroke dark:bg-completed">01</div>
            <div className="dark:border dark:border-CompletedStroke dark:bg-activePink">01</div>
            <div className="dark:border dark:border-activePinkStroke dark:bg-activePink">01</div>
            <div className="dark:border dark:border-activePinkStroke dark:bg-activePink">01</div>
            <div className="dark:border dark:border-activePinkStroke dark:bg-activePink">01</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};


