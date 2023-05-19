import { expect } from "chai";
import { ethers } from "hardhat";
import { it } from "mocha";

let wavNFT: any;
let wavGame: any;
const ENTRY_LEVEL = 1;
const feePerMint = ethers.utils.parseEther("1.0");
const trustedForwarder = "0xd8253782c45a12053594b9deB72d8e8aB2Fca54c"

async function setup() {
  const WavNFT = await ethers.getContractFactory("WavNFT");
  wavNFT = await WavNFT.deploy(
    "https://remix.ethereum.org/",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );

  const WavGame = await ethers.getContractFactory("WavGame");
  wavGame = await WavGame.deploy(
    wavNFT.address,
    trustedForwarder,
    feePerMint.toString()
  );

  await wavNFT.transferOwnership(wavGame.address);
}

describe("WavGame Contract", async function () {
  // "Setup contract deplyment"
  this.beforeAll(setup);

  describe("Deployment", async function () {
    it("Should have deployed contract sucessfully", async function () {
      expect(await wavGame.wavNFT()).to.equal(wavNFT.address);
      expect(await wavGame.getFeePerMint()).to.equal(feePerMint);
      expect(await wavGame.getTrustedForwarder()).to.equal(trustedForwarder);
    });
  });
  // Game init:
  // Create all artist game; set payment contracts; and populate islands
  describe("Game Init", async function () {
    it("Should set all artist game successfully", async function () {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const artist2 = accounts[6].address;
      const artist3 = accounts[4].address;
      const artist1L1 = [
        0,
        0,
        0,
        [],
        [
          [true, 1],
          [true, 2],
        ],
      ];
      const artist1L2 = [
        2,
        1,
        2,
        [
          [true, 1],
          [true, 2],
        ],
        [[true, 3]],
      ];
      const artist2L1 = [
        0,
        0,
        0,
        [],
        [
          [true, 8],
          [true, 9],
        ],
      ];
      const artist2L2 = [
        2,
        1,
        2,
        [
          [true, 8],
          [true, 9],
        ],
        [[true, 10]],
      ];
      const artist3L1 = [
        0,
        0,
        0,
        [],
        [
          [true, 11],
          [true, 12],
        ],
      ];
      const artist3L2 = [
        2,
        1,
        2,
        [
          [true, 11],
          [true, 12],
        ],
        [[true, 13]],
      ];
      expect(await wavGame.setGame(artist1, [artist1L1, artist1L2])).to.emit(
        wavGame,
        "GameSet"
      );
      expect(await wavGame.setGame(artist2, [artist2L1, artist2L2])).to.emit(
        wavGame,
        "GameSet"
      );
      expect(await wavGame.setGame(artist3, [artist3L1, artist3L2])).to.emit(
        wavGame,
        "GameSet"
      );
      await expect(wavGame.setTreasuries([artist1,artist2,artist3],[artist1,artist2,artist3])).to.emit(wavGame,"TreasurySet") // For test, using gameId as a Treasury too

      const artist1GameL1 = await wavGame.getIsland(artist1, 1);
      const artist2GameL2 = await wavGame.getIsland(artist2, 2);
  
      expect(artist1GameL1[0].requiredBurn).to.equal(artist1L1[0]);
      expect(artist1GameL1[2].map((bn: any) => parseInt(bn.toString(), 10))).to.contains(1);
      expect(artist1GameL1[2].map((bn: any) => parseInt(bn.toString(), 10))).to.contains(2);
      expect(artist2GameL2[0].requiredBurn).to.equal(artist2L2[0]);
      expect(artist2GameL2[2].map((bn: any) => parseInt(bn.toString(), 10))).to.contains(10);
    });
  });

  describe("Collect: Enter game island 1 ", async function () {
    it("Should revert if insufficient value sent", async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const player1 = accounts[9].address;

      await expect(
        wavGame.connect(accounts[9]).collect(
          artist1,
          player1,
          [
            [1, 2],
            [2, 2],
          ],
          {
            value: feePerMint,
          }
        )
      ).to.revertedWith("InsufficientPayment(4000000000000000000, 1000000000000000000)");
    });
    it("Should not mint NFT with zero amount", async () => {
      const accounts = await ethers.getSigners();
      const artist3 = accounts[4].address;
      const player1 = accounts[9].address;
      const prevbal = await wavNFT.balanceOf(player1,12);

      await expect(
        wavGame.connect(accounts[9]).collect(
          artist3,
          player1,
          [
            [12, 0],
          ],
          {
            value: feePerMint,
          }
        )
      ).to.emit(wavGame,"Collected");
      expect((await wavNFT.balanceOf(player1,12)) - prevbal).to.equal(0)

    });
    it("Should collect successfully with the right inputs", async () => {
      const accounts = await ethers.getSigners();
      const artist2 = accounts[6].address;
      const player1 = accounts[9].address;
      await expect(
        wavGame.connect(accounts[9]).collect(artist2, player1, [[9, 3]], {
          value: feePerMint.mul(ethers.BigNumber.from(3)),
        })
      ).to.emit(wavGame, "Collected");

      expect(await wavNFT.balanceOf(player1, 9)).to.equal(3);
      expect(
        (await wavGame.getIsland(artist2, ENTRY_LEVEL))[0].mintCount
      ).to.equal(3); // MintCount for level 1 (first game island) should increase
    });
    it("Should only work for only whitelisted entry level 1 IDs", async () => {
      const accounts = await ethers.getSigners();
      const artist2 = accounts[6].address;
      const player1 = accounts[9].address;

      await expect(
        wavGame.connect(accounts[9]).collect(
          artist2,
          player1,
          [
            [10, 2], // 10 is whitelisted for island 2 not island 1
          ],
          {
            value: feePerMint,
          }
        )
      ).to.revertedWith("NFTNotInMintableSet(10, 1)");
      await expect(
        wavGame.connect(accounts[9]).collect(artist2, player1, [[8, 2]], {
          value: feePerMint.mul(ethers.BigNumber.from(2)),
        })
      ).to.emit(wavGame, "Collected");
    });
  });

  describe("LevelUp Game", async () => {
    it("Should revert if island does exist", async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const nextIsland = 3; // island 3 has not been created for artist 1
      await expect(
        wavGame.levelUp(artist1, nextIsland, [[1, 0]])
      ).to.revertedWith("IslandNotFound()");
    });
    it("Should revert if required burn condition not met for next island", async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const nextIsland = 2; // Island 3 has not been created for artist 1
      const player1 = accounts[9].address;
      await expect(
        wavGame.connect(accounts[9]).levelUp(artist1, nextIsland, [[1, 0]]) // Sending only one burnable id
      ).to.revertedWith("RequiredBurnNotMet(2)");
      await expect(
        wavGame.connect(accounts[9]).levelUp(artist1, nextIsland, [
          [1, 0],
          [8, 0], // Sending only one valid burnable id for nextIsland, 8 is not a valid burnable id for artist 1, island 2
        ])
      ).to.revertedWith("RequiredBurnNotMet(2)");
    });
    it("Should levelup successfully, if required burn condition is met", async () => {
      const accounts = await ethers.getSigners();
      const artist2 = accounts[6].address;
      const player1 = accounts[9].address;
      const nextIsland = 2;
      await wavNFT
        .connect(accounts[9])
        .setApprovalForAll(wavGame.address, true);

      expect(
        await wavNFT.isApprovedForAll(player1, wavGame.address)
      ).to.equal(true);
       
      const prevbal1 = await wavNFT.balanceOf(player1, 8);
      const prevbal2 = await wavNFT.balanceOf(player1, 9);
      await expect(
        wavGame.connect(accounts[9]).levelUp(artist2, nextIsland, [
          [8, 1],
          [9, 1],
        ])
      ).to.emit(wavGame, "LeveledUp");

      expect(prevbal1.sub((await wavNFT.balanceOf(player1, 8)))).to.equal(1); // It should have burnt the NFTs
      expect(prevbal2.sub((await wavNFT.balanceOf(player1, 9)))).to.equal(1);
      expect(await wavNFT.balanceOf(player1, 10)).to.equal(1); // It shoul dmint new island 2 NFT for artist2; id 10 is the mintable for island 2
      expect(
        (await wavGame.getIsland(artist2, nextIsland))[0].mintCount
      ).to.equal(1); // MintCount for level 1 should increase
      expect(
        (await wavGame.getIsland(artist2, nextIsland-1))[0].burnCount
      ).to.equal(2); // burn count for level 1 should increase by 2, since 2 level1 NFTs were burnt for level2's
      expect(
        (await wavGame.fetchPrizedCollectors(artist2, nextIsland)).length
      ).to.equal(1); // Expect prizedCollector count to increase
    });
  });

  describe("Prized collectors", async () => {
    it("Should only count unique collectors per island per artist/game", async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const player1 = accounts[9].address;
      const nextIsland = 2;
      const prevCollectorCount = (await wavGame.fetchPrizedCollectors(artist1, ENTRY_LEVEL)).length

      await wavGame.connect(accounts[9]).collect(artist1, player1, [[1, 3], [2, 3]], {
        value: feePerMint.mul(ethers.BigNumber.from(6)),
      })
      await wavGame.connect(accounts[9]).levelUp(artist1, nextIsland, [[1, 2]])
      await wavGame.connect(accounts[9]).levelUp(artist1, nextIsland, [[2, 2]])

      expect(
        (await wavGame.fetchPrizedCollectors(artist1, nextIsland)).length - prevCollectorCount
      ).to.equal(1); // Expect prizedCollector count to increase by 1 only, Since same user, entered same island (2) twice
    });
    it("Should not increase prizedCollectors count after prizeCutoff", async () => {
      const accounts = await ethers.getSigners();
      const prizeCutoff = 2;
      const artist3 = accounts[4].address;
      const player1 = accounts[9].address;
      const player2 = accounts[8].address;
      const player3 = accounts[7].address;
      const nextIsland = 2;

      await wavNFT
        .connect(accounts[8])
        .setApprovalForAll(wavGame.address, true);
      await wavNFT
        .connect(accounts[7])
        .setApprovalForAll(wavGame.address, true);

      await wavGame
        .connect(accounts[9])
        .collect(artist3, player1, [[11, 2]], {
          value: feePerMint.mul(ethers.BigNumber.from(2)),
        });
      await wavGame
        .connect(accounts[8])
        .collect(artist3, player2, [[11, 2]], {
          value: feePerMint.mul(ethers.BigNumber.from(2)),
        });
      await wavGame
        .connect(accounts[7])
        .collect(artist3, player3, [[11, 2]], {
          value: feePerMint.mul(ethers.BigNumber.from(2)),
      });

      await wavGame
        .connect(accounts[9])
        .levelUp(artist3, nextIsland, [[11, 2]]);
      await wavGame
        .connect(accounts[8])
        .levelUp(artist3, nextIsland, [[11, 2]]);
      await wavGame
        .connect(accounts[7])
        .levelUp(artist3, nextIsland, [[11, 2]]);

      expect(
        (await wavGame.fetchPrizedCollectors(artist3, nextIsland)).length
      ).to.equal(prizeCutoff); // prizeCutoff is 2, 3 unique players are leving up to island 2 of artist 3, prizedCollectors can only be 2 and not more
    });
  });

  describe("Game administration", async () => {

    it("should only allow admin set details", async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const player1 = accounts[9].address;
      const artist1L1 = [
        1,
        0,
        0,
        [],
        [
          [true, 1, 0],
          [true, 2, 0],
        ],
      ];
      await expect(
        wavGame.connect(accounts[5]).setFeePerMint(ethers.utils.parseEther("2.0")) // owner is accounts[0]
      ).to.revertedWith("Ownable: caller is not the owner");
      await expect(
        wavGame.connect(accounts[5]).setTreasuries([artist1],[artist1])
      ).to.revertedWith("Ownable: caller is not the owner");
      await expect(
        wavGame.connect(accounts[5]).setTrustedForwarder(artist1)
      ).to.revertedWith("Ownable: caller is not the owner");
      await expect(
        wavGame.connect(accounts[5]).setGame(artist1, [artist1L1])
      ).to.revertedWith("Ownable: caller is not the owner");
      await expect(
        wavGame.connect(accounts[5]).updateIsland(artist1, ENTRY_LEVEL, artist1L1)
      ).to.revertedWith("Ownable: caller is not the owner");
      await expect(
        wavGame.connect(accounts[5]).wavMint(player1, artist1, ENTRY_LEVEL, 1, 2)
      ).to.revertedWith("Ownable: caller is not the owner");
      await expect(
        wavGame.connect(accounts[5]).mint(player1, 1, 2)
      ).to.revertedWith("Ownable: caller is not the owner");
      await expect(
        wavGame.connect(accounts[5]).batchMint(player1, [1], [2])
      ).to.revertedWith("Ownable: caller is not the owner");
    })

    it("Should send complete payment to payment address when forwardValue is called", async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const artist2 = accounts[6].address;
      const artist3 = accounts[4].address;

      const prevBal1 = await ethers.provider.getBalance(artist1);
      const prevBal2 = await ethers.provider.getBalance(artist2);
      const prevBal3 = await ethers.provider.getBalance(artist3);
      
      const pendingPayment1 = await wavGame.getBalance(artist1);
      const pendingPayment2 = await wavGame.getBalance(artist2);
      const pendingPayment3 = await wavGame.getBalance(artist3);

      await expect(
        wavGame.forwardValue()
      ).to.emit(wavGame, "PaymentForwarded");

      expect((await ethers.provider.getBalance(artist1)).sub(prevBal1)).to.equal(
        pendingPayment1 // Sum total in contract for payments on artist 1 NFTs
      );
      expect((await ethers.provider.getBalance(artist2)).sub(prevBal2)).to.equal(
        pendingPayment2 // Sum total in contract for payments on artist 2 NFTs
      );
      expect((await ethers.provider.getBalance(artist3)).sub(prevBal3)).to.equal(
        pendingPayment3 // Sum total in contract for payments on artist 3 NFTs
      );

    });

    it("should update game island info correctly per artist ", async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const artist1L1 = [
        1,
        0,
        0,
        [],
        [
          [true, 1, 0],
          [true, 2, 0],
        ],
      ];
      await expect(
        wavGame.updateIsland(artist1, ENTRY_LEVEL, artist1L1)
      ).to.emit(wavGame, "IslandUpdated");
      expect((await wavGame.getIsland(artist1, ENTRY_LEVEL))[0].requiredBurn).to.equal(1); // Updated requiredBurn to 1 above
    })
    it("should special mint successfully", async () => {
      const accounts = await ethers.getSigners();
      const artist1 = accounts[5].address;
      const player1 = accounts[9].address;
      const prevbal = await wavNFT.balanceOf(player1, 1);
      await expect(
        wavGame.wavMint(player1, artist1, ENTRY_LEVEL, 1, 2)
      ).to.emit(wavGame, "SpecialMint");
      expect((await wavNFT.balanceOf(player1, 1)) - prevbal).to.equal(2);
    })
  });
});
