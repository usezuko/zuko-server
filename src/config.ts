import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const arbGoerli = "https://arbitrum-goerli.public.blastapi.io";
const ethSepolia = "https://ethereum-sepolia.publicnode.com";

const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY || "");
const provider = getDefaultProvider(arbGoerli);
const signer = wallet.connect(provider);
const db = new Database({ signer });

export default db;
