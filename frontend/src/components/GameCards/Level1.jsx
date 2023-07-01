import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level1 = (props) => {
  const {
    selectedLevel,
    onSetLevel,
    onTradeClick,
    onGetMoreClick,
    nftCount,
    burnStatus,
    currentLevel,
  } = props;
  const status = getLevelsStatuses(currentLevel || 1)[1];
  const level1Count = nftCount["1"] || 0;
  const instructions = `You have ${
    level1Count === -1 ? 0 : level1Count
  } collectibles.`;
  let tradeActionText = "";
  let actionLocked = false;
  let lessThan2NftsAndBurnt = level1Count < 2 && burnStatus;
  let lessThan2NftsAndNeverBurnt = level1Count < 2 && !burnStatus;
  let twoOrMoreNftsAndNeverBurnt = level1Count >= 2 && !burnStatus;
  let twoOrMoreNftsAndBurnt = level1Count >= 2 && burnStatus;

  console.log(tradeActionText, "tradeaction text");
  if (level1Count >= 2) {
    if (burnStatus) {
      tradeActionText = "Trade More";
    } else {
      tradeActionText = "Start Trading";
    }
  }

  if (
    lessThan2NftsAndBurnt ||
    lessThan2NftsAndNeverBurnt ||
    level1Count === 0
  ) {
    tradeActionText = "Get Collectibles";
  }

  let actions = [];
  if (level1Count >= 2) {
    actions.push({
      onActionClick: (level) => onTradeClick(level),
      label: tradeActionText,
      mode: actionLocked ? "pinkStroke" : "default",
    });
    if (!burnStatus || burnStatus) {
      actions.push({
        onActionClick: (level) => onGetMoreClick(level),
        label: "Get more",
        mode: "default",
        link: true,
      });
    }
  } else if (level1Count === 0) {
    actions.push({
      onActionClick: (level) => onGetMoreClick(level),
      label: tradeActionText,
      mode: "default",
    });
  } else if (lessThan2NftsAndBurnt || lessThan2NftsAndNeverBurnt) {
    actions.push({
      onActionClick: (level) => onGetMoreClick(level),
      label: tradeActionText,
      mode: "default",
    });
  }

  return (
    <LevelCard
      status={status}
      current={selectedLevel}
      setLevel={onSetLevel}
      actions={actions}
      level={{
        id: 1,
        title: "Game Collectible",
        edition: "",
        instructions,
        useEmtpyActionsStyle: false
      }}
    />
  );
};
