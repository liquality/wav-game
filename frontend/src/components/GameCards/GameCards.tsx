import { getPublicKey } from "../../utils";
import "./game-cards.css";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";
import { Level3 } from "./Level3";
import { Level4 } from "./Level4";
import { Level5 } from "./Level5";
import { Level6 } from "./Level6";
import { useState, useEffect, useContext } from "react";
import UserService from "../../services/UserService";
import { DataContext } from "../../DataContext";
interface GameCardsProps {
  /**
    The current game 
   */
  currentGame?: any;

  selectedLevel: number;
  currentLevel: number;

  nftCount: any;
  userIsFullSetHolder: boolean;

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
  const {
    currentGame,
    currentLevel,
    selectedLevel,
    onTradeClick,
    onGetMoreClick,
    onLevelSelected,
    nftCount,
    userIsFullSetHolder,
  } = props;
  const [burnStatus, setBurnStatus] = useState({});

  const { levelSettings } = useContext(DataContext);

  async function onSetLevel(levelId?: number) {
    onLevelSelected(levelId || currentLevel || 1);
  }

  useEffect(() => {
    async function getBurnStatus() {
      const _burnStatus = await [1, 2, 3, 4, 5, 6].reduce(
        async (prev, level) => {
          const accum = await prev;
          const status = await UserService.getLevelBurnStatus(
            currentGame.game_symbol_id,
            level,
            getPublicKey()
          );
          accum[level] = status;
          return accum;
        },
        Promise.resolve({})
      );

      setBurnStatus(_burnStatus);
    }

    getBurnStatus();
  }, [currentGame]);

  return (
    <div className="mt-5 game-cards">
      <Level1
        selectedLevel={selectedLevel}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[1]}
        currentLevel={currentLevel}
        levelSettings={levelSettings}
      />
      <Level2
        selectedLevel={selectedLevel}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[2]}
        currentLevel={currentLevel}
        levelSettings={levelSettings}
      />
      <Level3
        selectedLevel={selectedLevel}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[3]}
        currentLevel={currentLevel}
        levelSettings={levelSettings}
      />
      <Level4
        selectedLevel={selectedLevel}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[4]}
        currentLevel={currentLevel}
        levelSettings={levelSettings}
        currentGame={currentGame}
      />
      <Level5
        selectedLevel={selectedLevel}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[5]}
        currentLevel={currentLevel}
        levelSettings={levelSettings}
        currentGame={currentGame}
      />
      <Level6
        selectedLevel={selectedLevel}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[6]}
        currentLevel={currentLevel}
        levelSettings={levelSettings}
        currentGame={currentGame}
        userIsFullSetHolder={userIsFullSetHolder}
      />
    </div>
  );
};
