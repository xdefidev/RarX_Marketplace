import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import "@/styles/custom.css";
import { ethers } from "ethers";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import NFTMarketplace from "../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import NFTCollection from "../../artifacts/contracts/NFTCollection.sol/NFTCollection.json";
import CollectionFactory from "../../artifacts/contracts/CollectionFactory.sol/CollectionFactory.json";

export default function App({ Component, pageProps }) {
  const storage = new ThirdwebStorage();
  //SIGNER INFORMATION
  const [signer, setSigner] = useState();
  const [signer_address, set_signer_address] = useState("");
  const [signer_bal, set_signer_bal] = useState(0);
  const [format_signer_bal, set_format_signer_bal] = useState(0);

  //COLLECTIONS INFORMATION
  const [collections, set_collections] = useState([]);

  //CONTRACT ADDRESSES
  const default_collection_address =
    "0x00957c664760Ca2f0Ed2e77f456083Fc6DcC48aD";
  const marketplace_address = "0x790755B6fdaE1cb63Ea550302576Ade89b6A382F";
  const collection_factory_address =
    "0xAc47ce481771ABbD52ca2B16784f462Dc9d8b9a5";

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
      const signerToStr = ethers.utils.formatEther(user_balance.toString());
      set_signer_bal(signerToStr);

      const formatBalance = parseFloat(signerToStr).toFixed(2);
      set_format_signer_bal(formatBalance);

      console.log("wallet connected");

      const { chainId } = await provider.getNetwork();
      get_all_collections(signer);
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

    return default_collection_contract;
  };

  const collection_contract_factory = (signer) => {
    const collection_factory = new ethers.Contract(
      collection_factory_address,
      CollectionFactory.abi,
      signer
    );

    return collection_factory;
  };

  const create_token = async (_tokenURI, collection_address) => {
    try {
      const tokenURI = await storage.upload(_tokenURI);
      const rarx = rarx_collection(default_collection_address);
      const txn = await rarx.createToken(tokenURI);
      console.log(txn);
    } catch (error) {
      alert(error.message);
    }
  };

  const create_collection = async (data) => {
    try {
      const collection_logo = await storage.upload(data.logo);
      const collection_image = await storage.upload(data.image);
      const collection_factory = collection_contract_factory(signer);
      const txn = await collection_factory.create_collection(
        data.name,
        data.symbol,
        collection_image,
        collection_logo,
        data.description
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const get_all_collections = async (signer) => {
    const collection = collection_contract_factory(signer);
    const all_collections = await collection.getAllCollections();
    set_collections(all_collections);
  };

  const get_my_collections = async (signer) => {};

  useEffect(() => {
    console.log("render");
    connectToWallet();
  }, []);
  return (
    <>
      <Navbar
        connectToWallet={connectToWallet}
        signer={signer}
        signer_bal={format_signer_bal}
        signer_address={signer_address}
      />
      <Component
        {...pageProps}
        create_token={create_token}
        create_collection={create_collection}
        collections={collections}
        defaultCol={default_collection_address}
      />
      <Footer />
    </>
  );
}
