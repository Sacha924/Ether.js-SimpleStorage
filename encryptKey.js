//we're going to set this script up to run our encrypt key one time. And then we can remove our private key from anywhere in our workspace so that it's no longer in plain text anywhere. 
const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  //this encrypt function is going to return an encrypted JSON key that we can store locally and that we can only encrypt it with the password. And it takes two parameters. It takes a private key password and a private key.
  const encryptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD, process.env.PRIVATE_KEY);
  console.log(encryptedJsonKey);
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
