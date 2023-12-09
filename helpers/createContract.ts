import { ToDoList__factory } from "@/typechain-types";
import { ethers } from "ethers";

export const toDoListContract = async () => {
  try {
    if (window.ethereum) {
      // Create a provider using MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the signer associated with the connected wallet
      const signer = await provider.getSigner();

      if (process.env.CONTRACT_ADDRESS) {
        // Create an instance of the ToDoList contract using ethers.js
        const ToDoListContract = ToDoList__factory.connect(
          process.env.CONTRACT_ADDRESS,
          signer
        );

        // Return the instantiated contract
        return ToDoListContract;
      } else {
        alert(
          "Contract address not defined. Please check your environment variables."
        );
        return;
      }
    } else {
      alert("MetaMask not detected. Please install the MetaMask extension.");
      return;
    }
  } catch (error: any) {
    // Log error to the console
    console.error("Error connecting to ToDoList contract:", error.message);
  }
};
