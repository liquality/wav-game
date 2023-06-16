import "./game-cards.css";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";
import { Level3 } from "./Level3";
import { Level4 } from "./Level4";
import { Level5 } from "./Level5";
import { Level6 } from "./Level6";

interface GameCardsProps {
  /**
    The current game 
   */
  currentGame?: any;

  selectedLevel: number;

  nftCount: any;

  /**
   * Click handler for each level
   */
  onTradeClick: (level: number) => void;
  onGetMoreClick: (level: number) => void;
  onLevelSelected: (level: number) => void;
}

/**
 * The collection or Card Levels with animation
 */
export const GameCards = (props: GameCardsProps) => {
  const { currentGame, selectedLevel, onTradeClick, onGetMoreClick, onLevelSelected, nftCount } = props;
  function onSetLevel(levelId?: number) {
    onLevelSelected(levelId);
  }

  return (
    <div className="mt-5 game-cards">
      <Level1
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
      />
      <Level2
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
      />
      <Level3
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
      />
      <Level4
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
      />
      <Level5
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
      />
      <Level6
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
      />
    </div>
  );
};
