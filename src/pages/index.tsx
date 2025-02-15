import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useState } from "react";
import { parseEther } from "viem";
import { useReadContract, useSendTransaction, useWriteContract } from "wagmi";
import { GTA_NFT_ABI } from "../lib/gtaNft";

const Home: NextPage = () => {
  const [value, setValue] = useState<number>(0);
  const [transferRecipient, setTransferRecipient] = useState<string>("");

  const [mintRecipient, setMintRecipient] = useState<string>("");
  const [tokenURI, setTokenURI] = useState<string>("");

  const [tokenID, setTokenID] = useState<number>(0);

  const CONTRACT_ADDRESS = "0x139A9201c545E49Ec10BbEdC9abBCdfeb0c723EA";

  const { data: hashWriteTx, writeContract } = useWriteContract();
  const { data: hashSendTx, sendTransaction } = useSendTransaction();

  const { data: tokenURIData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GTA_NFT_ABI,
    functionName: "tokenURI",
    args: [tokenID],
  });

  const handleSubmitTransfer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendTransaction({
      to: transferRecipient as `0x${string}`,
      value: parseEther(value.toString()),
    });
  };

  const handleSubmitMint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: GTA_NFT_ABI,
      functionName: "safeMint",
      args: [mintRecipient as `0x${string}`, tokenURI],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Send Transaction */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Send Transaction
          </h2>
          <form
            onSubmit={handleSubmitTransfer}
            className="flex flex-col w-full space-y-4"
          >
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Recipient</label>
              <input
                type="text"
                value={transferRecipient}
                onChange={(e) => setTransferRecipient(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Ether</label>
              <input
                type="number"
                value={value}
                step="0.01"
                onChange={(e) => setValue(parseFloat(e.target.value))}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send Ether
            </button>
          </form>
        </div>

        {/* Mint NFT */}
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Mint NFT
          </h2>
          <form
            onSubmit={handleSubmitMint}
            className="flex flex-col w-full space-y-4"
          >
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Recipient</label>
              <input
                type="text"
                value={mintRecipient}
                onChange={(e) => setMintRecipient(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium">Token URI</label>
              <input
                type="text"
                value={tokenURI}
                onChange={(e) => setTokenURI(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Mint NFT
            </button>
          </form>
        </div>
      </div>

      {/* Get Token URI (Full Width Box) */}
      <div className="mt-6 p-6 w-full max-w-3xl bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Get Token URI
        </h2>
        <div className="flex flex-col items-center">
          <label className="text-gray-900">Token ID</label>
          <input
            type="number"
            value={tokenID}
            onChange={(e) => setTokenID(parseInt(e.target.value))}
            className="w-full max-w-sm p-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>
        <p className="mt-4 text-center text-gray-700 font-medium">
          Token URI: {tokenURIData?.toString() || "N/A"}
        </p>
      </div>

      {/* Connect Wallet Button */}
      <div className="mt-8">
        <ConnectButton />
      </div>
    </div>
  );
};

export default Home;
