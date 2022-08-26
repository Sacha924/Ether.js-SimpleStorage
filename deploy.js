//synchronous [solidity]
// synchronous/asynchronous [javascrip]
//pending, fulfilled, rejected

const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  //http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  //his is the way that our script is going to connect to our local blockchain
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");git 
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedJson, process.env.PRIVATE_KEY_PASSWORD);
  //now we have to connect this wallet back to our provider. If you look here, we're not connecting our wallet with a provider. When we make our transactions with our contract factory, we need to make sure the wallet knows about the provider here. So we can just :
  // wallet = await wallet.connect(provider);

  //In order to deploy our contract, we're gonna need the ABI and we're going to need the binary compiled code of the contract.
  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf8");
  //Now that we have the binary, we have the ABI, we can create something called a contract factory, which is just an object that you can use to deploy contracts.
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait ...");
  //And we can actually deploy this contract with ethers by doing:
  const contract = await contractFactory.deploy(); //await --> we stop here, wait for contract to deploy
  //console.log(contract);
  //we can wait for a certain number of blocks for our contract finish with so we've deployed the contract. But maybe we want to wait one block to make sure it actually gets attached to the chain.
  await contract.deployTransaction.wait(1);
  console.log(`Contract adrress ${contract.address}`);

  let currentFavoriteNumber = await contract.retrieve();
  console.log(`Current favorite number : ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store(7);
  const transactionReceip = await transactionResponse.wait(1);
  //This is similar to us doing contract.deployTransaction.wait, the syntax here is a little bit different than what we saw uphere. Because this is using a contractFactory. And this is calling a function on a contract. So when we call the function on the contract, we get a transaction response. When we wait for the transaction response to finish, we get the transaction receipt.
  currentFavoriteNumber = await contract.retrieve();
  console.log(`New Favorite Number: ${currentFavoriteNumber}`);
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
