import { LevelCard } from "../LevelCard/LevelCard";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";
import { WAV_PROXY_ABI, WAV_PROXY_ADDRESS } from "../../data/contract_data";

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
  let title = "Get 1 custom-made song";
  let earlyBirdLimit = 10;
  const [isEarlyBird, setIsEarlyBird] = useState(null);
  const [earlyBirds, setEarlyBirds] = useState([]);
  const [gameContract, setGameContract] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.JsonRpcProvider(
        process.env.REACT_APP_RPC_URL
      );
      // Create a new instance of the contract using the ABI and address

      const _gameContract = new ethers.Contract(
        WAV_PROXY_ADDRESS,
        WAV_PROXY_ABI,
        provider
      );
      setGameContract(_gameContract);

      const isEarlyBird = await checkEarlyBird();
      const earlyBirds = await fetchEarlyBirds();
      console.log("isEarlyBird >> ", isEarlyBird);
      console.log("earlyBirds >> ", earlyBirds);
      setIsEarlyBird(isEarlyBird);
      setEarlyBirds(earlyBirds);
    };

    fetchData();
  }, []);

  const checkEarlyBird = async () => {
    let isEarlyBird = await gameContract?.isEarlyBirdCollector(
      currentGame.game_symbol_id,
      6
    );
    return isEarlyBird;
  };

  const fetchEarlyBirds = async () => {
    return await gameContract?.fetchEarlyBirdCollectors(
      currentGame.game_symbol_id,
      6
    );
  };

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
    if (level5Count < 2) {
      if (level5Count === 0) {
        instructions = "You need 2 physical items to trade for this.";
        tradeActionText = "Level locked";
        actionLocked = true;
        actionDisabled = true;
      } else {
        instructions = `You have ${
          level5Count === -1 ? 0 : level5Count
        } collectibles. Get 1 more to trade for next level.`;
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
      }}
      earlyBirdCount={earlyBirds?.length}
      earlyBirdLimit={earlyBirdLimit}
    />
  );
};
