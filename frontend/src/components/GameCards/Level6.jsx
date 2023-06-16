
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses } from "../../utils";

export const Level6 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount } = props;
    const level5Count = nftCount['level5'] || -1;
    const level6Count = nftCount['level6'] || -1;
    const status = getLevelsStatuses(game?.level || 1)[5];
    let instructions = '';
    let tradeActionText = '';
    let actionDisbled = false;
    let edition = '';

    if (level5Count <= 0) {
        instructions = 'You need to start with 32 Game collectibles.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else if (level5Count === 1) {
        instructions = 'Get 1 more from past level to trade.';
        tradeActionText = 'Level locked';
        actionDisbled = true;
    } else {
        actionDisbled = false;
        instructions = `You have ${level6Count === -1 ? 0 : level6Count} NFTs.`;
        switch (level6Count) {
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
                id: 6,
                title: 'A chance to win a 1:1 trip + concert experience.',
                edition,
                instructions
            }}
        />
    );
}