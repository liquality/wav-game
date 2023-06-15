import "./game-tabs.css";
import { LevelTab } from "../LevelTab/LevelTab";
import { LevelStatus } from "../../types/LevelStatus";
interface GameTabsProps {
  /**
      The current level 
     */
  selectedLevel: number;

  currentGame: any;

  /**
   * Click handler for each level
   */
  onLevelSelected: (level: number) => void;
}

/**
 * The collection or Tab Levels with animation
 */
export const GameTabs = (props: GameTabsProps) => {
  const { selectedLevel, currentGame, onLevelSelected } = props;
  const currentLevel = currentGame?.level || 1;
  const levelStatus = {
    1: currentLevel > 1 ? "completed" : "active",
    2:
      currentLevel > 2
        ? "completed"
        : currentLevel === 2
        ? "active"
        : currentLevel === 1
        ? "upcomming"
        : "locked",
    3:
      currentLevel > 3
        ? "completed"
        : currentLevel === 3
        ? "active"
        : currentLevel === 2
        ? "upcomming"
        : "locked",
    4:
      currentLevel > 4
        ? "completed"
        : currentLevel === 4
        ? "active"
        : currentLevel === 3
        ? "upcomming"
        : "locked",
    5:
      currentLevel > 5
        ? "completed"
        : currentLevel === 5
        ? "active"
        : currentLevel === 4
        ? "upcomming"
        : "locked",
    6:
      currentLevel === 6
        ? "active"
        : currentLevel === 5
        ? "upcomming"
        : "locked",
  };

  return (
    <div className="grid gap-x-2 grid-cols-6">
      {Object.keys(levelStatus).map((l) => {
        return (
          <LevelTab
            key={l}
            status={levelStatus[l] as LevelStatus}
            level={parseInt(l)}
            selectedLevel={selectedLevel}
            onLevelSelected={onLevelSelected}
          />
        );
      })}
    </div>
  );
};
