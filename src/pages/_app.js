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
import { IntmaxWalletSigner } from "webmax";
import axios from "axios";
export default function App({ Component, pageProps }) {
  const storage = new ThirdwebStorage();
  //SIGNER INFORMATION
  const [signer, setSigner] = useState();
  const [chainIdMain, setChainIdMain] = useState();
  const [signer_address, set_signer_address] = useState("");
  const [signer_bal, set_signer_bal] = useState(0);
  const [format_signer_bal, set_format_signer_bal] = useState(0);

  //COLLECTIONS INFORMATION
  const [all_collections, set_collections] = useState([]);

  //CONTRACT ADDRESSES
  const default_collection_address = "0x00957c664760Ca2f0Ed2e77f456083Fc6DcC48aD";
  const marketplace_address = "0x790755B6fdaE1cb63Ea550302576Ade89b6A382F";
  const collection_factory_address = "0x0C87d648646b5f76Ab0eB7BCD0230CAA41abC3E6";

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
      setChainIdMain(chainId);
      get_all_collections(signer);
    } else {
      alert(
        "Please install Metamask, Intmax or any other web3 enabled browser"
      );
    }
  };

  // CONNECT WALLET INTMAX
  const connectToIntmax = async () => {
    try {
      const signerIntmax = new IntmaxWalletSigner();
      setSigner(signerIntmax);
      const accountIntmax = await signerIntmax.connectToAccount();
      set_signer_address(accountIntmax);
    } catch (error) {
      console.log(error.message);
    }
  };

  // marketplace
  const marketplace = async () => {
    const marketplace_contract = new ethers.Contract(
      marketplace_address,
      NFTMarketplace.abi,
      signer
    );
    return marketplace_contract;
  };

  // rarx collections
  const rarx_collection = (collection_address) => {
    const default_collection_contract = new ethers.Contract(
      collection_address,
      NFTCollection.abi,
      signer
    );

    return default_collection_contract;
  };

  // deploy collections
  const collection_contract_factory = (signer) => {
    const collection_factory = new ethers.Contract(
      collection_factory_address,
      CollectionFactory.abi,
      signer
    );
    return collection_factory;
  };

  // create nft
  const create_token = async (_tokenURI) => {
    try {
      const tokenURI = await storage.upload(_tokenURI);
      const rarx = rarx_collection(_tokenURI.collection);
      const txn = await rarx.createToken(tokenURI);
      await txn.wait();
    } catch (error) {
      alert(error.message);
    }
  };

  // create collection
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

  // get collections
  const get_all_collections = async (signer) => {
    const collection = collection_contract_factory(signer);
    const all_collections = await collection.getAllCollections();
    set_collections(all_collections);
  };

  // get specific user collections
  const get_my_collections = async (signer) => {
    const collection = collection_contract_factory(signer);
    const my_collections = await collection.getMyCollections();
    return my_collections;
  };

  // get collection by ID
  const get_collection_by_id = async (collection_id, signer) => {
    const contract = collection_contract_factory(signer);
    const collection = await contract.getCollectionById(collection_id);
    return collection;
  };

  const fetch_nfts_from_user_wallet = async (
    collection_address,
    signer_address
  ) => {
    try {
      if (!signer_address) return;
      const contract = rarx_collection(collection_address);
      const balance = await contract.balanceOf(signer_address);
      let nfts = [];
      for (let i = 0; i < balance; i++) {
        const tokenURI = await contract.tokenURI(i);
        const res = await axios.get(
          tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
        );
        nfts.push(res.data);
      }
      return nfts;
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  return (
    <>
      <Navbar
        connectToWallet={connectToWallet}
        signer={signer}
        signer_bal={format_signer_bal}
        signer_address={signer_address}
        connectToIntmax={connectToIntmax}
        chainIdMain={chainIdMain}
        setChainIdMain={setChainIdMain}
      />
      <Component
        {...pageProps}
        create_token={create_token}
        create_collection={create_collection}
        all_collections={all_collections}
        signer={signer}
        defaultCol={default_collection_address}
        get_my_collections={get_my_collections}
        signer_address={signer_address}
        rarx_collection={rarx_collection}
        default_collection_address={default_collection_address}
        fetch_nfts_from_user_wallet={fetch_nfts_from_user_wallet}
        get_collection_by_id={get_collection_by_id}
      />
      <Footer />
    </>
  );
}
