
import { LevelCard } from "../LevelCard/LevelCard";
import { LevelStatus } from "../../types/LevelStatus";

const DEFAULT_CONTENT = {
    id: 5,
    title: 'Game Collectible',
    edition: '',
    instructions: 'You have 0 NFTs.'
};
export const Level5 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, onGetMoreClick } = props;
    const status = 'active';
    const actions = [{
        onActionClick: (level) => onTradeClick(level),
        label: 'Trade Now',
        mode: 'default'
    }];
    return (
        <LevelCard
            status={status}
            current={selectedLevel}
            setLevel={onSetLevel}
            actions={actions}
            level={DEFAULT_CONTENT}
        />
    );
}