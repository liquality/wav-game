import { ethers, upgrades } from 'hardhat';

module.exports = async ({ getChainId }) => {
  const chainId = await getChainId();

  console.log(`\n\n 📡 Deploying Contracts to ${chainId}...\n`);

  console.log(`\n\n 📡 Deploying wavNFT...\n`);
  const WavNFT = await ethers.getContractFactory("WavNFT");
  // Deploy WavNFT
  const wavNFT = await WavNFT.deploy(process.env.NFT_BASE_URI);

  console.log(' \n\n 📄', 'wavNFT', 'deployed to:', wavNFT.address);

  console.log(` \n\n 📡  Deploying: wavGame`);

  const WavGame = await ethers.getContractFactory('WavGame');

  // deploy with arguments, wavNFT address, trustedForwarder and feePerMint
  // using dummy values here for trusted Forwarder and feePerMint...you can call the setter functions for them later
  const wavGameProxy = await upgrades.deployProxy(WavGame, [
    wavNFT.address,
    process.env.TRUSTED_FORWARDER,
    ethers.utils.parseEther('0.0005'),
  ]);
  await wavGameProxy.deployed();

  const wavGameProxyAddress = wavGameProxy.address;
  const wavGameImplementationAddress = await upgrades.erc1967.getImplementationAddress(wavGameProxyAddress);
  const wavGameAdminAddress = await upgrades.erc1967.getAdminAddress(wavGameProxyAddress);

  console.log('\n\n 📄', 'wavGameProxy', 'deployed to:', wavGameProxyAddress);

  console.log(' \n\n 📄', 'wavGameImplementation', 'deployed to:', wavGameImplementationAddress);

  console.log(' \n\n 📄', 'wavGameAdmin', 'deployed to:', wavGameAdminAddress);

  console.log(` \n\n🛰  Setting up wavNFT: use wavGame as Trusted forwarder and Owner`);

  await wavNFT.setTrustedForwarder(process.env.TRUSTED_FORWARDER);
  await wavNFT.transferOwnership(wavGameProxyAddress);

  console.log(' \n\n ✅︎', 'Finished setting up wavNFT');

  console.log(` \n\n🛰  Setting up wavGame`);
  if (process.env.ENVIRONMENT == "staging") {
     // Test data
    const artistIDs = [1000,2000,3000,4000,5000,6000,7000,8000]
    const treasuries = ["0x80De31442Fb3ba4A5438DCAd127a55d853E18a50","0x4B30Bb19FA4bC2C499398A4510905Af5A477f3C4","0xAb660231E51414E66276bF48D94a948047dA4ff7","0x1F62E3BA0b119C3c9620071E0E5e0207bD57d71f","0xaf861917624337b95Af0545baE6CC9dd6a9e669b","0xa2AABd9935AB60972B73fe1Df7b87bEFf09134E3", "0x1f6A2b990f9B79B77920d48E97157f81E4A552BC", "0xBBAFAcA629ED61605b174E6afd50D324E1DE0C70"]

    for (let i=1; i<=artistIDs.length; i++) {
      await wavGameProxy.setArtistGame(i*1000, [
        [
          0,
          0,
          0,
          i*100 + 1,
          0
        ],
        [
          2,
          1,
          10,
          i*100 + 2,
          i*100 + 1
        ],
        [
          2,
          1,
          10,
          i*100 + 3,
          i*100 + 2
        ],
        [
          2,
          1,
          10,
          i*100 + 4,
          i*100 + 3
        ],
        [
          2,
          1,
          10,
          i*100 + 5,
          i*100 + 4
        ],
        [
          2,
          1,
          10,
          i*100 + 6,
          i*100 + 5
        ]])  
    }
    await wavGameProxy.setTreasuries(artistIDs, treasuries);
  }
  console.log(
    " \n\n ✅︎",
    "Setup complete for wavGame",
  );

};

module.exports.tags = ['WavGame'];
