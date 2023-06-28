import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";

export const Level5 = (props) => {
  const {
    selectedLevel,
    levelSettings,
    currentLevel,
    onSetLevel,
    onTradeClick,
    nftCount,
    burnStatus,
  } = props;
  const level5Count = nftCount["5"] || 0;
  let status = getLevelsStatuses(currentLevel || 1)[5];
  let instructions = "";
  let tradeActionText = "";
  let edition = "";
  let actionDisabled = false;
  let noActions = false;
  let title = "Get 1 custom-made song";

  // count down
  function applyCountDown() {
    if (levelSettings && levelSettings.countdown_ends > 0) {
      const unlockDate = new Date(levelSettings.countdown_start_at);
      unlockDate.setMilliseconds(
        unlockDate.getMilliseconds() + levelSettings.countdown_ends
      );
      const today = new Date();
      if (unlockDate > today) {
        // show the timer
        noActions = true;
        status = "locked";
        const difference = getDifferenceBetweenDates(today, unlockDate);
        actionDisabled = true;
        tradeActionText = "Level locked";
        title = "Countdown to unlock";
        instructions = `${difference.days}DAYS:${difference.hours}HRS:${difference.minutes}MIN`;
        return true;
      } else {
        if (burnStatus) {
          tradeActionText = "Trade More";
        } else {
          tradeActionText = "Start Trading";
        }
      }
    }
    return false;
  }

  if (!applyCountDown()) {
    if (level5Count < 2) {
      if (level5Count === 0) {
        instructions = "You need 2 physical items to trade for this.";
        tradeActionText = "Level locked";
        actionDisabled = true;
      } else {
        instructions = "You have 1 collectible. Get 1 more from past level to trade.";
        tradeActionText = "Start Trading";
        actionDisabled = true;
      }
    }
  }

  const actions = noActions
    ? []
    : [
        {
          onActionClick: (level) => onTradeClick(level),
          label: tradeActionText,
          mode: "default",
          disabled: actionDisabled,
          useIcon: actionDisabled,
        },
      ];

  return (
    <LevelCard
      status={status}
      current={selectedLevel}
      setLevel={onSetLevel}
      actions={actions}
      level={{
        id: 5,
        title,
        edition,
        instructions,
      }}
    />
  );
};
