//synchronous [solidity]
// synchronous/asynchronous [javascrip]
//pending, fulfilled, rejected

const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  //http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
  //his is the way that our script is going to connect to our local blockchain
  const wallet = new ethers.Wallet("87550d8bf0a06dcf8f343f9a4d3faf36e717440a0495e33b2bb1533a80f50578", provider);
  // Now pasting our private key directly into our code is a huge NO. It's okay right now, since we're just using one of the ganache private keys, and we have no risk of having any money associated with this account.

  //In order to deploy our contract, we're gonna need the ABI and we're going to need the binary compiled code of the contract.
  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8");
  //Now that we have the binary, we have the ABI, we can create something called a contract factory, which is just an object that you can use to deploy contracts.
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait ...");
  //And we can actually deploy this contract with ethers by doing:
  const contract = await contractFactory.deploy(); //await --> we stop here, wait for contract to deploy
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/*
 Yarn : package manager, like npm
  Yarn télécharge les paquets en parallèle, tandis que Npm les télécharge les uns à la suite des autres. Ainsi, plus un projet possède de dépendances, plus Yarn se démarquera en terme de rapidité.
 */
