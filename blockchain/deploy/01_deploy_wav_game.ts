import { ethers, upgrades } from "hardhat";
import {AddressZero} from "@ethersproject/constants";
import { sign } from "crypto";
import {WavGame__factory} from "../typechain-types/factories/contracts/WavGame__factory";

module.exports = async ({ getChainId }) => {
//   const chainId = await getChainId();

//   console.log(`\n\n 📡 Deploying/upgrading Contracts to ${chainId}...\n`);

//   console.log(`\n\n 📡 Deploying wavNFT...\n`);
//   const WavNFT = await ethers.getContractFactory("WavNFT");
//   // Deploy WavNFT
//   const wavNFT = await WavNFT.deploy(process.env.NFT_BASE_URI);

//   console.log(
//     " \n\n 📄",
//     'wavNFT',
//     "deployed to:",
//     wavNFT.address
//   );

//   console.log(` \n\n 📡  Upgrading: wavGame`);

//   const WavGame = await ethers.getContractFactory("WavGame");
//   const wavGameUpgraded = await upgrades.upgradeProxy(process.env.CURRENT_WAVGAME_PROXY as string, WavGame);


//   const wavGameProxyAddress = wavGameUpgraded.address;
//   const wavGameImplementationAddress =
//     await  upgrades.erc1967.getImplementationAddress(wavGameProxyAddress);
//   const wavGameAdminAddress = await upgrades.erc1967.getAdminAddress(
//     wavGameProxyAddress
//   );

//   console.log(
//     "\n\n 📄",
//     'wavGameProxy',
//     "deployed to:",
//     wavGameProxyAddress
//   );

//   console.log(
//     " \n\n 📄",
//     'wavGameImplementation',
//     "deployed to:",
//     wavGameImplementationAddress
//   );

//   console.log(
//     " \n\n 📄",
//     'wavGameAdmin',
//     "deployed to:",
//     wavGameAdminAddress
//   );


//   console.log(` \n\n🛰  Setting up wavNFT: use wavGame as Trusted forwarder and Owner`);

//   await wavNFT.setTrustedForwarder(process.env.TRUSTED_FORWARDER);
//   await wavNFT.transferOwnership(wavGameProxyAddress);

//   console.log(
//     " \n\n ✅︎",
//     "Finished setting up wavNFT",
//   );
  console.log(` \n\n🛰  Setting up wavGame`);
  let signers = await ethers.getSigners();
    let wavGameFactory = WavGame__factory.connect(AddressZero, signers[0]).attach(process.env.CURRENT_WAVGAME_PROXY as string)

//   await wavGameFactory.setWavNFT(wavNFT.address);

  if (process.env.ENVIRONMENT == "staging") {
    // Test data
   const gameIDs = [6000,7000,8000]
   const treasuries = ["0xa2AABd9935AB60972B73fe1Df7b87bEFf09134E3", "0x1f6A2b990f9B79B77920d48E97157f81E4A552BC", "0xBBAFAcA629ED61605b174E6afd50D324E1DE0C70"]
   for (let i=6; i<gameIDs.length+6; i++) {
     await wavGameFactory.setGame(i*1000, [
        {
            requiredBurn: 0,
            requiredMint: 0,
            earlyBirdCutOff: 0,
            mintable: i*100 + 1,
            burnable: 0
        },
        {
            requiredBurn: 2,
            requiredMint: 1,
            earlyBirdCutOff: 10,
            mintable: i*100 + 2,
            burnable: i*100 + 1
        },
        {
            requiredBurn: 2,
            requiredMint: 1,
            earlyBirdCutOff: 10,
            mintable: i*100 + 3,
            burnable: i*100 + 2
        },
        {
            requiredBurn: 2,
            requiredMint: 1,
            earlyBirdCutOff: 10,
            mintable: i*100 + 4,
            burnable: i*100 + 3
        },
        {
            requiredBurn: 2,
            requiredMint: 1,
            earlyBirdCutOff: 10,
            mintable: i*100 + 5,
            burnable: i*100 + 4
        },
        {
            requiredBurn: 2,
            requiredMint: 1,
            earlyBirdCutOff: 10,
            mintable: i*100 + 6,
            burnable: i*100 + 5
     }])  
   }
   await wavGameFactory.setTreasuries(gameIDs, treasuries)
 }

};

module.exports.tags = ["UpgradeWavGame"];