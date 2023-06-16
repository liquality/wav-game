import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';

let wavNFT: any;
let wavGame: any;
const ENTRY_LEVEL = 1;
const feePerMint = ethers.utils.parseEther('1.0');
const trustedForwarder = '0xd8253782c45a12053594b9deB72d8e8aB2Fca54c';
const artist1GameID = 1000;
const artist2GameID = 2000;
const artist3GameID = 3000;

async function setup() {
  const WavNFT = await ethers.getContractFactory('WavNFT');
  // Deploy WavNFT
  wavNFT = await WavNFT.deploy('');

  const WavGame = await ethers.getContractFactory('WavGame');
  const wavGameProxy = await upgrades.deployProxy(WavGame, [wavNFT.address, trustedForwarder, feePerMint]);
  await wavGameProxy.deployed();
  wavGame = wavGameProxy;
  console.log('wavGame > ', wavGame.address, 'wavGameProxy >> ', wavGameProxy.address);

  await wavNFT.setTrustedForwarder(trustedForwarder);
  await wavNFT.transferOwnership(wavGame.address);
}

describe('WavGame Contract', async function () {
  // "Setup contract deplyment"
  this.beforeAll(setup);

  describe('Deployment', async function () {
    it('Should have deployed contract sucessfully', async function () {
      expect(await wavGame.wavNFT()).to.equal(wavNFT.address);
      expect(await wavGame.getFeePerMint()).to.equal(feePerMint);
      expect(await wavGame.getTrustedForwarder()).to.equal(trustedForwarder);
    });
  });
  // Game init:
  // Create all artist game;and populate levels
  describe('Game Init', async function () {
    it('Should set all artist game successfully', async function () {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[4].address;
      const artist2 = accounts[5].address;
      const artist3 = accounts[6].address;
      const artist1L1 = [0, 0, 0, 1, 0]; //[requiredBurn,requiredMint,earlyBirdCutOff,mintID,burnID]
      const artist1L2 = [2, 1, 2, 2, 1];
      const artist2L1 = [0, 0, 0, 3, 0];
      const artist2L2 = [2, 1, 2, 4, 3];
      const artist3L1 = [0, 0, 0, 5, 0];
      const artist3L2 = [2, 1, 2, 6, 5];
      expect(await wavGame.setArtistGame(artist1GameID, [artist1L1, artist1L2])).to.emit(wavGame, 'GameSet');
      expect(await wavGame.setArtistGame(artist2GameID, [artist2L1, artist2L2])).to.emit(wavGame, 'GameSet');
      expect(await wavGame.setArtistGame(artist3GameID, [artist3L1, artist3L2])).to.emit(wavGame, 'GameSet');
      await expect(
        wavGame.setTreasuries([artist1GameID, artist2GameID, artist3GameID], [artist1, artist2, artist3]),
      ).to.emit(wavGame, 'TreasurySet'); // For test, using gameId as a Treasury too

      const artist1GameL1 = await wavGame.getLevel(artist1GameID, 1);
      const artist2GameL2 = await wavGame.getLevel(artist2GameID, 2);

      expect(artist1GameL1.requiredBurn).to.equal(artist1L1[0]);
      expect(artist1GameL1.mintID).to.equal(artist1L1[3]);
      expect(artist2GameL2.requiredBurn).to.equal(artist2L2[0]);
      expect(artist2GameL2.mintID).to.equal(artist2L2[3]);
    });
  });

  describe('Collect: Enter game level 1 ', async function () {
    it('Should revert if insufficient value sent', async () => {
      const accounts = await ethers.getSigners();
      const player1 = accounts[7].address;

      await expect(
        wavGame.connect(accounts[9]).collect(artist1GameID, player1, 4, {
          value: feePerMint,
        }),
      ).to.be.revertedWithCustomError(wavGame, 'InsufficientPayment');
    });
    it('Should not mint NFT with zero amount', async () => {
      const accounts = await ethers.getSigners();
      const player1 = accounts[7].address;
      const prevbal = await wavNFT.balanceOf(player1, 12);

      await expect(
        wavGame.connect(accounts[7]).collect(artist3GameID, player1, 0, {
          value: feePerMint,
        }),
      ).to.be.revertedWithCustomError(wavGame, 'AmountCannotBeZero');
      expect((await wavNFT.balanceOf(player1, 12)) - prevbal).to.equal(0);
    });
    it('Should collect successfully with the right inputs', async () => {
      const accounts = await ethers.getSigners();
      const player1 = accounts[7].address;
      await expect(
        wavGame.connect(accounts[7]).collect(artist2GameID, player1, 3, {
          value: feePerMint.mul(ethers.BigNumber.from(3)),
        }),
      ).to.emit(wavGame, 'Collected');

      expect(await wavNFT.balanceOf(player1, 3)).to.equal(3); // Level 1 NFT ID for artist2 is 3
      expect((await wavGame.getLevel(artist2GameID, ENTRY_LEVEL)).mintCount).to.equal(3); // MintCount for level 1 (first game level) should increase
    });
  });

  describe('LevelUp Game', async () => {
    it('Should revert if level does exist', async () => {
      const nextLevel = 3; // level 3 has not been created for artist 1
      await expect(wavGame.levelUp(artist1GameID, nextLevel)).to.be.revertedWithCustomError(wavGame, 'LevelNotFound');
    });
    it('Should revert if required burn condition not met for next level', async () => {
      const accounts = await ethers.getSigners();
      const nextLevel = 2; // level 3 has not been created for artist 1
      await expect(
        wavGame.connect(accounts[9]).levelUp(artist1GameID, nextLevel), // Sending only one burnID
      )
        .to.be.revertedWithCustomError(wavGame, 'RequiredBurnNotMet')
        .withArgs(2);
      await expect(wavGame.connect(accounts[9]).levelUp(artist1GameID, nextLevel))
        .to.be.revertedWithCustomError(wavGame, 'RequiredBurnNotMet')
        .withArgs(2);
    });
    it('Should levelup successfully, if required burn condition is met', async () => {
      const accounts = await ethers.getSigners();
      const player1 = accounts[7].address;
      const nextLevel = 2;
      await wavNFT.connect(accounts[7]).setApprovalForAll(wavGame.address, true);

      expect(await wavNFT.isApprovedForAll(player1, wavGame.address)).to.equal(true);
      const prevbal1 = await wavNFT.balanceOf(player1, 3); // prevbal1 should equal 3, already collected in prev test

      await expect(wavGame.connect(accounts[7]).levelUp(artist2GameID, nextLevel)).to.emit(wavGame, 'LeveledUp');

      expect(prevbal1.sub(await wavNFT.balanceOf(player1, 3))).to.equal(2); // It should have burnt 2 NFTs
      expect(await wavNFT.balanceOf(player1, 4)).to.equal(1); // It should mint new level 2 NFT for artist2; id 4 is the mintID for level 2
      expect((await wavGame.getLevel(artist2GameID, nextLevel)).mintCount).to.equal(1); // MintCount for level 1 should increase
      expect((await wavGame.getLevel(artist2GameID, nextLevel - 1)).burnCount).to.equal(2); // burn count for level 1 should increase by 2, since 2 level1 NFTs were burnt for level2's
      expect((await wavGame.fetchEarlyBirdCollectors(artist2GameID, nextLevel)).length).to.equal(1); // Expect prizedCollector count to increase
    });
  });

  describe('Prized collectors', async () => {
    it('Should only count unique collectors per level per artist/game', async () => {
      const accounts = await ethers.getSigners();
      const player2 = accounts[8].address;
      const nextLevel = 2;
      const prevCollectorCount = (await wavGame.fetchEarlyBirdCollectors(artist1GameID, ENTRY_LEVEL)).length;

      await wavGame.connect(accounts[8]).collect(artist1GameID, player2, 4, {
        value: feePerMint.mul(ethers.BigNumber.from(4)),
      });
      await wavGame.connect(accounts[8]).collect(artist1GameID, player2, 6, {
        value: feePerMint.mul(ethers.BigNumber.from(6)),
      });

      await wavNFT.connect(accounts[8]).setApprovalForAll(wavGame.address, true);

      await wavGame.connect(accounts[8]).levelUp(artist1GameID, nextLevel);
      await wavGame.connect(accounts[8]).levelUp(artist1GameID, nextLevel);

      expect((await wavGame.fetchEarlyBirdCollectors(artist1GameID, nextLevel)).length - prevCollectorCount).to.equal(
        1,
      ); // Expect prizedCollector count to increase by 1 only, Since same user, entered same level (2) twice
    });
    it('Should not increase prizedCollectors count after prizeCutoff', async () => {
      const accounts = await ethers.getSigners();
      const player1 = accounts[7].address;
      const player2 = accounts[8].address;
      const player3 = accounts[9].address;
      const prizeCutoff = 2;
      const nextLevel = 2;

      await wavNFT.connect(accounts[7]).setApprovalForAll(wavGame.address, true);
      await wavNFT.connect(accounts[8]).setApprovalForAll(wavGame.address, true);
      await wavNFT.connect(accounts[9]).setApprovalForAll(wavGame.address, true);

      await wavGame.connect(accounts[7]).collect(artist3GameID, player1, 2, {
        value: feePerMint.mul(ethers.BigNumber.from(2)),
      });
      await wavGame.connect(accounts[8]).collect(artist3GameID, player2, 2, {
        value: feePerMint.mul(ethers.BigNumber.from(2)),
      });
      await wavGame.connect(accounts[9]).collect(artist3GameID, player3, 2, {
        value: feePerMint.mul(ethers.BigNumber.from(2)),
      });

      await wavGame.connect(accounts[7]).levelUp(artist3GameID, nextLevel);
      await wavGame.connect(accounts[8]).levelUp(artist3GameID, nextLevel);
      await wavGame.connect(accounts[9]).levelUp(artist3GameID, nextLevel);

      expect((await wavGame.fetchEarlyBirdCollectors(artist3GameID, nextLevel)).length).to.equal(prizeCutoff); // prizeCutoff is 2, 3 unique players are leving up to level 2 of artist 3, prizedCollectors can only be 2 and not more
    });
  });

  describe('Game administration', async () => {
    it('should only allow admin set details', async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[4].address;
      const player1 = accounts[7].address;
      const artist1L1 = [1, 0, 0, 1, 0];
      await expect(
        wavGame.connect(accounts[7]).setFeePerMint(ethers.utils.parseEther('2.0')), // owner is accounts[0]
      ).to.revertedWith('Ownable: caller is not the owner');
      await expect(wavGame.connect(accounts[5]).setTreasuries([artist1GameID], [artist1])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      await expect(wavGame.connect(accounts[5]).setTrustedForwarder(trustedForwarder)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      await expect(wavGame.connect(accounts[5]).setArtistGame(artist1, [artist1L1])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      await expect(wavGame.connect(accounts[5]).updateLevel(artist1, ENTRY_LEVEL, artist1L1)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      await expect(wavGame.connect(accounts[5]).wavMint(player1, ENTRY_LEVEL, artist1, 2)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      await expect(wavGame.connect(accounts[5]).mint(player1, 1, 2)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      await expect(wavGame.connect(accounts[5]).batchMint(player1, [1], [2])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('Should send complete payment to payment address when forwardValue is called', async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[4].address;
      const artist2 = accounts[5].address;
      const artist3 = accounts[6].address;

      const prevBal1 = await ethers.provider.getBalance(artist1);
      const prevBal2 = await ethers.provider.getBalance(artist2);
      const prevBal3 = await ethers.provider.getBalance(artist3);

      const pendingPayment1 = await wavGame.getBalance(artist1GameID);
      const pendingPayment2 = await wavGame.getBalance(artist2GameID);
      const pendingPayment3 = await wavGame.getBalance(artist3GameID);

      await expect(wavGame.forwardValue()).to.emit(wavGame, 'PaymentForwarded');

      expect((await ethers.provider.getBalance(artist1)).sub(prevBal1)).to.equal(
        pendingPayment1, // Sum total in contract for payments on artist 1 NFTs
      );
      expect((await ethers.provider.getBalance(artist2)).sub(prevBal2)).to.equal(
        pendingPayment2, // Sum total in contract for payments on artist 2 NFTs
      );
      expect((await ethers.provider.getBalance(artist3)).sub(prevBal3)).to.equal(
        pendingPayment3, // Sum total in contract for payments on artist 3 NFTs
      );
    });

    it('should update game level info correctly per artist ', async () => {
      const artist1L1 = [1, 0, 0, 1, 0];
      await expect(wavGame.updateLevel(artist1GameID, ENTRY_LEVEL, artist1L1)).to.emit(wavGame, 'LevelUpdated');
      expect((await wavGame.getLevel(artist1GameID, ENTRY_LEVEL)).requiredBurn).to.equal(1); // Updated requiredBurn to 1 above
    });
    it('should special mint successfully', async () => {
      const accounts = await ethers.getSigners();
      const player1 = accounts[7].address;
      const prevbal = await wavNFT.balanceOf(player1, 1);
      await expect(wavGame.wavMint(artist1GameID, ENTRY_LEVEL, player1, 2)).to.emit(wavGame, 'SpecialMint');
      expect((await wavNFT.balanceOf(player1, 1)) - prevbal).to.equal(2);
    });
  });
});
