import { ethers, upgrades } from "hardhat";

module.exports = async ({ getChainId }) => {
  const chainId = await getChainId();

  console.log("\n\n 📡 Deploying wavNFT...\n");
  const WavNFT = await ethers.getContractFactory("WavNFT");
  // Deploy WavNFT
  const wavNFT = await WavNFT.deploy("");

  console.log(
    " \n\n 📄",
    'wavNFT',
    "deployed to:",
    wavNFT.address
  );

  console.log(` \n\n 📡  Deploying: wavGame`);

  const WavGame = await ethers.getContractFactory("WavGame");
  
  // deploy with arguments, wavNFT address, trustedForwarder and feePerMint
  // using dummy values here for trusted Forwarder and feePerMint...you can call the setter functions for them later
  const wavGameProxy = await upgrades.deployProxy(WavGame, [wavNFT.address, process.env.TRUSTED_FORWARDER, ethers.utils.parseEther("0.0005")]);
  await wavGameProxy.deployed();

  const wavGameProxyAddress = wavGameProxy.address;
  const wavGameImplementationAddress =
    await  upgrades.erc1967.getImplementationAddress(wavGameProxyAddress);
  const wavGameAdminAddress = await upgrades.erc1967.getAdminAddress(
    wavGameProxyAddress
  );

  console.log(
    "\n\n 📄",
    'wavGameProxy',
    "deployed to:",
    wavGameProxyAddress
  );

  console.log(
    " \n\n 📄",
    'wavGameImplementation',
    "deployed to:",
    wavGameImplementationAddress
  );

  console.log(
    " \n\n 📄",
    'wavGameAdmin',
    "deployed to:",
    wavGameAdminAddress
  );


  console.log(` \n\n🛰  Setting up wavNFT: use wavGame as Trusted forwarder and Owner`);

  await wavNFT.setTrustedForwarder(process.env.TRUSTED_FORWARDER);
  await wavNFT.transferOwnership(wavGameProxyAddress);

  console.log(
    " \n\n ✅︎",
    "Finished setting up wavNFT",
  );

  console.log(` \n\n🛰  Setting up wavGame`);
  if (process.env.ENVIRONMENT == "staging") {
     // Test data
    const wavGames = [
      {gameID: 1000, islands: [
        [
          0,
          0,
          0,
          1,
          0
        ],
        [
          1,
          1,
          2,
          2,
          1
        ]
      ]},
      {gameID: 2000, islands:[
        [
          0,
          0,
          0,
          3,
          0
        ],
        [
          1,
          1,
          2,
          4,
          3
        ]
      ]},
      {gameID: 3000, islands:[
        [
          0,
          0,
          0,
          5,
          0
        ],
        [
          1,
          1,
          2,
          6,
          5
        ]
      ]}
    ]
    const gameIDs = [1000,2000,3000]
    const treasuries = ["0x80De31442Fb3ba4A5438DCAd127a55d853E18a50","0x4B30Bb19FA4bC2C499398A4510905Af5A477f3C4","0xAb660231E51414E66276bF48D94a948047dA4ff7"]

    for (let i=0; i<wavGames.length; i++) {
      await wavGameProxy.setGame(wavGames[i].gameID, [wavGames[i].islands[0], wavGames[i].islands[1]])  
    }
    await wavGameProxy.setTreasuries(gameIDs, treasuries)
  }
 

};

module.exports.tags = ["WavGame"];