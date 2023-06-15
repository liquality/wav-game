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
  const { currentGame, selectedLevel, onTradeClick, onGetMoreClick, onLevelSelected } = props;
  function onSetLevel(levelId?: number) {
    onLevelSelected(levelId);
  }

  return (
    <div className="mt-5 game-cards">
      <Level1
        selectedLevel={selectedLevel}
        currentGame={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
      />
      <Level2
        selectedLevel={selectedLevel}
        currentGame={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
      />
      <Level3
        selectedLevel={selectedLevel}
        currentGame={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
      />
      <Level4
        selectedLevel={selectedLevel}
        currentGame={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
      />
      <Level5
        selectedLevel={selectedLevel}
        currentGame={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
      />
      <Level6
        selectedLevel={selectedLevel}
        currentGame={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
      />
    </div>
  );
};
