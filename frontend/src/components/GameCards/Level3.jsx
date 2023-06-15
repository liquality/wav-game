
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level3 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount } = props;
    const level2Count = nftCount['level2'] || -1;
    const level3Count = nftCount['level3'] || -1;
    const status = getLevelsStatuses(game?.level || 1)[3];
    let instructions = '';
    let tradeActionText = '';
    let actionDisbled = false;

    if (level2Count <= 0) {
        instructions = 'You need 2 top live songs to trade for this.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else if (level2Count === 1) {
        instructions = 'Get 1 more from past level to trade.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else {
        actionDisbled = false;
        instructions = `You have ${level3Count === -1 ? 0 : level3Count} NFTs.`;
        switch (level3Count) {
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
                id: 3,
                title: 'Get 1 unreleased song',
                edition: '',
                instructions
            }}
        />
    );
}