
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level2 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount } = props;
    const level1Count = nftCount['level1'] || -1;
    const level2Count = nftCount['level2'] || -1;
    const status = getLevelsStatuses(game?.level || 1)[2];
    let instructions = '';
    let tradeActionText = '';
    let actionDisbled = false;

    if (level1Count <= 0) {
        instructions = 'You need 2 Artist collectibles to trade for this.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else if (level1Count === 1) {
        instructions = 'Get 1 more from past level to trade.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else {
        actionDisbled = false;
        instructions = `You have ${level2Count === -1 ? 0 : level2Count} NFTs.`;
        switch (level2Count) {
            case -1:
                tradeActionText = 'Trade Now';
                break;
            case 0:
                tradeActionText = 'Trade Now';
                break;
            case 1:
                tradeActionText = 'Trade More';
                break;
            default:
                tradeActionText = 'Trade More';
                break;
        }
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