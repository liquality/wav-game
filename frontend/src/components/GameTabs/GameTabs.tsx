import "./game-tabs.css";
import { LevelTab } from "../LevelTab/LevelTab";
import { LevelStatus } from "../../types/LevelStatus";
import { getLevelsStatuses } from "../../utils";
interface GameTabsProps {
  /**
      The selected level 
     */
  selectedLevel: number;

  /**
   * the current level of the game
   */
  currentLevel: number;

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
  const { selectedLevel, onLevelSelected, currentLevel  } = props;
  const levelStatuses = getLevelsStatuses(currentLevel);

  return (
    <div className="grid gap-x-2 grid-cols-6">
      {Object.keys(levelStatuses).map((l) => {
        return (
          <LevelTab
            key={l}
            status={levelStatuses[l] as LevelStatus}
            level={parseInt(l)}
            selectedLevel={selectedLevel}
            onLevelSelected={onLevelSelected}
          />
        );
      })}
    </div>
  );
};
