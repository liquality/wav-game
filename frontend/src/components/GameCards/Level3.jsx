import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level3 = (props) => {
  const {
    selectedLevel,
    currentLevel,
    onSetLevel,
    onTradeClick,
    nftCount,
    burnStatus,
  } = props;
  const level3Count = nftCount["3"] || 0;
  const status = getLevelsStatuses(currentLevel || 1)[3];
  let instructions = "";
  let tradeActionText = "";
  let actionDisbled = false;
  let actionLocked = false;

  actionDisbled = false;
  instructions = `You have ${level3Count === -1 ? 0 : level3Count} cards.`;
  if (level3Count < 2) {
    if (level3Count === 0) {
      instructions = "You need 2 Artist cards to trade for this.";
      tradeActionText = "Level locked";
      actionLocked = true;
      actionDisbled = true;
    } else {
      instructions = `You have ${
        level3Count === -1 ? 0 : level3Count
      } cards. Trade 2 cards from the previous level to get one of these.`;

      tradeActionText = "Start Trading";
      actionDisbled = true;
    }
  } else {
    if (burnStatus) {
      tradeActionText = "Trade More";
    } else {
      tradeActionText = "Start Trading";
    }
  }

  const actions = [
    {
      onActionClick: (level) => onTradeClick(level),
      label: tradeActionText,
      mode: actionLocked ? "pinkStroke" : "default",
      disabled: actionDisbled,
      useIcon: actionDisbled,
    },
  ];

  return (
    <LevelCard
      status={status}
      current={selectedLevel}
      setLevel={onSetLevel}
      actions={actions}
      level={{
        id: 3,
        title: "1 unreleased song + listening room",
        edition: "",
        instructions,
        useEmtpyActionsStyle: false
      }}
    />
  );
};
