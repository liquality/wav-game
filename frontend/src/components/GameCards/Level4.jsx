import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";

export const Level4 = (props) => {
  const {
    selectedLevel,
    levelSettings,
    currentLevel,
    onSetLevel,
    onTradeClick,
    nftCount,
    burnStatus,
  } = props;
  const level4Count = nftCount["4"] || 0;
  let status = getLevelsStatuses(currentLevel || 1)[4];
  let instructions = "";
  let tradeActionText = "";
  let actionDisabled = false;
  let noActions = false;
  let edition = ""; //100/100 CLAIMED
  let title = "Get 1 limited physical item";
  actionDisabled = false;
  instructions = `You have ${level4Count === -1 ? 0 : level4Count} NFTs.`;
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
    if (level4Count < 2) {
      if (level4Count === 0) {
        instructions = "You need 2 Artist collectibles to trade for this.";
        tradeActionText = "Level locked";
        actionDisabled = true;
      } else {
        instructions = `You have ${
          level4Count === -1 ? 0 : level4Count
        } NFTs. Get 1 more to trade for next level.`;
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
        id: 4,
        title,
        edition,
        instructions,
      }}
    />
  );
};
