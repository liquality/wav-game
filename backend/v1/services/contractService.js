
var ethers = require("ethers");
var config = require("../../config.json");
var zeroAddress = "0x0000000000000000000000000000000000000000";

const ContractService = {

    getBurnStatus : async (gameId, level, user, lastBlock) => {
        console.log("cam to burn status")
        try {

            // Get level information
            
            const provider = new ethers.JsonRpcProvider(
                (config.isProd)? config.rpc_urls.mainnet_matic : config.rpc_urls.mumbia_matic
            );

            const wavGame = new ethers.Contract(
                config.wav_proxy_address,
                config.wav_proxy_abi,
                provider
            );

            const levelInfo = await wavGame.getLevel(gameId, level);

            const wavNft = new ethers.Contract(
                config.wav_nft_address,
                config.wav_nft_abi,
                provider
            );


            
            console.log("2 >> ")
            const eventFilter =  wavNft.filters.TransferSingle(config.wav_proxy_address, user, zeroAddress)
            const events = await wavNft.queryFilter(eventFilter, lastBlock);
            
            const hasBurntBefore = events.find(event  => event?.args?.[3]  === levelInfo[3])
            if (!!hasBurntBefore) {
                var lastBlock = await provider.getBlockNumber()
                console.log(" 2.5 >> ", {status: true, lastBlock})
                return {status: true, lastBlock}
            }
            console.log("3 >> ")
            var lastBlock = await provider.getBlockNumber()
            console.log("4 >> ", {status: false, lastBlock})
            return {status: false, lastBlock}
           
        } catch (error) {
            console.log("error >> ", error)
            return {status: false, lastBlock:0}
        }
    }

}
module.exports = ContractService;