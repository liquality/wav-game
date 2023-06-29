
import { ethers } from "ethers";
import {
  WAV_PROXY_ABI,
  WAV_PROXY_ADDRESS
} from "../data/contract_data";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const EARLY_BIRD_COLLECTORS_MAX = {
    4: 20,
    5: 10
};

const ContractService = {

    canBecomeEarlyBirdCollector : async (gameId, user, level) => {
        try {
            const provider = new ethers.JsonRpcProvider(
                process.env.REACT_APP_RPC_URL
            );
            const wavGame = new ethers.Contract(
                WAV_PROXY_ADDRESS,
                WAV_PROXY_ABI,
                provider
            );

            if(level === 6) {
                 const collector = await wavGame.highestLevelCollector();
                return collector === ZERO_ADDRESS;
            }else{
                const collectors = await wavGame.fetchEarlyBirdCollectors(gameId, level);
                return collectors.length < EARLY_BIRD_COLLECTORS_MAX[level];
            }
            
        } catch (error) {
            console.log("error >> ", error)
        }
    }

}
export default ContractService;
