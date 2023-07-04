import { ethers } from "ethers";
import {
  WAV_NFT_ABI,
  WAV_NFT_ADDRESS,
  WAV_PROXY_ABI,
  WAV_PROXY_ADDRESS,
} from "../data/contract_data";
import { fetchSession, getPrivateKey, getPublicKey } from "../utils";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const EARLY_BIRD_COLLECTORS_MAX = {
  4: 20,
  5: 10,
};

const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

if (fetchSession()?.token) {
  var wavGame = new ethers.Contract(
    WAV_PROXY_ADDRESS,
    WAV_PROXY_ABI,
    new ethers.Wallet(getPrivateKey(), provider)
  );

  var wavNft = new ethers.Contract(
    WAV_NFT_ADDRESS,
    WAV_NFT_ABI,
    new ethers.Wallet(getPrivateKey(), provider)
  );
}

if (fetchSession()?.token) {
  var ContractService = {
    canBecomeEarlyBirdCollector: async (gameId, level) => {
      try {
        if (level === 6) {
          const collector = await wavGame.highestLevelCollector();
          return collector === ZERO_ADDRESS;
        } else {
          const collectors = await wavGame.fetchEarlyBirdCollectors(
            gameId,
            level
          );

          return collectors.length < EARLY_BIRD_COLLECTORS_MAX[level];
        }
      } catch (error) {
        console.log("error >> ", error);
      }
    },

    earlyBirdCount: async (gameId, level) => {
      try {
        if (level === 6) {
          const collector = await wavGame.highestLevelCollector();
          return collector === ZERO_ADDRESS ? 0 : 1;
        } else {
          return (await wavGame.fetchEarlyBirdCollectors(gameId, level)).length;
        }
      } catch (error) {
        console.log("error >> ", error);
      }
    },

    isEarlyBird: async (gameId, level) => {
      try {
        if (level === 6) {
          const collector = await wavGame.highestLevelCollector();
          return collector === getPublicKey();
        } else {
          return await wavGame.isEarlyBirdCollector(gameId, level);
        }
      } catch (error) {
        console.log("error >> ", error);
      }
    },

    tokenBalance: async (tokenID) => {
      return await wavNft.balanceOf(getPublicKey(), +tokenID);
    },
  };
}

export default ContractService;
