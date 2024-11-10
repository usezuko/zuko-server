import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const arbSepolia = "https://sepolia-rollup.arbitrum.io/rpc";
const ethSepolia = "https://ethereum-sepolia.publicnode.com";

const privateKey = process.env.WALLET_PRIVATE_KEY;
if (!privateKey) {
  throw new Error("WALLET_PRIVATE_KEY is not set");
}
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider(arbSepolia);
const signer = wallet.connect(provider);
const db = new Database({ signer });

export default db;
