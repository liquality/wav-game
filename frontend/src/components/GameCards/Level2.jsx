
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level2 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount, burnStatus } = props;
    const level2Count = nftCount['level2'] || 0;
    const status = getLevelsStatuses(game?.level || 1)[2];
    let instructions = '';
    let tradeActionText = '';
    let actionDisbled = false;

    actionDisbled = false;
    instructions = `You have ${level2Count === -1 ? 0 : level2Count} NFTs.`;
    if(level2Count === 0){
        instructions = 'You need 2 Artist collectibles to trade for this.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else if (level2Count === 1) {
        instructions = 'Get 1 more to trade for next level.';
        tradeActionText = 'Start Trading';
        actionDisbled = true;
    }
    if (level2Count >= 2 && burnStatus ) {
        tradeActionText =  'Trade More';   
    } else {
        tradeActionText =  'Start Trading';
    }

    const actions = [{
        onActionClick: (level) => onTradeClick(level),
        label: tradeActionText,
        mode: 'default',
        disabled: actionDisbled,
        useIcon: actionDisbled
    }];

    return (
        <LevelCard
            status={status}
            current={selectedLevel}
            setLevel={onSetLevel}
            actions={actions}
            level={{
                id: 2,
                title: 'Get 1 top live song',
                edition: '',
                instructions
            }}
        />
    );
}