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

  actionDisbled = false;
  instructions = `You have ${level3Count === -1 ? 0 : level3Count} NFTs.`;
  if (level3Count < 2) {
    if (level3Count === 0) {
      instructions = "You need 2 Artist collectibles to trade for this.";
      tradeActionText = "Level locked";
      actionDisbled = true;
    } else {
      instructions = "Get 1 more to trade for next level.";
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
      mode: "default",
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
        title: "Get 1 unreleased song",
        edition: "",
        instructions,
      }}
    />
  );
};
