
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";

export const Level4 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount } = props;
    const level3Count = nftCount['level3'] || -1;
    const level4Count = nftCount['level4'] || -1;
    let status = getLevelsStatuses(game?.level || 1)[4];
    let instructions = '';
    let tradeActionText = '';
    let actionDisabled = false;
    let noActions = false;
    let edition = ''; //100/100 CLAIMED
    let title = 'Get 1 limited physical item';

    if (level3Count <= 0) {
        instructions = 'You need 2 unreleased songs to trade for this.';
        tradeActionText = 'Level locked';
        actionDisabled = true;
    } else if (level3Count === 1) {
        instructions = 'Get 1 more from past level to trade.';
        tradeActionText = 'Level locked';
        actionDisabled = true;
    } else {
        // count down
        const unlockDate = new Date(game?.created_at);
        unlockDate.setDate(unlockDate.getDate() + 3);
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
                id: 4,
                title,
                edition,
                instructions
            }}
        />
    );
}