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
import * as PushAPI from "@pushprotocol/restapi";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace:
    "pk/0x9e0b94816d36409ad92dce6ebefcab7db77e3feab6203ec3e2f07aaab334463b6ee759021cfeec4b305a263edd67358ebc4d8fe2ccee87b7b899622c45156dda",
});

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

  // push channel address
  const RARX_CHANNEL_ADDRESS = "0x7671A05D4e947A7E991a8e2A92EEd7A3a9b9A861";

  //CONTRACT ADDRESSES
  const default_collection_address =
    "0x00957c664760Ca2f0Ed2e77f456083Fc6DcC48aD";
  const marketplace_address = "0x790755B6fdaE1cb63Ea550302576Ade89b6A382F";
  const collection_factory_address =
    "0x0C87d648646b5f76Ab0eB7BCD0230CAA41abC3E6";

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
  const rarx_collection = (collection_address, signer) => {
    if (!collection_address) return;
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
  const create_token = async (_tokenURI, signer) => {
    try {
      const tokenURI = await storage.upload(_tokenURI);
      const rarx = rarx_collection(_tokenURI.collection, signer);
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
      await txn.wait();
      sendCollectionNoti({ collectionName: data.name });
    } catch (error) {
      alert(error.message);
    }
  };

  const fetch_NFT_info = async (collection_address, tokenId, signer) => {
    try {
      const contract = rarx_collection(collection_address, signer);
      const nft = await contract?.tokenURI(tokenId);

      const replacedLink = nft?.replace("ipfs://", "https://ipfs.io/ipfs/");
      if (!replacedLink) return;
      const parsed_nft = await axios.get(replacedLink);
      return parsed_nft.data;
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

  const get_nfts_from_collection = async (collection_address) => {
    const contract = new ethers.Contract(
      collection_address,
      NFTCollection.abi,
      signer
    );
    console.log({ contract });
    const balance = await contract.balanceOf(
      "0xC0959C98C70647cF19F2aC48f58CDC3f8B657492"
    );
    console.log({ balance: balance.toString() });
  };

  const fetch_nfts_from_user_wallet = async (
    collection_address,
    signer_address,
    signer
  ) => {
    try {
      if (!signer_address) return;
      const contract = rarx_collection(collection_address, signer);
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

  // sending collection verification notification
  const sendCollectionNoti = async ({ collectionName }) => {
    const signer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_ACCOUNT_PRIVATE_KEY}`
    );
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3,
        identityType: 2,
        notification: {
          title: `Your new collection ${collectionName} on rarx is verified`,
          body: `Congratulations, now you can sell your nfts via your ${collectionName} collection`,
        },
        payload: {
          title: `Your new collections on rarx is verified`,
          body: `Congratulations, now you can sell your nfts via your collection`,
          cta: ``,
        },
        recipients: `eip155:8001:${signer_address}`,
        channel: `eip155:5:${RARX_CHANNEL_ADDRESS}`,
        env: "staging",
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
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
        RARX_CHANNEL_ADDRESS={RARX_CHANNEL_ADDRESS}
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
        fetch_NFT_info={fetch_NFT_info}
        get_nfts_from_collection={get_nfts_from_collection}
      />
      <Footer />
    </>
  );
}
