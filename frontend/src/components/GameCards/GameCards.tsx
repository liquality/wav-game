import { useState, useTransition } from "react";
import "./game-cards.css";
import { LevelCard } from "../LevelCard/LevelCard";
import { LevelStatus } from "../../types/LevelStatus";

interface GameCardsProps {
  /**
    The current level 
   */
  currentLevel?: number;

  /**
   * Click handler for each level
   */
  onLevelSelected?: (level: number) => void;

  levels: any[];
  setShowTrade: (level: number) => void;
}

/**
 * The collection or Card Levels with animation
 */
export const GameCards = ({
  currentLevel = 1, // default active card level
  levels = [],
  setShowTrade,
  ...props
}: GameCardsProps) => {
  const [level, setLevel] = useState(currentLevel);
  const [isPending, startTransition] = useTransition();
  function onSetLevel(levelId?: number) {
    startTransition(() => {
      if (!isPending) {
        setLevel(levelId || currentLevel);
      }
    });
  }

  return (
    <div className="flex flex-row mt-5 game-cards">
      {levels.map((l) => {
        return (
          <LevelCard
            key={l.id}
            setShowTrade={setShowTrade}
            status={l.status as LevelStatus}
            setLevel={onSetLevel}
            current={level}
            actions={[]}
            level={l}
          />
        );
      })}
    </div>
  );
};
