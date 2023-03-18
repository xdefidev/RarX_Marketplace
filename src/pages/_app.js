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
import xChainPolygon from "../../artifacts/contracts/xChainPolygon.sol/xChainPolygon.json";
import CollectionFactory from "../../artifacts/contracts/CollectionFactory.sol/CollectionFactory.json";
import { IntmaxWalletSigner } from "webmax";
import axios from "axios";
import * as PushAPI from "@pushprotocol/restapi";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { Wallet } from "ethers";
// import { create } from "@connext/sdk";

export default function App({ Component, pageProps }) {
  const wallet = new Wallet(process.env.NEXT_PUBLIC_ACCOUNT_PRIVATE_KEY);

  const storage = new ThirdwebStorage();
  //SIGNER INFORMATION
  const [signer, setSigner] = useState();
  const [provider, set_provider] = useState();
  const [chainIdMain, setChainIdMain] = useState();
  const [signer_address, set_signer_address] = useState("");
  const [signer_bal, set_signer_bal] = useState(0);
  const [format_signer_bal, set_format_signer_bal] = useState(0);
  const [bridgedHash, setBridgedHash] = useState("");

  //COLLECTIONS INFORMATION
  const [all_collections, set_collections] = useState([]);

  // push channel address
  const RARX_CHANNEL_ADDRESS = "0x7671A05D4e947A7E991a8e2A92EEd7A3a9b9A861";

  // xChain address
  const x_chain_polygon_address = "0xC62404FcaD906f7b438e35DBb437404EaE99Ed11";
  const x_chain_goerli_address = "0x9CBe30e67Ac44f5f8911615e68E1463a26DcdA83";

  // xchain official hashi contracts
  const x_hashi_polygon = "0xd3F1A0782AFD768f8929343Fb44344A2a49fE343";
  const x_hashi_goerli = "0x8F5969b8Fa3727392385C5E74CF1AA91a4aC4b40";

  //CONTRACT ADDRESSES
  const default_collection_address =
    "0xe3b440a11E1E45B22A1AeEe311D1335c7C73C940";
  const marketplace_address = "0x790755B6fdaE1cb63Ea550302576Ade89b6A382F";
  const collection_factory_address =
    "0x330E8af81F507A46D592CEB0a909fFCbE9Ef0Ad4";

  // connect wallet metamask 
  const connectToWallet = async () => {
    if (window?.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      set_provider(provider);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);

      const user_address = await signer.getAddress();
      set_signer_address(user_address);

      const db = polybase();
      const checkUser = await db
        .collection("User")
        .where("id", "==", user_address)
        .get();
      if (!checkUser.data.length) {
        const res = await db
          .collection("User")
          .create([user_address, "", "", "", "", ""]);
        console.log({ res });
      }

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
    const collection_contract = new ethers.Contract(
      collection_address,
      NFTCollection.abi,
      signer
    );
    return collection_contract;
  };

  // connext sdk config 
  // const SdkConfig = {
  //   signerAddress: signer_address,
  //   network: "testnet",
  //   environment: "staging",
  //   chains: {
  //     1735353714: {
  //       providers: ["https://rpc.ankr.com/eth_goerli"],
  //     },
  //     9991: {
  //       providers: ["https://matic-mumbai.chainstacklabs.com"],
  //     },
  //   },
  // };


  // cross chain call main function
  const xChain_Contract_Call = (_xChainContract, signer) => {
    if (!_xChainContract) return;
    const x_chain_contract = new ethers.Contract(
      _xChainContract,
      xChainPolygon.abi,
      signer
    );
    return x_chain_contract;
  };

  //cross chain
  const xchain_NFT = async (
    AssetCollection,
    AssetTokenID,
    xChainContract,
    domainID
  ) => {
    try {
      // getting relayer fee 
      // const polygonDomain = "9991";
      // const { sdkBase } = await create(SdkConfig);
      // const relayerFee = (
      //   await sdkBase.estimateRelayerFee({
      //     polygonDomain,
      //     domainID
      //   })
      // )

      // approving contract
      try {
        const collectionContract = rarx_collection(AssetCollection, signer);
        // approve our xchain contract
        const approveTxn = await collectionContract.setApprovalForAll(
          xChainContract,
          true
        );
        await approveTxn.wait();

        // approve nfthashi polygon contract
        if (domainID == "1735353714") {
          const approveHashiTxn = await collectionContract.setApprovalForAll(
            x_hashi_polygon,
            true
          );
          await approveHashiTxn.wait();
        }
        // approve nfthashi goerli contract
        if (domainID == "9991") {
          const approveHashiTxn = await collectionContract.setApprovalForAll(
            x_hashi_goerli,
            true
          );
          await approveHashiTxn.wait();
        }
      } catch (error) {
        console.log({ approveError: error });
      }

      // sending xchain call
      try {
        const crossChainPolygon = xChain_Contract_Call(xChainContract, signer);
        const sendXChainPolygon = await crossChainPolygon.XChainCall(
          domainID,
          "0",
          "5000",
          AssetCollection,
          signer_address,
          AssetTokenID,
          "true"
        );
        await sendXChainPolygon.wait();
        const Txnhash = await sendXChainPolygon.hash;
        setBridgedHash(Txnhash);
      } catch (error) {
        console.log({ XCallError: error });
      }
    } catch (error) {
      console.log({ someCatchError: error });
    }
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
      const network = await provider.getNetwork();
      rarx.on("TokenCreated", async (ipfsURL, tokenId) => {
        console.log({ ipfsURL, tokenId });
        const db = polybase();
        if (_tokenURI.collection == default_collection_address) {
          console.log(_tokenURI.collection);
          const res = await db
            .collection("NFT")
            .create([
              txn.hash,
              tokenId.toString(),
              network.chainId.toString(),
              tokenURI,
              db.collection("User").record(signer_address),
              db.collection("NFTCollection").record("rarx"),
            ]);
        } else {
          console.log(_tokenURI.collection);
          const res = await db
            .collection("NFT")
            .create([
              txn.hash,
              tokenId.toString(),
              network.chainId.toString(),
              tokenURI,
              db.collection("User").record(signer_address),
              db.collection("NFTCollection").record(_tokenURI.collection),
            ]);
        }
      });
      const txn = await rarx.createToken(tokenURI);
      await txn.wait();
      console.log({ txn });
    } catch (error) {
      console.log(error);
    }
  };

  // create collection
  const create_collection = async (data) => {
    try {
      const collection_logo = await storage.upload(data.logo);
      const collection_image = await storage.upload(data.image);
      const collection_factory = collection_contract_factory(signer);

      collection_factory.on(
        "CollectionCreated",
        async (
          collectionId,
          name,
          symbol,
          description,
          image,
          logo,
          owner,
          collection_address
        ) => {
          const db = polybase();
          const res = await db
            .collection("NFTCollection")
            .create([
              collection_address,
              db.collection("User").record(signer_address),
              image,
              logo,
              name,
              symbol,
              description,
            ]);
        }
      );
      const txn = await collection_factory.create_collection(
        data.name,
        data.symbol,
        collection_image,
        collection_logo,
        data.description
      );
      await txn.wait();
      console.log({ txn });

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
    try {
      //BLOCKCHAIN
      // const collection = collection_contract_factory(signer);
      // const all_collections = await collection.getAllCollections();
      // console.log({ onChainCollections: all_collections });

      const db = polybase();
      const collections = await db.collection("NFTCollection").get();
      const allCollections = [];
      collections.data.map((e) => {
        const { data } = e;
        allCollections.push(data);
      });
      set_collections(allCollections);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get specific user collections
  const get_my_collections = async (signer) => {
    try {
      const collection = collection_contract_factory(signer);
      const my_collections = await collection.getMyCollections();
      return my_collections;
    } catch (error) {
      console.log(error.message);
    }
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
    const balance = await contract.balanceOf(
      "0xC0959C98C70647cF19F2aC48f58CDC3f8B657492"
    );
  };

  const fetch_collection_data_from_polybase = async (collection_address) => {
    try {
      const db = polybase();
      const res = await db
        .collection("NFTCollection")
        .where("id", "==", collection_address)
        .get();
      return res;
    } catch (error) {
      alert(error.message);
    }
  };

  const fetch_nfts_from_collection = async (collection_address) => {
    // try {
    console.log("fetch nfts called");
    const db = polybase();
    const res = await db
      .collection("NFT")
      .where(
        "nftCollection",
        "==",
        db.collection("nftCollection").record(collection_address)
      )
      .get();
    // console.log(res.data);
    return res;
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  const fetch_all_nfts_from_polybase = async () => {
    
  }

  const fetch_nfts_from_user_wallet = async (
    collection_address,
    signer_address,
    signer
  ) => {
    try {
      if (!signer_address) return;
      const db = polybase();
      const res = await db
        .collection("NFT")
        .where("owner", "==", db.collection("User").record(signer_address))
        .get();
      console.log(res.data);
      // const contract = rarx_collection(collection_address, signer);
      // const balance = await contract.balanceOf(signer_address);
      // let nfts = [];
      // for (let i = 0; i < balance; i++) {
      //   const tokenURI = await contract.tokenURI(i);
      //   const res = await axios.get(
      //     tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
      //   );
      //   console.log(res.data.name);
      //   nfts.push(res.data);
      // }
      // console.log({ nfts });
      // return nfts;
    } catch (error) {
      console.log(error.message);
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

  const polybase = () => {
    const db = new Polybase({
      defaultNamespace: process.env.NEXT_PUBLIC_POLYBASE_NAMESPACE,
      signer: async (data) => {
        return {
          h: "eth-personal-sign",
          sig: await wallet.signMessage(data),
        };
      },
    });

    return db;
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
        polybase={polybase}
        chainIdMain={chainIdMain}
        connectToWallet={connectToWallet}
        setChainIdMain={setChainIdMain}
        xchain_NFT={xchain_NFT}
        x_chain_polygon_address={x_chain_polygon_address}
        x_chain_goerli_address={x_chain_goerli_address}
        bridgedHash={bridgedHash}
        fetch_collection_data_from_polybase={
          fetch_collection_data_from_polybase
        }
        fetch_nfts_from_collection={fetch_nfts_from_collection}
      />
      <Footer />
    </>
  );
}
