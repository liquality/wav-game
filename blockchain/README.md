# WavGame Contracts

Welcome to the WavGame contract repository!

The WavGame contract is the on-chain engine that powers the Wav Game app, it handles the payment and minting of artists NFTs to fans in the game, as well as the burn and redeem process of of leveling up into a new level in an artist game.
Each artist game can have up to 8 levels, with each levels having their unique configurations, including mint and burn NFT.



### Deveoper Quickstart

Execute the following commands to get started:
```shell
npx hardhat compile
npx hardhat test
```

Most important contract on this repo is the WavGame.sol file, which is set to be the owner of the WavNFT contract, an ERC1155 contract that controls all artist NFTs minted. The below methods are contained in the WavGame contract:


`collect(address _artistID, address _recipient, _amount):`

`_artistID`: *Unique identifier of an artist game i.e artist address*

`_recipient`: *Recipient to get the newly minted NFT.*

`_nfts`: Number of level 1 NFTs to mint


Allow calls from all users, the collect method mints the given entry level (level 1) NFT amount to the given recipient's address. It ensures the given nfts are valid level 1 NFTs of the given artist game. Not designed to be gasless.
Users can only collect the NFT that have been configured in the level 1 level settings of the given game
There is omly 1 possible unique NFT users can collect in level1 of any of the artist game, to collect 
user has to send in MATIC equivalent to the amount of NFT to collect, besed on the feePerMint set in contract.


`levelUp(address _artistID_, uint256 _levelID)`

`_artistID_`: *Unique identifier of an artist game*

`_levelID`: *Identifier for the new level to level-up to in an artist game i.e 1 - 8*

Allow calls from all users, but unlike ```collect``` levelUp is not a payable function, to level-up, user has to burn 2 NFTs from the previous level to get to the next level, where they receive the new level NFT, there can be only 1 unique NFT per artist on all levels, and a user can only go from 1 level lower to 1 level higher, can't jump levels, based on the whitelisted burn NFT and mint NFT in each levels.
This method can be called through a gasless relayer.


`setArtistGame(address _artistID, IWavGame.LevelParam[] memory _levels)`

`_artistID`: *Unique identifier for the artist game*

`_levels`: *An array of configurations for each levels to set on the artist game i.e number of NFTs required to burn inorder to levelup into this level, number of NFTs to be minted to user after burn, number of unique collectors
eligible for prizes on the level, NFT whitelisted for burning, NFT whitelisted for 
mint on the level *

This is an admin only method, it allows an admin add games for the different artist and configure the levels in
an artist game. This method can be used to define a new game or add more levels to a game. Artist games
and levels should be configured after contract deployment to enable players engage with the smart contract.
This method doesn't validate configuration against existing games and levels, so admin must pay attention to
configurations passed, to be sure it doesn't disrupts the game flow.


`updateLevel(address _artistID, uint256 _levelID, IWavGame.LevelParam calldata _levelParam)`

`_artistID`: *Unique identifier for the artist game to update i.e artist address*

`_levelID`: *Unique identifier for the game level to update i.e level 1/2/3/4/5/6*

`_levelParam`: *Configurations for the level to update i.e Only populate fields you want to update, for other fields leave as empty values. *

This is an admin only method, it allows an admin update details of the given artist game and level.
This method doesn't validate configuration against existing games and levels, so admin must pay attention to
configurations passed, to be sure it doesn't disrupts the game flow.


`setTreasuries(address[] calldata _artistIDs, address payable[] calldata _treasuries)`

`_artistIDs`: *Array of unique identifier for the artist games to set their treasury/payment contract address i.e artist address*

`_treasuries`: *Array of payable contract addresses to set as the treasury/payment contract address for the respective artist games i.e Address of the artist payment splitter on Reveel protocol*

This is an admin only method and should be done during contract configuration after deployment.


`forwardValue()`

This method is an admin only method and accespts no parameter. It performs a flush operation on all funds held on
the WavGame contract, by forwarding the % of the contract funds contributed by each artist NFT mints to their
independent treasury/splitting contracts set for each artist game, where the the funds will be splitted accordingly amonsgt parties.


`setFeePerMint(uint256  _feePerMint)`

`_feePerMint`: *Fee in in Wei for minting a level 1 NFT, this fee applies to all artist game*

This method is an admin only method.


`setTrustedForwarder(address _trustedForwarder)`

`_trustedForwarder`: *Address of trusted forwarder for gasless relayer i.e Address of Gelato gasless forwarder on MATIC*

This method is an admin only method, ensure trustedForwarded is a trusted and valid address. 





