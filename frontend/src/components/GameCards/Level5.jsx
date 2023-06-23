
import { LevelCard } from "../LevelCard/LevelCard";
import { getLevelsStatuses, getDifferenceBetweenDates } from "../../utils";

export const Level5 = (props) => {
    const { selectedLevel, game, onSetLevel, onTradeClick, nftCount, burnStatus } = props;
    const level5Count = nftCount['level5'] || 0;
    const status = getLevelsStatuses(game?.level || 1)[5];
    let instructions = '';
    let tradeActionText = '';
    let edition = '';
    let actionDisabled = false;
    let noActions = false;
    let title = 'Get 1 custom-made song';

        if(level5Count < 2){
            if (level5Count === 0) {
                instructions = 'You need 2 physical items to trade for this.';
                tradeActionText = 'Level locked';
                actionDisabled = true;
            } else {
                instructions = 'Get 1 more from past level to trade.';
                tradeActionText = 'Start Trading';
                actionDisabled = true;
            }
        } else {
         // count down
         const unlockDate = new Date(game?.created_at);
         unlockDate.setDate(unlockDate.getDate() + 5);
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
            if (burnStatus) {
                tradeActionText =  'Trade More'; 
            }  else {
                tradeActionText =  'Start Trading';
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
                id: 5,
                title,
                edition,
                instructions
            }}
        />
    );
}