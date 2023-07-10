import 'ethers';
import { HardhatUserConfig } from 'hardhat/config';

import '@nomiclabs/hardhat-etherscan';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-deploy';
import * as dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: process.env.DEFAULT_NETWORK,
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    polygonMumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    polygonMainnet: {
      url: process.env.POLYGON_RPC,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY as string,
  },
};

export default config;
