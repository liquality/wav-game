
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";

export const Level6 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount } = props;
    const level5Count = nftCount['level5'] || -1;
    const level6Count = nftCount['level6'] || -1;
    const status = getLevelsStatuses(game?.level || 1)[5];
    let instructions = '';
    let tradeActionText = '';
    let edition = '';
    let actionDisabled = false;
    let noActions = false;
    let title = 'A chance to win a 1:1 trip + concert experience';

    if (level5Count <= 0) {
        instructions = 'You need to start with 32 Game collectibles.';
        tradeActionText = 'Level locked';
        actionDisabled = true;
    } else if (level5Count === 1) {
        instructions = 'Get 1 more from past level to trade.';
        tradeActionText = 'Level locked';
        actionDisabled = true;
    } else {
        // count down
        const unlockDate = new Date(game?.created_at);
        unlockDate.setDate(unlockDate.getDate() + 7);
        const today = new Date();
        if (unlockDate > today) {
            // show the timer
            noActions = true;
            const difference = getDifferenceBetweenDates(today, unlockDate);
            actionDisabled = true;
            tradeActionText = 'Level locked';
            title = 'Countdown to unlock';
            instructions = `${difference.days}DAYS:${difference.hours}HRS:${difference.minutes}MIN`;
        } else {
            actionDisabled = false;
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
    }

    const actions = noActions ? [] : [{
        onActionClick: (level) => onTradeClick(level),
        label: tradeActionText,
        mode: 'default',
        disabled: actionDisabled,
        useIcon: actionDisabled
    }];

    return (
        <LevelCard
            status={status}
            current={selectedLevel}
            setLevel={onSetLevel}
            actions={actions}
            level={{
                id: 6,
                title,
                edition,
                instructions
            }}
        />
    );
}