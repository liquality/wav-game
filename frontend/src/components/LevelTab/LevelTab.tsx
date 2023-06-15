import "./level-tab.css";
import { LevelStatus } from "../../types/LevelStatus";
import classNames from "classnames";

interface LevelTabProps {
  /**
   * Level number
   */
  level: number;

  /**
   * Level status
   */
  status: LevelStatus;
}

/**
 * Level tab control
 */
export const LevelTab = (props: LevelTabProps) => {
  const { level, selectedLevel, status, onLevelSelected } = props;

  return (
    <div className="flex flex-col justify-between">
      <div
        className={classNames({
          "level-tab-title": true,
          [`level-tab-title--${status}`]: true,
        })}
      >
        Level {level}
      </div>
      <div
        className={classNames({
          "level-tab-control": true,
          [`level-tab-control--${status}`]: true,
        })}
      ></div>
    </div>
  );
};
