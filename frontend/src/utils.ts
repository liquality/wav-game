import { NftService, setup } from "@liquality/wallet-sdk";
import StaticDataService from "./services/StaticDataService";
import { ethers } from "ethers";
import { CHAIN_ID, WAV_NFT_ADDRESS } from "./data/contract_data";

export function setupSDK() {
    setup({
        alchemyApiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        etherscanApiKey: '-',
        infuraProjectId: '-',
        gelatoApiKey: process.env.REACT_APP_GELATO_API_KEY,
        pocketNetworkApplicationID: '-',
        quorum: 1,
        slowGasPriceMultiplier: 1,
        averageGasPriceMultiplier: 1.5,
        fastGasPriceMultiplier: 2,
        gasLimitMargin: 2000
    });
}

//Helper function to shorten addresses
export const shortenAddress = (address: string): string => {
    return String(address).substr(0, 5) +
        "..." +
        String(address).substr(38, 4)
}
export const logOut = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("loginResponse");
    window.location.reload()
};

export function getPrivateKey(): string {
    return JSON.parse(localStorage.getItem("loginResponse")!)?.loginResponse?.privateKey;
}

export function getPublicKey(): string {
    return JSON.parse(localStorage.getItem("loginResponse")!)?.loginResponse?.publicAddress;
}


export const fetchSession = () => {
    const sessionString = localStorage.getItem('session');
    if (sessionString) {
        const session = JSON.parse(sessionString);
        return session
    }
    else return null
}

export const getGameIdBasedOnHref = async () => {
    // Get the last part of the window location href
    const hrefParts = window.location.href.split('/');
    const lastPart = hrefParts[hrefParts.length - 1];
    //based on window location, return artist
    const artist = await StaticDataService.findArtistById(lastPart)
    return artist
}

export const filterArrayByIdStartingWith = async (nftsArray, artistNumberId, level) => {
    let firstChar = artistNumberId.toString()[0];
    const result = [];

    for (let i = 0; i < nftsArray.length; i++) {
        const obj = nftsArray[i];
        if (ethers.getAddress(obj.contract.address) ===
            ethers.getAddress(process.env.REACT_APP_WAV_NFT_ADDRESS) &&
            obj.id && obj.id.toString().startsWith(firstChar.toString())) {
            result.push(obj);
        }
    }

    return result;
}


export const getCurrentLevel = async (nfts?: any[], artistId?: number) => {
    const artist = artistId.toString();
    return (nfts || []).reduce((acum: any, curr: any) => {
        if (curr.id[0] === artist[0] &&
            ethers.getAddress(curr.contract.address) ===
            ethers.getAddress(process.env.REACT_APP_WAV_NFT_ADDRESS)) {
            const level = parseInt(curr.id.slice(-1));
            acum.levels[level] = curr.balance;
            if (level > acum.currentLevel && curr.balance > 0) {
                acum.currentLevel = level
            }
            acum.totalCollectibles += curr.balance;
        }

        return acum;
    }, { levels: {}, totalCollectibles: 0, currentLevel: 1 });
}

/* export const getNFTCountPerLevelAndTotalCollectibles = async (nfts, artistNumberId) => {
    const levels = {};
    let totalCollectibles = 0;
    let artistNrString = artistNumberId.toString();
    nfts.forEach((nft: any) => {
        if (nft.id[0] === artistNrString[0] &&
            ethers.getAddress(nft.contract.address) ===
            ethers.getAddress(process.env.REACT_APP_WAV_NFT_ADDRESS)) {
            const level = parseInt(nft.id.slice(-1));
            levels[`level${level}`] = nft.balance;
            totalCollectibles += nft.balance
        }

    });
    return { levels, totalCollectibles };
}
 */


export const getLevelsStatuses = (currentLevel: number) => {
    return {
        1: currentLevel > 1 ? "completed" : "active",
        2:
            currentLevel > 2
                ? "completed"
                : currentLevel === 2
                    ? "active"
                    : currentLevel === 1
                        ? "next"
                        : "upcomming",
        3:
            currentLevel > 3
                ? "completed"
                : currentLevel === 3
                    ? "active"
                    : currentLevel === 2
                        ? "next"
                        : "upcomming",
        4:
            currentLevel > 4
                ? "completed"
                : currentLevel === 4
                    ? "active"
                    : currentLevel === 3
                        ? "next"
                        : "upcomming",
        5:
            currentLevel > 5
                ? "completed"
                : currentLevel === 5
                    ? "active"
                    : currentLevel === 4
                        ? "next"
                        : "upcomming",
        6:
            currentLevel === 6
                ? "active"
                : currentLevel === 5
                    ? "next"
                    : "upcomming",
    };
};


export const getDifferenceBetweenDates = (startDate: any, endDate: any) => {
    const seconds = Math.floor((endDate - startDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return { seconds: seconds - (60 * minutes), minutes: minutes - (60 * hours), hours: hours - (24 * days), days };
};





export const getHowManyPlayersAreInEachLevel = async (artistNumberId) => {
    const nftObject = await fetchNFTOwners();
    const filteredArray = nftObject.result.filter((item) => item.token_id.startsWith(artistNumberId / 1000));
    const levelCounts = {};

    filteredArray.forEach((item, index) => {
        const tokenId = parseInt(item.token_id);
        const owner = item.owner_of;

        if (!levelCounts[`level${tokenId}`]) {
            levelCounts[`level${tokenId}`] = new Set();
        }

        levelCounts[`level${tokenId}`].add(owner);
    });

    const result = {};
    Object.keys(levelCounts).forEach((level) => {
        result[level] = levelCounts[level].size;
    });

    return result;
};




//TODO: mumbai chainid in hex: 0x13881
async function fetchNFTOwners() {

    const hexValue = CHAIN_ID.toString(16);
    const hexValueWithPrefix = "0x" + hexValue;

    if (process.env.REACT_APP_MORALIS_API_KEY) {
        const url =
            `https://deep-index.moralis.io/api/v2/nft/${WAV_NFT_ADDRESS}/owners?chain=${hexValueWithPrefix}&disable_total=false`;

        const headers = {
            "x-api-key": process.env.REACT_APP_MORALIS_API_KEY,
        };

        try {
            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    } else { console.log("Error, must set Moralis API key") }

}
export const generateTokenIdArray = async (artistNumberId) => {
    const base = artistNumberId * 100;

    const result = [];
    for (let i = 1; i <= 6; i++) {
        if (i === 3) continue; // Skip the number 3 in the sequence
        result.push(base + i);
    }

    return result;
}

export const fetchMaticPriceInUSD = async () => {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
        const data = await response.json();
        const maticPrice = data['matic-network'].usd;

        const maticAmount = 15;
        const usdValue = maticAmount * maticPrice;

        return usdValue.toFixed(2);
    } catch (error) {
        console.error('Error fetching Matic price:', error);
        // Handle error gracefully
        return null;
    }
}


export function applyCountDown(levelSettings: any): Boolean {
    if (levelSettings && levelSettings.countdown_ends > 0) {
        const unlockDate = new Date(levelSettings.countdown_start_at);
        unlockDate.setMilliseconds(
            unlockDate.getMilliseconds() + levelSettings.countdown_ends
        );
        const today = new Date();
        return unlockDate > today;
    }
    return false;
}