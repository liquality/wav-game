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
  let actionDisbled = false;
  let actionLocked = false;

  actionDisbled = false;
  instructions = `You have ${level2Count === -1 ? 0 : level2Count} collectibles.`;
  if (level2Count === 0) {
    instructions = "You need 2 Artist collectibles to trade for this.";
    tradeActionText = "Level locked";
    actionLocked = true;
    actionDisbled = true;
  } else if (level2Count === 1) {
    instructions = `You have ${
      level2Count === -1 ? 0 : level2Count
    } NFTs. Get 1 more to trade for next level.`;
    tradeActionText = "Start Trading";
    actionDisbled = true;
  }
  if (level2Count >= 2 && burnStatus) {
    tradeActionText = "Trade More";
  } else {
    tradeActionText = "Start Trading";
  }

  const actions = [
    {
      onActionClick: (level) => onTradeClick(level),
      label: tradeActionText,
      mode: actionLocked ? "pinkStroke" : "default",
      disabled: actionDisbled,
      useIcon: actionDisbled,
    }
  ];

  if(level2Count >= 2 && !burnStatus) {
    actions.push({
      onActionClick: (level) => onGetMoreClick(level),
      label: 'Get More',
      mode: actionLocked ? "pinkStroke" : "default",
      disabled: actionDisbled,
      useIcon: actionDisbled,
    });
  }
  

  return (
    <LevelCard
      status={status}
      current={selectedLevel}
      setLevel={onSetLevel}
      actions={actions}
      level={{
        id: 2,
        title: "Get 1 top live song",
        edition: "",
        instructions,
        useEmtpyActionsStyle: false
      }}
    />
  );
};
