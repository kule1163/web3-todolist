"use client";

import { isConnectedAtom } from "@/store/store";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

const WalletConnection = () => {
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        // Initialize provider
        const provider = new ethers.BrowserProvider(window.ethereum);

        // Get signer
        const signer = await provider.getSigner();

        // Set user's Ethereum address
        setCurrentAddress(signer.address);

        // Update connection status
        setIsConnected(true);
      } else {
        alert("MetaMask not detected. Please install the MetaMask extension.");
      }
    } catch (error: any) {
      console.error("Wallet connection error:", error.message);
      // Provide user-friendly error feedback on the UI, e.g., display an error message.
    }
  };

  //check your website connected with metemask
  useEffect(() => {
    // Check if MetaMask is present in the browser
    if (window.ethereum) {
      // Use MetaMask to request the current Ethereum accounts
      window.ethereum
        .request({
          method: "eth_accounts",
        })
        .then((accounts: string[]) => {
          // Check if there is at least one account available
          if (accounts[0]) {
            // Set the current Ethereum address in the component state
            setCurrentAddress(accounts[0]);
            setIsConnected(true);
          } else {
            // If no account is available, set the current address to null
            setCurrentAddress(null);
            setIsConnected(false);
          }
        });
    } else {
      // Alert the user to install the MetaMask extension if it's not detected
      alert("Install MetaMask extension!!");
    }
  }, []);

  return (
    <>
      {isConnected && currentAddress ? (
        <div className="mb-[15px]">
          <div className="sm:block hidden">{currentAddress}</div>
          <div className="sm:hidden block">
            {currentAddress.substring(0, 7) +
              "............" +
              currentAddress.substring(
                currentAddress.length - 7,
                currentAddress.length
              )}
          </div>
        </div>
      ) : (
        <button
          className="border-2 border-blue-800 rounded-md transition hover:bg-blue-800 font-bold hover:text-white h-[45px] w-[200px]"
          onClick={connectWallet}
        >
          Connect Your Wallet
        </button>
      )}
    </>
  );
};

export default WalletConnection;
