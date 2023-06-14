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

export const countNFTsByLevel = async (nfts, artistNumberId) => {

    const artistNFTs = nfts.filter(nft => {
        let artistNrString = artistNumberId.toString()
        return nft.id[0] === artistNrString[0]
    });


    console.log(artistNFTs, 'ARTIST NFT BÄ')
    const levels = {};

    artistNFTs.forEach(nft => {
        const level = parseInt(nft.id.slice(-1));
        console.log(level, 'LEVEL BÄ')

        if (levels[`level${level}`]) {
            levels[`level${level}`]++;
        } else {
            levels[`level${level}`] = 1;
        }
    });

    if (Object.keys(levels).length > 0) {
        return levels;
    }

}
