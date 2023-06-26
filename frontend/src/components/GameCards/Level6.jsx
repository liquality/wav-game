import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";

export const Level6 = (props) => {
  const {
    selectedLevel,
    levelSettings,
    currentLevel,
    onSetLevel,
    onTradeClick,
    nftCount,
  } = props;
  const level6Count = nftCount["6"] || 0;
  let status = getLevelsStatuses(currentLevel || 1)[6];
  let instructions = "";
  let tradeActionText = "";
  let edition = "";
  let actionDisabled = false;
  let noActions = false;
  let title = "A chance to win a 1:1 trip + concert experience";

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
      }
    }
    return false;
  }

  if (!applyCountDown()) {
    if (level6Count < 2) {
      if (level6Count === 0) {
        instructions = "You need to start with 32 Game collectibles.";
        tradeActionText = "Level locked";
        actionDisabled = true;
      } else {
        instructions = "Get 1 more from past level to trade.";
        tradeActionText = "Level locked";
        actionDisabled = true;
      }
    } else {
      if (level6Count >= 2) {
        noActions = true;
        tradeActionText = "";
        instructions = "";
        status = "won";
      } else {
        actionDisabled = false;
        instructions = `You have ${level6Count === -1 ? 0 : level6Count} NFTs.`;
        switch (level6Count) {
          case -1:
            tradeActionText = "Trade Now";
            break;
          case 0:
            tradeActionText = "Trade Now";
            break;
          case 1:
            tradeActionText = "Trade More";
            break;
          default:
            tradeActionText = "Trade More";
            break;
        }
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
        id: 6,
        title,
        edition,
        instructions,
      }}
    />
  );
};
