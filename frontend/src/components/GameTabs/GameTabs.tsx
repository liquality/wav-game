import { useState, useTransition } from 'react';
import './game-tabs.css';
import { LevelTab } from '../LevelTab/LevelTab';
import { LevelStatus } from '../../types/LevelStatus';

interface GameTabsProps {
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
 * The collection or Tab Levels with animation
 */
export const GameTabs = ({
    currentLevel = 1, // default active card level
    levels = [],
    ...props
}: GameTabsProps) => {
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
        <div className="grid gap-x-2 grid-cols-6">
            {levels.map(l => {
                return (<LevelTab
                    key={l.id}
                    status={l.status as LevelStatus}
                    level={l.id} />);
            }
            )}
        </div>
    );
};
