import { useState, PropsWithChildren} from "react";
import "../../App.css";
import "./dashboard.css";
import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar";

const levels = [
  {
    id: 1,
    label: 'LV 1',
    status: 'completed',
    title: 'LEVEL 1',
    content: 'Get 1 Unreleased Song',
    count: 'You have 2.'
  },
  {
    id: 2,
    label: 'LV 2',
    status: 'completed',
    title: 'LEVEL 2',
    content: 'Get 1 Unreleased Song',
    count: 'You have 2.'
  },
  {
    id: 3,
    label: 'LV 3',
    status: 'active',
    title: 'LEVEL 3',
    content: 'Get 1 Unreleased Song',
    count: 'You have 2.'
  },
  {
    id: 4,
    label: 'LV 4',
    status: 'locked',
    title: 'LEVEL 4',
    content: 'Get 1 Unreleased Song',
    count: 'You have 2.'
  },
  {
    id: 5,
    label: 'LV 5',
    status: 'locked',
    title: 'LEVEL 5',
    content: 'Get 1 Unreleased Song',
    count: 'You have 2.'
  },
  {
    id: 6,
    label: 'LV 6',
    status: 'locked',
    title: 'LEVEL 6',
    content: 'Get 1 Unreleased Song',
    count: 'You have 2.'
  }
];

const levelStyles = {
  completed: {
    border: 'border-completedStroke',
    text: 'text-completedStroke',
    background: 'bg-completed'
  },
  active: {
    border: 'border-activePinkStroke',
    text: 'text-activePinkStroke',
    background: 'bg-activePink'
  },
  locked: {
    border: 'border-lockedStroke',
    text: 'text-lockedStroke',
    background: 'bg-locked'
  }
};

export const Dashboard = (props: PropsWithChildren) => {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-dark">
      <div>
      <NavBar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="grid md:grid-cols-sidebar">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center my-5">
          <ul className="level-tabs">
            {levels.map((level) => {
              const styles = levelStyles[level.status];
              return <li key={level.id} >
                <div className={`${styles.text}`}>
                  {level.label}
                </div>
                <div onClick={() => setSelectedLevel(level.id)}
                  className={`level-bar dark:border dark:${styles.border} dark:${styles.background}`}>
                </div>
              </li>
            })}
          </ul>
        </div>
        <div className="flex flex-row mt-5">
          {levels.map((level) => {
            const styles = levelStyles[level.status];
            return <div
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`text-white px-5 py-4 flex flex-col justify-between level-card ${selectedLevel === level.id ? 'active' : 'inactive'} dark:border dark:${styles.border} dark:${styles.background}`}>
              <div className="flex flex-col justify-between">
                <div className="level-card-level">
                  {level.title}
                </div>
                <div className="level-card-title">
                  {level.content}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="level-card-count">
                  {level.count}
                </div>
                <div>
                  <button className="bg-white p-3 text-activePink rounded-full">TRADE NOW</button>
                </div>
              </div>
            </div>
          })}
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};


