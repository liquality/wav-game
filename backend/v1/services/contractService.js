
var ethers = require("ethers");
var config = require("../../config.json");
const ContractService = {

    getBurnStatus : async (gameId, level, user) => {
        console.log("cam to burn status")
        try {
            const provider = new ethers.JsonRpcProvider(
                (config.isProd)? config.rpc_urls.mainnet_matic : config.rpc_urls.mumbia_matic
            );
            const contractInstance = new ethers.Contract(
                config.wav_proxy_address,
                config.wav_proxy_abi,
                provider
            );
            
            console.log("2 >> ")
            const eventFilter =  contractInstance.filters.LeveledUp(gameId, user, level)
            const events = await contractInstance.queryFilter(eventFilter)
            console.log(" events >> ", events, " eventFilter >> ", eventFilter)
            console.log("params  >> ", gameId, level, user)
            
            if (events.length > 0) {
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