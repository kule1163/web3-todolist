const hre = require("hardhat");

async function main() {
  // Get the deployer's signer account
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer?.address);

  // Deploy the ToDoList contract
  const toDoList = await hre.ethers.deployContract("ToDoList");

  // Get the address of the deployed ToDoList contract
  const toDoAddress = await toDoList.getAddress();

  console.log("Contract deployed at address:", toDoAddress);
}

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
