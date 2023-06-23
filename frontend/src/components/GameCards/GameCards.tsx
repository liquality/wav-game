
import { getPublicKey } from "../../utils";
import ContractService from "../../services/contractService";
import "./game-cards.css";
import { Level1 } from "./Level1";
import { Level2 } from "./Level2";
import { Level3 } from "./Level3";
import { Level4 } from "./Level4";
import { Level5 } from "./Level5";
import { Level6 } from "./Level6";
import { useState, useEffect } from "react";

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
  const [burnStatus, setBurnStatus] = useState({});

  async function onSetLevel(levelId?: number) {
    console.log("onSetLevel level >>>>~>> ", levelId)
    onLevelSelected(levelId || currentGame?.level || 1);
  }
  
  useEffect(() => {
    async function getBurnStatus() {
      const _burnStatus = await [1,2,3,4,5,6].reduce(async (prev, level) => {
        const accum = await prev;
        const status = await ContractService.getBurnStatus(currentGame.game_symbol_id, getPublicKey(), level);
        accum[level] = status;
        return accum;
      }, Promise.resolve({}));
      
      setBurnStatus(_burnStatus);
    }
    getBurnStatus();
  }, [currentGame]);

  return (
    <div className="mt-5 game-cards">
      <Level1
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[1]}
      />
      <Level2
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[2]}
      />
      <Level3
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[3]}
      />
      <Level4
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[4]}
      />
      <Level5
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[5]}
      />
      <Level6
        selectedLevel={selectedLevel}
        game={currentGame}
        onSetLevel={onSetLevel}
        onTradeClick={onTradeClick}
        onGetMoreClick={onGetMoreClick}
        nftCount={nftCount}
        burnStatus={burnStatus[6]}
      />
    </div>
  );
};
