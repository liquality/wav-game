
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level4 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount } = props;
    const level3Count = nftCount['level3'] || -1;
    const level4Count = nftCount['level4'] || -1;
    const status = getLevelsStatuses(game?.level || 1)[4];
    let instructions = '';
    let tradeActionText = '';
    let actionDisbled = false;
    let edition = '100/100 CLAIMED';

    if (level3Count <= 0) {
        instructions = 'You need 2 unreleased songs to trade for this.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else if (level3Count === 1) {
        instructions = 'Get 1 more from past level to trade.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else {
        actionDisbled = false;
        instructions = `You have ${level4Count === -1 ? 0 : level4Count} NFTs.`;
        switch (level4Count) {
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
                id: 4,
                title: 'Get 1 limited physical item',
                edition,
                instructions
            }}
        />
    );
}