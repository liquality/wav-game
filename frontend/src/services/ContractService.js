import { ethers } from "ethers";
import {
  CHAIN_ID,
  WAV_NFT_ABI,
  WAV_NFT_ADDRESS,
  WAV_PROXY_ABI,
  WAV_PROXY_ADDRESS,
} from "../data/contract_data";
import { generateTokenIdArray, getPrivateKey, getPublicKey } from "../utils";
import { NftService } from "@liquality/wallet-sdk";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const EARLY_BIRD_COLLECTORS_MAX = {
  4: 20,
  5: 10,
};

const provider = new ethers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);

const tokenIDByArtistAndLevel = (artist, level) => {
  let firstChar = artist.toString()[0];
  return firstChar + 0 + level;
};

let wavGame;
let wavNft;

const getWavGame = () => {
  if(wavGame) return wavGame;
  wavGame = new ethers.Contract(
    WAV_PROXY_ADDRESS,
    WAV_PROXY_ABI,
    new ethers.Wallet(getPrivateKey(), provider)
  );

  return wavGame;
}

const getWavNft = () => {
  if(wavNft) return wavNft;
  wavNft = new ethers.Contract(
    WAV_NFT_ADDRESS,
    WAV_NFT_ABI,
    new ethers.Wallet(getPrivateKey(), provider)
  );

  return wavNft;
}



var ContractService = {
  canBecomeEarlyBirdCollector: async (gameId, level) => {
    try {
      // if (level === 6) {
       // const collector = await getWavGame().highestLevelCollector();
       // return collector === ZERO_ADDRESS;
      //} else {
        const collectors = await getWavGame().fetchEarlyBirdCollectors(
          gameId,
          level
        );

        return collectors.length < EARLY_BIRD_COLLECTORS_MAX[level];
      //}
    } catch (error) {
      console.log("error >> ", error);
    }
  },

  earlyBirdCount: async (gameId, level) => {
    try {
      // if (level === 6) {
      //   const collector = await getWavGame().highestLevelCollector();
      //   return collector === ZERO_ADDRESS ? 0 : 1;
      // } else {
      //   return (await getWavGame().fetchEarlyBirdCollectors(gameId, level)).length;
      // }
      return (await getWavGame().fetchEarlyBirdCollectors(gameId, level)).length;
    } catch (error) {
      console.log("error >> ", error);
    }
  },

  isEarlyBird: async (gameId, level) => {
    try {
      // if (level === 6) {
      //   const collector = await getWavGame().highestLevelCollector();
      //   return collector === getPublicKey();
      // } else {
      //   return await getWavGame().isEarlyBirdCollector(gameId, level);
      // }

      return await getWavGame().isEarlyBirdCollector(gameId, level);
    } catch (error) {
      console.log("error >> ", error);
    }
  },

  tokenBalance: async (tokenID) => {
      return await getWavNft().balanceOf(getPublicKey(), +tokenID);
  },


  getNfts: async (artistID) => {
    return  await  NftService.getNfts(getPublicKey(), CHAIN_ID, [WAV_NFT_ADDRESS]);
    // const nfts = [];
    // for(let i = 1; i < 6; i++){
    //   const id = tokenIDByArtistAndLevel(artistID, i);
    //   console.log('The id in getNFTS is => ',   id);
    //   const balance = await getWavNft().balanceOf(getPublicKey(), +id);
    //   nfts.push({id,  balance: Number(balance), contract: {address: WAV_NFT_ADDRESS}});
    // }
    // return  nfts;
  },

  checkIfFullSetHolder: async (artistNumberId) => {
    const nfts = await ContractService.getNfts(artistNumberId);
    const tokenIdArray = await generateTokenIdArray(artistNumberId / 1000);
    //const tokenIdArray = [301, 302, 304]

    const userNfts = nfts.filter((nft) => {
        return (
            ethers.getAddress(nft.contract.address) ===
            ethers.getAddress(process.env.REACT_APP_WAV_NFT_ADDRESS) &&
            tokenIdArray.includes(Number(nft.id))
        );
    });

    if (userNfts.length === tokenIdArray.length) {
        // user has at least one of each NFT in the tokenIdArray (is full set holder)
        return true
    } else {
        // user is missing some NFTs from the tokenIdArray
        return false
    }
  },

  setApprovalForAllTxData: async () => {
    return (await getWavNft().setApprovalForAll.populateTransaction(
      WAV_PROXY_ADDRESS, true
    )).data;
  },

  levelUpTxData: async (artistNumberId, level) => {
    return (await getWavGame().levelUp.populateTransaction(
      artistNumberId,
      level
    )).data;
  },
};

export default ContractService;
