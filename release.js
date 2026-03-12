import { ethers } from "ethers";

const PRIVATE_KEY = "YOUR_PRIVATE_KEY";
const CONTRACT_ADDRESS = "0x4E8C73E7f243D12B7A5571200609523A4890beff";

// generic ABI for common release methods
const ABI = [
  "function release() public",
  "function releaseAll() public",
  "function claim() public",
  "function withdraw() public"
];

const NETWORKS = {
  ethereum: "https://rpc.ankr.com/eth",
  bsc: "https://rpc.ankr.com/bsc",
  polygon: "https://rpc.ankr.com/polygon",
  avalanche: "https://rpc.ankr.com/avalanche",
  arbitrum: "https://rpc.ankr.com/arbitrum",
  optimism: "https://rpc.ankr.com/optimism",
  fantom: "https://rpc.ankr.com/fantom",
  base: "https://mainnet.base.org"
};

async function runRelease(network, rpc) {

  try {

    const provider = new ethers.JsonRpcProvider(rpc);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      wallet
    );

    console.log(`Running release on ${network}`);

    let tx;

    try {
      tx = await contract.release();
    } catch {
      try {
        tx = await contract.releaseAll();
      } catch {
        try {
          tx = await contract.claim();
        } catch {
          tx = await contract.withdraw();
        }
      }
    }

    console.log(`${network} TX:`, tx.hash);

    await tx.wait();

    console.log(`${network} success`);

  } catch (err) {
    console.log(`${network} skipped ->`, err.message);
  }
}

async function main() {

  for (const [network, rpc] of Object.entries(NETWORKS)) {
    await runRelease(network, rpc);
  }

  console.log("All mainnet release attempts completed");

}

main();
