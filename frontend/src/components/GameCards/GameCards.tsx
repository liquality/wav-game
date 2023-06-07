import { useState, useTransition } from 'react';
import './game-cards.css';
import { LevelCard } from '../LevelCard/LevelCard';
import { LevelStatus } from '../../types/LevelStatus';

interface GameCardsProps {
  /**
    The current level 
   */
  currentLevel?: number;

  /**
   * Click handler for each level
   */
  onLevelSelected?: (level: number) => void;

  levels: any[]
}

/**
 * The collection or Card Levels with animation
 */
export const GameCards = ({
  currentLevel = 1, // default active card level
  levels = [],
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
      {levels.map(l => {
        return (<LevelCard
          status={l.status as LevelStatus}
          setLevel={onSetLevel}
          current={level}
          actions={[]}
          level={l} />);
      }
      )}
    </div>
  );
};