import "./level-card.css";
import classNames from "classnames";
import { Button } from "../Button/Button";
import { ReactComponent as LockIcon } from "../../images/lock_icon.svg";
import { ButtonMode } from "../../types/ButtonMode";
import { LevelStatus } from "../../types/LevelStatus";

export interface LevelActionProps {
  label: string;
  /**
   * Click handler for the card action
   */
  onActionClick?: (level: number) => void;
  mode: ButtonMode;
  useIcon?: boolean;
  link?: boolean;
  disabled?: boolean;
}

interface Level {
  /*
    The level id
*/
  id: number;
  /**
   * The level title
   */
  title: string;

  /**
   * The level Edition or Quantity
   */
  edition?: string;

  /**
   * The level instructions
   */
  instructions: string;

  useEmtpyActionsStyle?: boolean;

}

interface CardProps {
  /**
   * The level of the card
   */
  level: Level;

  /**
   * The Level status
   */
  status: LevelStatus;

  /**
   * The action text
   */
  actions: LevelActionProps[];

  /**
   * Flag to know if it's the current card
   */
  current?: number;

  /**
   * Set the current level temporary
   */
  setLevel?: (level?: number) => void;

  earlyBirdCount: number;

  earlyBirdLimit: number;
}

/**
 * Level Card Component
 */
export const LevelCard = ({
  status = "locked",
  actions = [],
  ...props
}: CardProps) => {
  const {
    setLevel,
    current,
    level: { edition, title, instructions, id, useEmtpyActionsStyle }
  } = props;
  const active = current === id;
  const handleActionClick = (action: LevelActionProps) => {
    if (action.onActionClick) {
      action.onActionClick(id);
    }
  };
  return (
    <div
      onMouseOver={() => (setLevel ? setLevel(id) : () => { })}
      onMouseLeave={() => (setLevel ? setLevel(null) : () => { })}
      className={classNames({
        "level-card flex flex-col justify-between": true,
        [`level-card--display--${current}--${id}`]: true,
        [`level-card--${status}`]: true,
        [`level-card--6`]: id === 6,
        active,
      })}
    >
      <div className="flex flex-col justify-between">
        <div className="level-card-level">LEVEL {id}</div>
        <div className={classNames({
          "level-card-title": true,
          'level-card-title-small': id === 6
        })}>{title}</div>
        <div className="level-card-edition">{edition}</div>
      </div>
      <div className="flex flex-col justify-between">
        <div
          className={classNames({
            "level-card-instructions-empty-actions": !useEmtpyActionsStyle && (!actions || actions.length <= 0),
            "level-card-instructions": !useEmtpyActionsStyle,
            active,
          })}
        >
          {instructions}
        </div>
        <div className="flex justify-between gap-2">
          {actions.map((action) => {
            return (
              <Button
                disabled={!active || action.disabled}
                key={action.label}
                mode={action.mode}
                link={action.link}
                onClick={() => handleActionClick(action)}
              >
                <>
                  {action.useIcon ? (
                    <LockIcon style={{ marginRight: "0.5rem" }} />
                  ) : null}
                  {action.label}
                </>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
