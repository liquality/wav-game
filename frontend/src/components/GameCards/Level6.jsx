import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";
import { useEarlyBirdInfo } from "../../hooks/useEarlyBirdCount";

export const Level6 = (props) => {
  const {
    selectedLevel,
    levelSettings,
    currentLevel,
    onSetLevel,
    nftCount,
    currentGame,
    userIsFullSetHolder,
  } = props;
  const level6Count = nftCount["6"] || 0;
  let status = getLevelsStatuses(currentLevel || 1)[6];
  let instructions = "";
  let edition = "";
  let title = "";
  let useEmtpyActionsStyle = true;
  const { canBecomeEarlyBirdCollector, earlyBirdCount, isEarlyBird } =
    useEarlyBirdInfo(currentGame.game_symbol_id, 6);

  function applyCountDown() {
    if (levelSettings && levelSettings.countdown_ends > 0) {
      const unlockDate = new Date(levelSettings.countdown_start_at);
      unlockDate.setMilliseconds(
        unlockDate.getMilliseconds() + levelSettings.countdown_ends
      );
      const today = new Date();
      if (unlockDate > today) {
        // show the timer
        status = "locked";
        const difference = getDifferenceBetweenDates(today, unlockDate);
        title = "Countdown to unlock";
        instructions = `${difference.days}DAYS:${difference.hours}HRS:${difference.minutes}MIN`;
        useEmtpyActionsStyle = true;
        return true;
      }
    }
    return false;
  }

  if (!applyCountDown()) {
    useEmtpyActionsStyle = true;
    // UC 2: User is the winner

    if (level6Count === 0) {
      instructions = "You need to start with 32 Game cards.";
    } else if (level6Count === 1) {
      instructions = `You have ${
        level6Count === -1 ? 0 : level6Count
      } cards. Get 1 more to trade for next level.`;
    } else {
      instructions = `You have ${
        level6Count === -1 ? 0 : level6Count
      } cards.`;
    }

    if (currentLevel === 5) {
      status = "next";
    }
    if (currentLevel === 6) {
      status = "active";
    } else {
      status = "locked";
    }

    console.log(
      earlyBirdCount,
      "earlybirdcount BÄ",
      canBecomeEarlyBirdCollector,
      instructions
    );
    if (isEarlyBird) {
      instructions = "";
      status = "won";
      title = "CONGRATS, YOU WON A 1:1 TRIP + CONCERT EXPERIENCE";
    } else if (canBecomeEarlyBirdCollector) {
      // UC 1: Main Prize NOT yet claimed
      // -inactive => current level !=6
      // -inactive => current level === 5
      title = "A change to win a 1:1 + concert experience.";
    } else if (earlyBirdCount) {
      // UC 3: When main price was already claimed
      // -active => current level is 6
      // -inactive => current level !=6
      // -inactive => current level === 5
      instructions = `You have ${
        level6Count === -1 ? 0 : level6Count
      } cards. Hold 1 or more cards at each level to become a full set holder`;
      title = "The main prize was already claimed. Go for full set holder!";
    }
  }

  return (
    <LevelCard
      status={status}
      current={selectedLevel}
      setLevel={onSetLevel}
      actions={[]}
      level={{
        id: 6,
        title,
        edition,
        instructions,
        useEmtpyActionsStyle,
      }}
    />
  );
};
