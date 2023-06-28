import { ethers, upgrades } from 'hardhat';
import { WavNFT__factory } from '../typechain-types/factories/contracts/WavNFT__factory';
import { AddressZero } from '@ethersproject/constants';
import { WavGame__factory } from '../typechain-types';

module.exports = async ({ getChainId }: { getChainId: () => Promise<number> }) => {
  const chainId = await getChainId();

  console.log(`\n\n 📡 Deploying Contracts to ${chainId}...\n`);

  console.log(`\n\n 📡 Deploying wavNFT...\n`);
  const WavNFT = await ethers.getContractFactory('WavNFT');
  // Deploy WavNFT
  const wavNFT = await WavNFT.deploy(String(process.env.NFT_BASE_URI));
  await wavNFT.deployed();

  console.log(' \n\n 📄', 'wavNFT', 'deployed to:', wavNFT.address);

  console.log(` \n\n 📡  Deploying: wavGame`);

  const signers = await ethers.getSigners();

  // const wavNFT = WavNFT__factory.connect(AddressZero, signers[0]).attach(process.env.CURRENT_WAV_NFT as string);

  const wavGameProxy = WavGame__factory.connect(AddressZero, signers[0]).attach(
    process.env.CURRENT_WAVGAME_PROXY as string,
  );
  const wavGameProxyAddress = wavGameProxy.address;
  await (await wavGameProxy.setWavNFT(wavNFT.address)).wait();

  // const WavGame = await ethers.getContractFactory('WavGame');

  // deploy with arguments, wavNFT address, trustedForwarder and feePerMint
  // using dummy values here for trusted Forwarder and feePerMint...you can call the setter functions for them later
  // const wavGameProxy = await upgrades.deployProxy(WavGame, [
  //   wavNFT.address,
  //   process.env.TRUSTED_FORWARDER,
  //   ethers.utils.parseEther('0.005'),
  // ]);
  // await wavGameProxy.deployed();

  // const wavGameProxyAddress = wavGameProxy.address;
  // const wavGameImplementationAddress = await upgrades.erc1967.getImplementationAddress(wavGameProxyAddress);
  // const wavGameAdminAddress = await upgrades.erc1967.getAdminAddress(wavGameProxyAddress);

  // console.log('\n\n 📄', 'wavGameProxy', 'deployed to:', wavGameProxyAddress);

  // console.log(' \n\n 📄', 'wavGameImplementation', 'deployed to:', wavGameImplementationAddress);

  // console.log(' \n\n 📄', 'wavGameAdmin', 'deployed to:', wavGameAdminAddress);

  // console.log(` \n\n🛰  Setting up wavNFT: use wavGame as Trusted forwarder and Owner`);

  const tx1 = await wavNFT.setTrustedForwarder(String(process.env.TRUSTED_FORWARDER));
  await tx1.wait();
  const tx2 = await wavNFT.transferOwnership(wavGameProxyAddress);
  await tx2.wait();

  console.log(' \n\n ✅︎', 'Finished setting up wavNFT');

  console.log(` \n\n🛰  Setting up wavGame`);
  let artistIDs: Array<number>;
  let treasuries: Array<string>;

  if (process.env.ENVIRONMENT == 'staging') {
    // Test data
    artistIDs = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
    treasuries = [
      '0x80De31442Fb3ba4A5438DCAd127a55d853E18a50',
      '0x4B30Bb19FA4bC2C499398A4510905Af5A477f3C4',
      '0xAb660231E51414E66276bF48D94a948047dA4ff7',
      '0x1F62E3BA0b119C3c9620071E0E5e0207bD57d71f',
      '0xaf861917624337b95Af0545baE6CC9dd6a9e669b',
      '0xa2AABd9935AB60972B73fe1Df7b87bEFf09134E3',
      '0x1f6A2b990f9B79B77920d48E97157f81E4A552BC',
      '0xBBAFAcA629ED61605b174E6afd50D324E1DE0C70',
    ];
  } else {
    artistIDs = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
    treasuries = [
      '0xEE79ccB10Fb4710dc8ba5a20F0F21cC420B50dd0',
      '0x14A3552821c00cAE3Ae99762aEdA5415800D0CA5',
      '0x53057261bab15847e4Ca94E9871E15a4DD496EAc',
      '0xBb8A08A2069e1C4dA8E0ef963015b06988e8FA34',
      '0xA860fc78c0EB0595d0C3dfC74aEC596c27aE47aA',
      '0xe8900f55Cc828d4DD2912Bc730D105f6f26D505b',
      '0x27143d4cD03a7Ce75F1F8429E76d81bbaB34AbD7',
      '0x5D471A25eC5d5a7fF5f22408b0E1B6A5a1f093bE',
    ];
  }

  for (let i = 1; i <= artistIDs.length; i++) {
    const tx = await wavGameProxy.setArtistGame(i * 1000, [
      {
        requiredBurn: 0,
        requiredMint: 0,
        earlyBirdCutOff: 0,
        mintID: i * 100 + 1,
        burnID: 0,
      },
      {
        requiredBurn: 2,
        requiredMint: 1,
        earlyBirdCutOff: 10,
        mintID: i * 100 + 2,
        burnID: i * 100 + 1,
      },
      {
        requiredBurn: 2,
        requiredMint: 1,
        earlyBirdCutOff: 10,
        mintID: i * 100 + 3,
        burnID: i * 100 + 2,
      },
      {
        requiredBurn: 2,
        requiredMint: 1,
        earlyBirdCutOff: 10,
        mintID: i * 100 + 4,
        burnID: i * 100 + 3,
      },
      {
        requiredBurn: 2,
        requiredMint: 1,
        earlyBirdCutOff: 10,
        mintID: i * 100 + 5,
        burnID: i * 100 + 4,
      },
      {
        requiredBurn: 2,
        requiredMint: 1,
        earlyBirdCutOff: 10,
        mintID: i * 100 + 6,
        burnID: i * 100 + 5,
      },
      {
        requiredBurn: 2,
        requiredMint: 1,
        earlyBirdCutOff: 10,
        mintID: i * 100 + 7,
        burnID: i * 100 + 6,
      },
      {
        requiredBurn: 2,
        requiredMint: 1,
        earlyBirdCutOff: 10,
        mintID: i * 100 + 8,
        burnID: i * 100 + 7,
      },
    ]);
    await tx.wait();
  }
  await wavGameProxy.setTreasuries(artistIDs, treasuries);

  console.log(' \n\n ✅︎', 'Setup complete for wavGame');
};

module.exports.tags = ['WavGame'];