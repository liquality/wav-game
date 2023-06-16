
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level1 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, onGetMoreClick, nftCount} = props;
    const status = getLevelsStatuses(game?.level || 1)[1];
    const level1Count = nftCount['level1'] || -1;
    const instructions = `You have ${level1Count === -1 ? 0 : nftCount} NFTs.`;
    let tradeActionText = '';

    switch (level1Count) {
        case -1:
            tradeActionText =  'Get Artist Collectibles';
        break;
        case 0:
            tradeActionText =  'Start Trading';
        break;
        default:
            tradeActionText =  'Trade More';        
        break;
    }
    
    const actions = [{
        onActionClick: (level) => onTradeClick(level),
        label: tradeActionText,
        mode: 'default'
    }];

    if(level1Count > 0) {
        actions.push({
            onActionClick: (level) => onGetMoreClick(level),
            label: 'Get More',
            mode: 'default',
            link: true
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
                title: 'Game Collectible',
                edition: '',
                instructions
            }}
        />
    );
}