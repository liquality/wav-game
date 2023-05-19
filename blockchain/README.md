# WavGame Suite of Contracts

Welcome to the WavGame contract repository!

The WavGame contract is the on-chain engine that powers the Wav Game app, it handles the payment and minting of artists NFTs to fans in the game, as well as the burn and redeem process of of leveling up into a new island in an artist game.
Each artist game can have up to 6 islands / levels, with each islands having their unique configurations, including burnable and mintable NFTs.

Deveoper Quickstart

Execute the following commands to get started:
```shell
npx hardhat compile
npx hardhat test
```

Most important contract on this repo is the WavGame.sol file, containing the 
following methods:

===== Important User Methods ===
```collect(address _gameID, address _recipient, NFTParam[] calldata _nfts)```:
```_gameID``` => Unique identifier of an artist game i.e artist address
```_recipient``` => Recipient to get the newly minted NFT.
```_nfts``` => array of NFT ids and the amount to mint for level 1 of the artist game.

Allow calls from all users, the collect method mints the given entry level (level 1) NFT amount to the given recipient's address. It ensures the given nfts are valid level 1 NFTs of the given artist game. Not designed to be gasless.
Users can only collect NFTs that have been whitelisted in the mintableSet of the level 1 island of the given game
There are omly two possible unique NFTs users can collect in this level for any of the artist game, to collect 
user has to send in MATIC equivalent to the amount of NFT to collect, besed on the feePerMint set in contract.

```levelUp(address _gameID, uint256 _islandID, NFTParam[] calldata _nfts)```:
```_gameID``` => Unique identifier of an artist game i.e artist address
```_islandID``` => Identifier for the new island/level to level-up to in an artist game i.e 1 - 6
```_nfts``` => array of NFT ids and the amount to burn (Burn meet the required burn amount for the island)

Unlike ```collect``` levelUp is not a payable function, to level up user has to burn 2 NFTs from the previous 
level to get to the next level/island, where they receive the new island NFT. There is only 1 unique NFT a user can get in all other islands/levels above level 1(entry_level), and a user can only go from 1 level lower to 1 level higher, can't jump levels, based on the whitelisted burnableSet and mintableSet in each levels/islands

===== Important Admin Methods ===
setGame
updateIsland
setPaymentContract
setTrustedForwarder
forwardValue
setFeePerMint
setRequiredBurn
setRequiredMint
setPrizeCutOff
setBurnableSet
setMintableSet







