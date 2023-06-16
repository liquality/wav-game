
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level5 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount } = props;
    const level4Count = nftCount['level4'] || -1;
    const level5Count = nftCount['level5'] || -1;
    const status = getLevelsStatuses(game?.level || 1)[5];
    let instructions = '';
    let tradeActionText = '';
    let actionDisbled = false;
    let edition = '';

    if (level4Count <= 0) {
        instructions = 'You need 2 physical items to trade for this.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else if (level4Count === 1) {
        instructions = 'Get 1 more from past level to trade.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else {
        actionDisbled = false;
        instructions = `You have ${level5Count === -1 ? 0 : level5Count} NFTs.`;
        switch (level5Count) {
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
                id: 5,
                title: 'Get 1 custom-made song',
                edition,
                instructions
            }}
        />
    );
}