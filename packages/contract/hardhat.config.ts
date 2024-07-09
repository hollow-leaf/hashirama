import type { HardhatUserConfig } from "hardhat/config"
import type { NetworkUserConfig } from "hardhat/types"
// hardhat plugin
import "@nomicfoundation/hardhat-toolbox-viem";
import "@matterlabs/hardhat-zksync";

import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"
import { loadTasks } from "./scripts/helpers/hardhatConfigHelpers"

dotenvConfig({ path: resolve(__dirname, "./.env") })

const taskFolder = ["tasks"]
loadTasks(taskFolder)


const chainIds = {
  ganache: 1337,
  goerli: 5,
  sepolia: 11155111,
  hardhat: 31337,
  mainnet: 1,
  zkSyncTestnet: 300,
}

// Ensure that we have all the environment variables we need.
const pk: string | undefined = process.env.PRIVATE_KEY
if (!pk) {
  throw new Error("Please set your pk in a .env file")
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY
if (!infuraApiKey) {
  throw new Error("Please set your INFURA_API_KEY in a .env file")
}

function getChainConfig (chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string
  switch (chain) {
    case "sepolia":
      jsonRpcUrl = "https://rpc.sepolia.org"
      break
    case "zkSyncTestnet":
      jsonRpcUrl = "https://sepolia.era.zksync.dev"
      break
    default:
      jsonRpcUrl = `https://${chain}.infura.io/v3/${infuraApiKey}`
  }
  return {
    accounts: [`0x${pk}`],
    chainId: chainIds[chain],
    url: jsonRpcUrl,
    ethNetwork: "sepolia", 
    zksync: true
  }
}

const config: HardhatUserConfig = {
  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
    },
    local: {
      url: "http://127.0.0.1:8545",
    },
    goerli: getChainConfig("goerli"),
    sepolia: getChainConfig("sepolia"),
    mainnet: getChainConfig("mainnet"),
    zkSyncTestnet: getChainConfig("zkSyncTestnet"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.22",
      },
      {
        version: "0.8.20",
      },
    ],
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/hardhat-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yulDetails: false,
        },
      },
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      cardona: process.env.POLYGONSCAN_API_KEY || "",
      baseSepolia: process.env.BASESCAN_API_KEY || "",
      zkSyncTestnet: "NO_API_KEY",
    },
    customChains: [
      {
        network: "zkSyncTestnet",
        chainId: chainIds["zkSyncTestnet"],
        urls: {
          apiURL: "https://zksync-sepolia.blockscout.com/api/v2",
          browserURL: "https://zksync-sepolia.blockscout.com/",
        },
      }
    ]
  },

  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: process.env.REPORT_GAS as string === "true",
    excludeContracts: [],
    src: "./contracts",
  },
}

export default config