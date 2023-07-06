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
  let actionDisabled = false;
  let actionLocked = false;
  let noActions = false;

  actionDisabled = false;
  instructions = `You have ${level3Count === -1 ? 0 : level3Count} cards.`;
  if (level3Count < 2) {
    if (level3Count === 0) {
      instructions = "You have 0 cards. Trade 2 cards from the previous level.";
      noActions = true;
    } else if (level3Count === 1) {
      instructions = `You have 1 card. Get 1 more from the previous level`;
      actionLocked = true;
      tradeActionText = "Level Locked";
      actionDisabled = true;
    }
  } else {
    if (burnStatus) {
      tradeActionText = "Trade More";
    } else {
      tradeActionText = "Start Trading";
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
        id: 3,
        title: "1 unreleased song + listening room",
        edition: "",
        instructions,
        useEmtpyActionsStyle: true,
      }}
    />
  );
};
