const { ethers, upgrades } = require("hardhat");
const chalk = require("chalk");

const localChainId = "31337";

module.exports = async ({ getChainId }) => {
  const chainId = await getChainId();

  console.log("\n\n 📡 Deploying wavNFT...\n");
  const WavNFT = await ethers.getContractFactory("WavNFT");
  // Deploy WavNFT
  const wavNFT = await WavNFT.deploy("");

  console.log(
    " \n\n 📄",
    chalk.cyan('wavNFT'),
    "deployed to:",
    chalk.magenta(wavNFT.address)
  );

  console.log(` \n\n 📡  Deploying: wavGame`);

  const WavGame = await ethers.getContractFactory("WavGame");
  
  // deploy with arguments, wavNFT address, trustedForwarder and feePerMint
  // using dummy values here for trusted Forwarder and feePerMint...you can call the setter functions for them later
  const wavGameProxy = await upgrades.deployProxy(WavGame, [wavNFT.address, ethers.constants.AddressZero, 0]);
  await wavGameProxy.deployed();

  const wavGameProxyAddress = wavGameProxy.address;
  const wavGameImplementationAddress =
    await  upgrades.erc1967.getImplementationAddress(wavGameProxyAddress);
  const wavGameAdminAddress = await upgrades.erc1967.getAdminAddress(
    wavGameProxyAddress
  );

  console.log(
    "\n\n 📄",
    chalk.cyan('wavGameProxy'),
    "deployed to:",
    chalk.magenta(wavGameProxyAddress)
  );

  console.log(
    " \n\n 📄",
    chalk.cyan('wavGameImplementation'),
    "deployed to:",
    chalk.magenta(wavGameImplementationAddress)
  );

  console.log(
    " \n\n 📄",
    chalk.cyan('wavGameAdmin'),
    "deployed to:",
    chalk.magenta(wavGameAdminAddress)
  );


  console.log(` \n\n🛰  Setting up wavNFT: use wavGame as Trusted forwarder and Owner`);

  await wavNFT.setTrustedForwarder(wavGameProxyAddress);
  await wavNFT.transferOwnership(wavGameProxyAddress);

  console.log(
    " \n\n ✅︎",
    "Finished setting up wavNFT",
  );

};

module.exports.tags = ["WavGame"];