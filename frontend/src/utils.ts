import { setup } from "@liquality/wallet-sdk";

export function setupSDK() {
    setup({
        alchemyApiKey: 'JmoTKlpUIjzd1y5-8h-La50OewZULyL0',
        etherscanApiKey: '-',
        infuraProjectId: '-',
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
    window.location.reload()
};

export function getPrivateKey(): string {
    return JSON.parse(localStorage.getItem("loginResponse")!).loginResponse.privateKey;
}


export const fetchSession = () => {
    const sessionString = localStorage.getItem('session');
    if (sessionString) {
        const session = JSON.parse(sessionString);
        return session
    }
    else return null

}