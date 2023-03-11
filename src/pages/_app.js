import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@/styles/style.css";
import { ethers } from "ethers";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import NFTCollection from "../../artifacts/contracts/NFTCollection.sol/NFTCollection.json";

export default function App({ Component, pageProps }) {
  const storage = new ThirdwebStorage();
  const [signer, setSigner] = useState();
  const [signer_address, set_signer_address] = useState("");
  const [signer_bal, set_signer_bal] = useState(0);

  const default_collection_address =
    "0x00957c664760Ca2f0Ed2e77f456083Fc6DcC48aD";
  const marketplace_address = "0x790755B6fdaE1cb63Ea550302576Ade89b6A382F";

  const connectToWallet = async () => {
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);

      const user_address = await signer.getAddress();
      set_signer_address(user_address);

      const user_balance = await signer.getBalance();
      set_signer_bal(ethers.utils.formatEther(user_balance.toString()));

      console.log("wallet connected");

      const { chainId } = await provider.getNetwork();
    } else {
      alert(
        "Please install Metamask, Intmax or any other web3 enabled browser"
      );
    }
  };

  const marketplace = async () => {
    const marketplace_contract = new ethers.Contract(
      marketplace_address,
      NFTMarketplace.abi,
      signer
    );
    return marketplace_contract;
  };

  const rarx_collection = (collection_address) => {
    const default_collection_contract = new ethers.Contract(
      collection_address,
      NFTCollection.abi,
      signer
    );

    console.log(default_collection_contract);

    return default_collection_contract;
  };

  const create_token = async (_tokenURI, collection_address) => {
    const tokenURI = await storage.upload(_tokenURI);
    const rarx = rarx_collection(default_collection_address);
    const txn = await rarx.createToken(tokenURI);
    console.log(txn);
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  return (
    <>
      <Navbar
        connectToWallet={connectToWallet}
        signer={signer}
        signer_bal={signer_bal}
        signer_address={signer_address}
      />
      <Component {...pageProps} create_token={create_token} />
      <Footer />
    </>
  );
}
