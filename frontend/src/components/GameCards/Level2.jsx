import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level2 = (props) => {
  const {
    selectedLevel,
    currentLevel,
    onSetLevel,
    onTradeClick,
    onGetMoreClick,
    nftCount,
    burnStatus,
  } = props;
  const level2Count = nftCount["2"] || 0;
  const status = getLevelsStatuses(currentLevel || 1)[2];
  let instructions = "";
  let tradeActionText = "";
  let actionDisabled = false;
  let actionLocked = false;
  let noActions = false;

  actionDisabled = false;
  instructions = `You have ${level2Count === -1 ? 0 : level2Count} cards.`;
  if (level2Count === 0) {
    instructions = "Trade 2 cards from the previous level.";
    noActions = true;
  } else if (level2Count === 1) {
    instructions = `You have ${
      level2Count === -1 ? 0 : level2Count
    } cards. Get 1 more from the previous level.`;
    tradeActionText = "Start Trading";
    actionDisabled = true;
  }
  if (level2Count >= 2 && burnStatus) {
    tradeActionText = "Trade More";
  } else {
    tradeActionText = "Trade Now";
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
        id: 2,
        title: "1 rare live song",
        edition: "",
        instructions,
        useEmtpyActionsStyle: true,
      }}
    />
  );
};
