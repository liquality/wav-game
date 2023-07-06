import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";
import { useEarlyBirdInfo } from "../../hooks/useEarlyBirdCount";

export const Level5 = (props) => {
  const {
    selectedLevel,
    levelSettings,
    currentLevel,
    onSetLevel,
    onTradeClick,
    nftCount,
    burnStatus,
    currentGame,
  } = props;
  const level5Count = nftCount["5"] || 0;
  let status = getLevelsStatuses(currentLevel || 1)[5];
  let instructions = "";
  let tradeActionText = "";
  let edition = "";
  let actionDisabled = false;
  let noActions = false;
  let actionLocked = false;
  let title = "1 custom-made song";
  let earlyBirdLimit = levelSettings?.claim_amount || 0;
  let useEmtpyActionsStyle = false;

  const { earlyBirdCount, isEarlyBird } = useEarlyBirdInfo(
    currentGame.game_symbol_id,
    5
  );

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
        actionLocked = true;
        title = "Countdown to unlock";
        instructions = `${difference.days}DAYS:${difference.hours}HRS:${difference.minutes}MIN`;
        return true;
      } else {
        if (burnStatus) {
          tradeActionText = "Trade More";
        } else {
          tradeActionText = "Trade More";
          instructions = `You have ${level5Count} cards.`;
        }
      }
    }
    return false;
  }

  if (!applyCountDown()) {
    useEmtpyActionsStyle = true;
    if (level5Count < 2) {
      if (level5Count === 0) {
        instructions =
          "You have 0 cards. Trade 2 cards from the previous level.";
        noActions = true;
      } else {
        instructions = `You have ${
          level5Count === -1 ? 0 : level5Count
        } cards. Get 1 more from the previous level.`;
        tradeActionText = "Start Trading";
        actionDisabled = true;
      }
    } else if (level5Count >= 2) {
      instructions = `You have ${
        level5Count === -1 ? 0 : level5Count
      } cards. Get 1 more from the previous level.`;
      tradeActionText = "Trade More";
      actionDisabled = false;
    }

    // #DWAV-190
    /**
      - add counter:: [n]/20 claimed
      - when max number is reached, switch title to:: All custom made songs claimed
      - when max number is reached, switch counter to:: Keep playing for other rewards.
      */
    if (earlyBirdCount < earlyBirdLimit) {
      edition = `${earlyBirdCount || 0}/${earlyBirdLimit} CLAIMED`;
    } else {
      title = "All custom made songs claimed";
      edition = "Keep playing for other rewards";
    }
  }

  const actions = noActions
    ? []
    : [
        {
          onActionClick: (level) => onTradeClick(level),
          label: tradeActionText,
          mode: actionLocked ? "pinkStroke" : "default",
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
        useEmtpyActionsStyle,
      }}
    />
  );
};
