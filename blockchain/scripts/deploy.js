// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // When running the script with `npx hardhat run <script>` you'll find the Hardhat
// // Runtime Environment's members available in the global scope.
// import { ethers } from "hardhat";
// import {} from "@liquality/wallet-sdk";

// async function main() {
//   // Hardhat always runs the compile task when running scripts with its command
//   // line interface.
//   //
//   // If this script is run directly using `node` you may want to call compile
//   // manually to make sure everything is compiled
//   // await hre.run('compile');

//   // const tokenUri = process.env.TOKEN_URI as string;
//   // const trustedForwarder = process.env.TRUSTED_FORWARDER as string;
//   // const feePerMint = ethers.utils.parseEther(
//   //   process.env.FEE_PER_MINT as string
//   // );

//   // console.log("==================== Deploying Contracts ====================");

//   // // We get the contract to deploy
//   // const WavNFT = await ethers.getContractFactory("WavNFT");
//   // const WavGame = await ethers.getContractFactory("WavGame");

//   // // Deploy WavNFT
//   // const wavNFT = await WavNFT.deploy(tokenUri);
//   // console.log("Deployed WavNFT at : ", wavNFT.address);

//   // // Deploy WavGame
//   // const wavGame = await WavGame.deploy(
//   //   wavNFT.address,
//   //   trustedForwarder,
//   //   feePerMint.toString()
//   // );
// //   console.log("Deployed WavGame at : ", wavGame.address);

// //   //Setup WavNFT
// //   await wavNFT.transferOwnership(wavGame.address);
// //   await wavNFT.setTrustedForwarder(wavGame.address);

// //   console.log(
// //     "==================== Completed WavNFT Setup ===================="
// //   );

// //   // WavGame Config: Initialize all games
// //   console.log(
// //     "==================== Initializing all games ===================="
// //   );

// //   // Set payment contracts per games
// //   console.log(
// //     "==================== Complete Deployment & Initialization ===================="
// //   );

// console.log('works')
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const { ethers, upgrades } = require("hardhat");

const localChainId = "31337";

module.exports = async ({ getChainId }) => {
  // const chainId = await getChainId();

  // const KingOfTheFools = await ethers.getContractFactory("KingOfTheFools");
  // const kingOfTheFoolsProxy = await upgrades.deployProxy(KingOfTheFools);
  // await kingOfTheFoolsProxy.deployed();

  // const kingOfTheFoolsProxyAddress = kingOfTheFoolsProxy.address;
  // const kingOfTheFoolsImplementationAddress =
  //   upgrades.erc1967.getImplementationAddress(kingOfTheFoolsProxyAddress);
  // const kingOfTheFoolsAdminAddress = upgrades.erc1967.getAdminAddress(
  //   kingOfTheFoolsProxyAddress
  // );

  // console.log(kingOfTheFoolsProxyAddress, " kingOfTheFools(proxy) address");
  // console.log(
  //   await kingOfTheFoolsImplementationAddress,
  //   " getImplementationAddress"
  // );
  // console.log(await kingOfTheFoolsAdminAddress, " getAdminAddress");

  // // verify on etherscan
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: kingOfTheFoolsProxyAddress,
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["KingOfTheFools"];