# Express Typescript Server

Zuko server to build Tableland API with Express and TypeScript.

## API Docs

https://documenter.getpostman.com/view/24722250/2s9YR6ZtJc

## Run Locally

Install dependencies:

```bash
  npm i
```

Start the server:

```bash
  npm run dev
```

## Run on Prod

Install dependencies:

```bash
  npm i; npm run build
```

Start the server:

```bash
  npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
WALLET_PRIVATE_KEY=paste_your_private_key_here
SISMO_CONNECT_APP_ID=0x123456789

JWT_SECRET=your_json_web_token
WHITELISTED_IPS=127.0.0.1

TABLELAND_USER_DATABASE=user_db_123
TABLELAND_COMMUNITY_DATABASE=community_db_123
TABLELAND_USER_COMMUNITY_DATABASE=user_community_db_123
```

- For `WALLET_PRIVATE_KEY` export your wallet private key from your wallet.
- For `TABLELAND_[NAME]_DATABASE` paste your tableland database names from tableland.xyz.
- For `WHITELISTED_IPS` paste your public IPv4 address to prevent unauth access to tableland DBs.