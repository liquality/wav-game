import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";
import { useEarlyBirdInfo } from "../../hooks/useEarlyBirdCount";

export const Level4 = (props) => {
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
  const level4Count = nftCount["4"] || 0;
  let status = getLevelsStatuses(currentLevel || 1)[4];
  let instructions = "";
  let tradeActionText = "";
  let actionDisabled = false;
  let noActions = false;
  let edition = ""; //100/100 CLAIMED
  let title = "1 limited physical item";
  actionDisabled = false;
  let actionLocked = false;
  instructions = `You have ${
    level4Count === -1 ? 0 : level4Count
  } cards.`;

  let earlyBirdLimit = levelSettings?.claim_amount || 0;
  instructions = `You have ${
    level4Count === -1 ? 0 : level4Count
  } cards.`;
  let useEmtpyActionsStyle = false;

  const { earlyBirdCount, isEarlyBird } = useEarlyBirdInfo(
    currentGame.game_symbol_id,
    4
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
          tradeActionText = "Start Trading";
        }
      }
    }
    return false;
  }

  if (!applyCountDown()) {
    useEmtpyActionsStyle = true;

    if (level4Count < 2) {
      if (level4Count === 0) {
        // UC 1 - user has 0 NFT in that level, then show copytext 'You need 2 Artist cards to trade for this.' - no button. card color depending if it is [completed], or [next] level.
        instructions =
          "You have 0 cards. Trade 2 cards from the previous level to get one of these.";
        noActions = true;
      } else {
        instructions = `You have ${
          level4Count === -1 ? 0 : level4Count
        } cards. Get 1 more from the previous level to get one of these.`;
        tradeActionText = "Start Trading";
        actionDisabled = true;
      }
    } else {
      // UC 4 - user has >/= 2 NFTs and burnt before show button 'Trade more'. card color depending if it is [completed], [active], or [next] level.
      if (burnStatus) {
        tradeActionText = "Trade More";
      } else {
        // UC 3 - user has >/= 2 NFTs and never burnt before show button 'Trade now'. card color depending if it is [completed], [active], or [next] level.
        tradeActionText = "Trade now";
      }
    }

    console.log("Early bird limit of level 4 => ", earlyBirdLimit);
    if (earlyBirdLimit > 0) {
      // #DWAV-190
      /**
      - add counter:: [n]/20 claimed
      - when max number is reached, switch title to:: All physical items claimed
      - when max number is reached, switch counter to:: Keep playing for other rewards.
      */
      if (earlyBirdCount < earlyBirdLimit) {
        edition = `${earlyBirdCount || 0}/${earlyBirdLimit} CLAIMED`;
      } else {
        title = "All physical items claimed";
        edition = "Keep playing for other rewards";
      }
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
        id: 4,
        title,
        edition,
        instructions,
        useEmtpyActionsStyle,
      }}
    />
  );
};
