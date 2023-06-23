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
    currentLevel
  } = props;
  const status = getLevelsStatuses(currentLevel || 1)[1];
  const level1Count = nftCount["level1"] || 0;
  const instructions = `You have ${level1Count === -1 ? 0 : level1Count} NFTs.`;
  let tradeActionText = "";

  if (level1Count >= 2) {
    if (burnStatus) {
      tradeActionText = "Trade More";
    } else {
      tradeActionText = "Start Trading";
    }
  }
  if (level1Count < 2 && !burnStatus) {
    tradeActionText = "Get Artist Collectibles";
  }
  let actions = [];
  if (level1Count >= 2 || (level1Count <= 2 && !burnStatus)) {
    actions.push({
      onActionClick: (level) => onTradeClick(level),
      label: tradeActionText,
      mode: "default",
    });
  }

  console.log(burnStatus, "burnstatus?");
  if (burnStatus) {
    actions.push({
      onActionClick: (level) => onGetMoreClick(level),
      label: "Get More",
      mode: "default",
      link: true,
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
      }}
    />
  );
};
