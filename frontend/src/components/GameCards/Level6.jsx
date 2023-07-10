import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";
import { useEarlyBirdInfo } from "../../hooks/useEarlyBirdCount";

export const Level6 = (props) => {
  const {
    selectedLevel,
    levelSettings,
    currentLevel,
    onSetLevel,
    nftCount
  } = props;
  const level6Count = nftCount["6"] || 0;
  let status = getLevelsStatuses(currentLevel || 1)[6];
  let instructions = "";
  let edition = "";
  let title = "";
  let useEmtpyActionsStyle = true;

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
        useEmtpyActionsStyle = false;
        return true;
      }
    }
    return false;
  }

  if (!applyCountDown()) {
    useEmtpyActionsStyle = true;
    
    if (level6Count >=1 ) { 
      status = "won";
      instructions = `You have ${
        level6Count === -1 ? 0 : level6Count
      } cards. Each card qualifies for an entry.`;
      
      title = 'You are in the raffle to WIN A TRIP + 1:1 CONCERT';

    } else {
      if (currentLevel === 5) {
        status = "next";
      }
      
      if (currentLevel === 6) {
        status = "active";
      } else {
        status = "locked";
      }

      title = "A chance to win a trip + 1:1 concert";
      instructions = "Each Level 6 card qualifies for a raffle entry.";
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
