// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {
  GelatoRelay,
  SponsoredCallERC2771Request,
} from "@gelatonetwork/relay-sdk";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  
  const relay = new GelatoRelay();
  // Set up on-chain variables, such as target address
const counter = "0xEEeBe2F778AA186e88dCf2FEb8f8231565769C27"; 
const abi = ["function incrementContext()"];
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const user = signer.getAddress();

// Generate the target payload
const contract = new ethers.Contract(counter, abi, signer);
const { data } = await contract.populateTransaction.incrementContext();

// Populate a relay request
const request: CallWithERC2771Request = {
  chainId: provider.network.chainId;
  target: counter;
  data: data;
  user: user;
};

const relayResponse = await relay.sponsoredCallERC2771(request, provider, apiKey);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
