import { setup } from "@liquality/wallet-sdk";
import StaticDataService from "./services/StaticDataService";

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
    return JSON.parse(localStorage.getItem("loginResponse")!).loginResponse.privateKey;
}

export function getPublicKey(): string {
    return JSON.parse(localStorage.getItem("loginResponse")!).loginResponse.publicAddress;
}

export function seeIfUserCanLogIn() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var storedValue = localStorage.getItem(key);

        try {
            var storedValueInJsonFormat = JSON.parse(storedValue);
            if (storedValueInJsonFormat && storedValueInJsonFormat.hasOwnProperty('share')) {
                return true;
            }
        } catch (error) {
            // Handle invalid JSON
            console.error('BÄ Error parsing stored value as JSON:', error);

        }
    }
    return false; // If no matching value is found
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



export const filterArrayByIdStartingWith = async (nftsArray, artistNumberId) => {
    let firstChar = artistNumberId.toString()[0];

    const result = [];

    for (let i = 0; i < nftsArray.length; i++) {
        const obj = nftsArray[i];
        if (obj.id && obj.id.toString().startsWith(firstChar.toString())) {
            result.push(obj);
        }
    }

    return result;
}



export const countNFTsByLevel = async (nfts, artistNumberId) => {
    const artistNFTs = nfts.filter(nft => {
        let artistNrString = artistNumberId.toString()
        return nft.id[0] === artistNrString[0]
    });
    const levels = {};
    artistNFTs.forEach(nft => {
        const level = parseInt(nft.id.slice(-1));
        if (!levels[`level${level}`]) {
            levels[`level${level}`] = nft.balance;
        } else {
            levels[`level${level}`] += nft.balance;
        }

    });
    return levels;
}


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