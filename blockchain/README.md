# WavGame Contracts

Welcome to the WavGame contract repository!

The WavGame contract is the on-chain engine that powers the Wav Game app, it handles the payment and minting of artists NFTs to fans in the game, as well as the burn and redeem process of of leveling up into a new island in an artist game.
Each artist game can have up to 6 islands / levels, with each islands having their unique configurations, including burnable and mintable NFTs.



### Deveoper Quickstart

Execute the following commands to get started:
```shell
npx hardhat compile
npx hardhat test
```

Most important contract on this repo is the WavGame.sol file, which is set to be the owner of the WavNFT contract, an ERC1155 contract that controls all artist NFTs minted. The below methods are contained in the WavGame contract:


`collect(address _gameID, address _recipient, NFTParam[] calldata _nfts):`

`_gameID`: *Unique identifier of an artist game i.e artist address*

`_recipient`: *Recipient to get the newly minted NFT.*

`_nfts`: *array of NFT ids and the amount to mint for level 1 of the artist game.*


Allow calls from all users, the collect method mints the given entry level (level 1) NFT amount to the given recipient's address. It ensures the given nfts are valid level 1 NFTs of the given artist game. Not designed to be gasless.
Users can only collect NFTs that have been whitelisted in the mintableSet of the level 1 island of the given game
There are omly two possible unique NFTs users can collect in this level for any of the artist game, to collect 
user has to send in MATIC equivalent to the amount of NFT to collect, besed on the feePerMint set in contract.


`levelUp(address _gameID, uint256 _islandID, NFTParam[] calldata _nfts)`

`_gameID`: *Unique identifier of an artist game i.e artist address*

`_islandID`: *Identifier for the new island/level to level-up to in an artist game i.e 1 - 6*

`_nfts`:* array of NFT ids and the amount to burn (Burn meet the required burn amount for the island)*

Allow calls from all users, but unlike ```collect``` levelUp is not a payable function, to level-up, user has to burn 2 NFTs from the previous level to get to the next level/island, where they receive the new island NFT. There is only 1 unique NFT a user can get in all other islands/levels above level 1(entry_level), and a user can only go from 1 level lower to 1 level higher, can't jump levels, based on the whitelisted burnableSet and mintableSet in each levels/islands.
This method can be called through a gasless relayer.


`setGame(address _gameID, IWavGame.IslandParam[] memory _islands)`

`_gameID`: *Unique identifier for the artist game to add or set more islands i.e artist address*

`_islands`: *An array of configurations for each islands to set on the artist game i.e no of NFTs required to burn inorder to levelup into this island, no of NFTs to be minted to user after burn, no of unique collectors
eligible for prizes on the island/level, an array of NFTs whitelisted for burning, array of NFTs whitelisted for 
mint on the islannd/level *

This is an admin only method, it allows an admin add games for the different artist and configure the islands in
an artist game. This method can be used to define a new game or add more islands/levels to a game. Artist games
and island should be configured after contract deployment to enable players engage with the smart contract.
This method doesn't validate configuration against existing games and islands, so admin must pay attention to
configurations passed, to be sure it doesn't disrupts the game flow.


`updateIsland(address _gameID, uint256 _islandID, IWavGame.IslandParam calldata _islandParam)`

`_gameID`: *Unique identifier for the artist game to update i.e artist address*

`_islandID`: *Unique identifier for the game island/level to update i.e level 1/2/3/4/5/6*

`_islandParam`: *Configurations for the island to update i.e Only populate fields you want to update, for other fields leave as empty values. *

This is an admin only method, it allows an admin update details of the given artist game and island.
This method doesn't validate configuration against existing games and islands, so admin must pay attention to
configurations passed, to be sure it doesn't disrupts the game flow.
Note that for burnable or mintableSets, you can remove an NFT from the burnable or mintableSet of an island by 
setting its status to false in the mintable or burnable set fields of the _islandParam


`setTreasuries(address[] calldata _gameIDs, address payable[] calldata _treasuries)`

`_gameIDs`: *Array of unique identifier for the artist games to set their treasury/payment contract address i.e artist address*

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





