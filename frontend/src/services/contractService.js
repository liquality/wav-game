
import { ethers } from "ethers";
import {
  WAV_PROXY_ABI,
  WAV_PROXY_ADDRESS
} from "../data/contract_data";

const ContractService = {

    getBurnStatus : async (gameId, user, level) => {
        try {
            const provider = new ethers.JsonRpcProvider(
                process.env.REACT_APP_RPC_URL
            );
            const contractInstance = new ethers.Contract(
                WAV_PROXY_ADDRESS,
                WAV_PROXY_ABI,
                provider
            );
            
            const eventFilter = contractInstance.filters.LeveledUp(gameId,user,level+1)
            const events = await contractInstance.queryFilter(eventFilter)
            
            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                const gameID = Number(event.args.gameID);
                const collector = event.args.collector;
                const newLevelID = Number(event.args.newIslandID);
                if (gameId === gameID && collector === user && newLevelID-1 === level) {
                    return true
                }
            }
            return false
           
        } catch (error) {
            console.log("error >> ", error)
            return false
        }
    }

}
export default ContractService;