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

const configDb = {
  database_connection: {
    host: "localhost",
    user: "group_mints",
    database: "group_mints",
    password: "1q2w3e",
    port: 3306,
  },
};

export default db;
