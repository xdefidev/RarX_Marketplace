import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import "@/styles/custom.css";
import { ethers, Wallet } from "ethers";
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
import { create } from "@connext/sdk";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
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
  const [nfts, set_nfts] = useState([]);
  const [search_data] = useState(nfts);

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

  // chain configs
  const [chainImg, setChainImg] = useState("");
  const [blockURL, setBlockURL] = useState("");
  const [symbol, setSymbol] = useState("");
  const [defaultCollectionAddress, setCollectionAddress] = useState("");
  const [marketplaceAddress, setMarketplaceAddress] = useState("");
  const [collectionFactoryAddress, setCollectionFactoryAddress] = useState("");

  // declaring images
  const filecoinLogo = "chains/filecoin.png";
  const gnosisLogo = "chains/gnosis.png";
  const goerliLogo = "chains/goerli.png";
  const mantleLogo = "chains/mantle.png";
  const polygonLogo = "chains/polygon.png";
  const scrollLogo = "chains/scroll.png";
  const TaikoLogo = "chains/taiko.png";

  // connect wallet metamask
  const connectToWallet = async () => {
    const db = polybase();
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

      const checkUser = await db
        .collection("User")
        .where("id", "==", user_address)
        .get();
      if (checkUser.data.length === 0) {
        const res = await db
          .collection("User")
          .create([user_address, "", "", "", "", ""]);
      }

      const user_balance = await signer.getBalance();
      const signerToStr = ethers.utils.formatEther(user_balance.toString());
      set_signer_bal(signerToStr);

      const formatBalance = parseFloat(signerToStr).toFixed(2);
      set_format_signer_bal(formatBalance);

      const { chainId } = await provider.getNetwork();

      if (chainId == 1442) {
        // polygon zkevm
        setCollectionAddress("deafult");
        setMarketplaceAddress("deafult");
        setCollectionFactoryAddress("deafult");
        setChainImg(polygonLogo);
        setSymbol("ETH");
        setBlockURL("https://mumbai.polygonscan.com/");
      } else if (chainId == 3141) {
        // filecoin
        setCollectionAddress("deafult");
        setMarketplaceAddress("deafult");
        setCollectionFactoryAddress("deafult");
        setChainImg(filecoinLogo);
        setSymbol("TFIL");
        setBlockURL("https://hyperspace.filfox.info/en/");
      } else if (chainId == 5001) {
        // mantle
        setCollectionAddress("deafult");
        setMarketplaceAddress("deafult");
        setCollectionFactoryAddress("deafult");
        setChainImg(mantleLogo);
        setSymbol("BIT");
        setBlockURL("https://explorer.testnet.mantle.xyz/");
      } else if (chainId == 534353) {
        // scroll
        setCollectionAddress("deafult");
        setMarketplaceAddress("deafult");
        setCollectionFactoryAddress("deafult");
        setChainImg(scrollLogo);
        setSymbol("ETH");
        setBlockURL("https://blockscout.scroll.io/");
      } else if (chainId == 167002) {
        // taiko
        setCollectionAddress("deafult");
        setMarketplaceAddress("deafult");
        setCollectionFactoryAddress("deafult");
        setChainImg(TaikoLogo);
        setSymbol("ETH");
        setBlockURL("https://l2explorer.hackathon.taiko.xyz/");
      } else if (chainId == 10200) {
        // gnosis
        setCollectionAddress("deafult");
        setMarketplaceAddress("deafult");
        setCollectionFactoryAddress("deafult");
        setChainImg(gnosisLogo);
        setSymbol("XDAI");
        setBlockURL("https://blockscout.com/gnosis/chiado/");
      } else if (chainId == 5) {
        // eth goerli
        setCollectionAddress("deafult");
        setMarketplaceAddress("deafult");
        setCollectionFactoryAddress("deafult");
        setChainImg(goerliLogo);
        setSymbol("ETH");
        setBlockURL("https://goerli.etherscan.io/");
      } else if (chainId == 80001) {
        // matic
        setCollectionAddress("0xE6aD85168620973A542368609133986B31e64cF3");
        setMarketplaceAddress("0xB00269E098526480B3cCfC57bE99B077077969CD");
        setCollectionFactoryAddress(
          "0xf2C06547DEdbA59fA5F735808A3B97B212cae11C"
        );
        setChainImg(polygonLogo);
        setSymbol("MATIC");
        setBlockURL("https://mumbai.polygonscan.com/");
      } else {
        setCollectionAddress("0xE6aD85168620973A542368609133986B31e64cF3");
        setMarketplaceAddress("0xB00269E098526480B3cCfC57bE99B077077969CD");
        setCollectionFactoryAddress(
          "0xf2C06547DEdbA59fA5F735808A3B97B212cae11C"
        );
        setChainImg(polygonLogo);
        setSymbol("MATIC");
        setBlockURL("https://mumbai.polygonscan.com/");
      }
      // create_marketplace_acc();
      setChainIdMain(chainId);
    } else {
      console.log("No wallets detected");
    }
  };

  const signOut = async () => {
    set_signer_address("");
    setSigner();
  };

  // const create_marketplace_acc = async () => {
  //   const db = polybase();
  //   const res = await db
  //     .collection("User")
  //     .create([
  //       marketplaceAddress,
  //       "new rarx",
  //       "rarx_@gmail.com",
  //       "this is new rarx markeptlace",
  //       "rarx profile image new",
  //       "rarx cover image new",
  //     ]);

  //   console.log({ res });
  // };

  // CONNECT WALLET INTMAX
  const connectToIntmax = async () => {
    try {
      const signerIntmax = new IntmaxWalletSigner();
      const accountIntmax = await signerIntmax.connectToAccount();
      // setSigner(signerIntmax);
      set_signer_address("0x7671A05D4e947A7E991a8e2A92EEd7A3a9b9A861");
    } catch (error) {
      console.log(error.message);
    }
  };

  // marketplace
  const marketplace = () => {
    const marketplace_contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    return marketplace_contract;
  };

  const cancel_listing = async (collection_address, tokenId) => {
    const contract = marketplace();
    const txn = await contract.cancelListing(collection_address, tokenId);
    await txn.wait();

    const db = polybase();
    const res = await db
      .collection("NFT")
      .record(`${collection_address}/${tokenId}`)
      .call("cancel_listing");
  };

  const fetch_listed_nfts = async () => {
    try {
      const db = polybase();
      let nfts = [];
      const res = await db
        .collection("NFT")
        .where("isListed", "==", true)
        .get();
      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.listingPrice = e.data.listingPrice
          ? ethers.utils.formatEther(e.data.listingPrice)
          : "";
        obj.owner = e.data.owner.id;
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        const url = await e.data.ipfsURL.replace(
          "ipfs://",
          "https://gateway.ipfscdn.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  const list_nft = async (tokenId, price, collection_address, signer) => {
    const user_address = await signer.getAddress();

    const collection_contract = rarx_collection(collection_address, signer);
    try {
      const txnApproval = await collection_contract.setApprovalForAll(
        marketplaceAddress,
        true
      );
      await txnApproval.wait();
      const contract = marketplace();

      const txn = await contract.ListToken(
        tokenId,
        ethers.utils.parseEther(price),
        collection_address,
        {
          value: ethers.utils.parseEther("0.01"),
        }
      );
      await txn.wait();

      const nftRec = await contract.nft_record(collection_address, tokenId);
      if (txn.hash) {
        const db = polybase();
        const res = await db
          .collection("NFT")
          .record(`${collection_address}/${tokenId}`)
          .call("listNFT", [
            ethers.utils.parseEther(price).toString(),
            chainIdMain.toString(),
            db.collection("User").record(marketplaceAddress),
          ]);
      }
      sendNFTListNoti(tokenId, price);
    } catch (error) {
      console.log(error.message);
    }
  };

  const executeSale = async (tokenId, collection_address, listing_price) => {
    const db = polybase();

    const res = await db
      .collection("NFT")
      .record(`${collection_address}/${tokenId}`)
      .get();
    try {
      const contract = marketplace();
      const txn = await contract.executeSale(tokenId, collection_address, {
        value: listing_price,
      });
      await txn.wait();
      if (txn.hash) {
        const res = await db
          .collection("NFT")
          .record(`${collection_address}/${tokenId}`)
          .call("executeSale", [db.collection("User").record(signer_address)]);
      }
      sendNFTSaleNoti(tokenId, listing_price);
    } catch (error) {
      console.log(error.message);
    }
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
  const SdkConfig = {
    signerAddress: signer_address,
    network: "testnet",
    environment: "staging",
    chains: {
      1735353714: {
        providers: ["https://rpc.ankr.com/eth_goerli"],
      },
      9991: {
        providers: ["https://matic-mumbai.chainstacklabs.com"],
      },
    },
  };

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
      const polygonDomain = "9991";
      const { sdkBase } = await create(SdkConfig);
      const relayerFee = (
        await sdkBase.estimateRelayerFee({
          originDomain: polygonDomain,
          destinationDomain: domainID
        })
      )

      // approving contract
      try {
        const collectionContract = rarx_collection(AssetCollection, signer);
        let fromChainID = 0;
        let xChainID = 0;
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
          fromChainID = 80001;
          xChainID = 5;
          await approveHashiTxn.wait();
        }
        // approve nfthashi goerli contract
        if (domainID == "9991") {
          const approveHashiTxn = await collectionContract.setApprovalForAll(
            x_hashi_goerli,
            true
          );
          fromChainID = 5;
          xChainID = 80001;
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
          relayerFee,
          "5000",
          AssetCollection,
          signer_address,
          AssetTokenID,
          "true"
        );
        await sendXChainPolygon.wait();
        const Txnhash = await sendXChainPolygon.hash;
        setBridgedHash(Txnhash);

        // shravan write code here
        // save Txnhash, fromChainID, AssetCollection and AssetTokenID in polybase user transactions named schema
        // update xChainID of NFT in polybase NFT schema

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
      collectionFactoryAddress,
      CollectionFactory.abi,
      signer
    );
    return collection_factory;
  };

  // create nft
  const create_token = async (_tokenURI, signer) => {
    try {
      console.log(_tokenURI);
      const tokenURI = await storage.upload(_tokenURI);
      const rarx = rarx_collection(_tokenURI.collection, signer);
      const network = await provider.getNetwork();

      rarx.on("TokenCreated", async (ipfsURL, tokenId) => {
        console.log({ tokenId });
        const db = polybase();
        const res = await db
          .collection("NFT")
          .create([
            `${_tokenURI.collection}/${tokenId.toString()}`,
            tokenId.toString(),
            network.chainId.toString(),
            tokenURI,
            db.collection("User").record(signer_address),
            db.collection("NFTCollection").record(_tokenURI.collection),
            _tokenURI.properties[0].type
              ? JSON.stringify(_tokenURI.properties)
              : "[]",
            _tokenURI.name,
            chainImg,
            blockURL,
            symbol,
          ]);
        console.log({ res });
        console.log("event emitted");
      });

      const txn = await rarx.createToken(tokenURI);
      await txn.wait();
      console.log({ txn });
      sendNFTMintNoti();
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE COLLECTION
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

      sendCollectionNoti({ collectionName: data.name });
    } catch (error) {
      alert(error.message);
    }
  };

  //FETCHES SINGLE NFT INFO
  const fetch_NFT_info = async (collection_address, tokenId) => {
    try {
      const db = polybase();
      let obj = {};
      const res = await db
        .collection("NFT")
        .record(`${collection_address}/${tokenId}`)
        .get();
      const collectionInfo = await db
        .collection("NFTCollection")
        .record(collection_address)
        .get();
      const ownerInfo = await db
        .collection("User")
        .record(res.data.owner.id)
        .get();
      obj.nft_properties = res.data.properties
        ? JSON.parse(res.data.properties)
        : [];
      // COLLECTION INFO
      obj.collectionLogo = collectionInfo.data.logo;
      obj.collection_name = collectionInfo.data.name;
      obj.collection_id = collectionInfo.data.id;
      obj.collection_owner = collectionInfo.data.owner.id;
      obj.collection_symbol = collectionInfo.data.symbol;
      //OWNER INFO
      obj.ownerImage = ownerInfo.data.profileImage;
      obj.owner_username = res.data.username;
      obj.seller = res.data.seller?.id;
      obj.user_id = ownerInfo.data.id;
      // NFT INFO
      obj.chainId = res.data.chainId;
      obj.isListed = res.data.isListed;
      obj.listingPrice = res.data.listingPrice
        ? ethers.utils.formatEther(res.data.listingPrice)
        : "";
      obj.nft_owner = res.data.owner.id;
      obj.chain_block = res.data.chain_block;
      obj.chain_image = res.data.chain_image;
      obj.chain_symbol = res.data.chain_symbol;
      const parsed_nft = await axios.get(
        res.data.ipfsURL.replace("ipfs://", "https://gateway.ipfscdn.io/ipfs/")
      );
      obj.ipfsData = parsed_nft.data;
      return obj;
    } catch (error) {
      console.log(error.message);
    }
  };

  // GETS ALL COLLECTIONS FROM POLYBASE
  const get_all_collections = async () => {
    try {
      const db = polybase();
      const collections = await db.collection("NFTCollection").get();
      const allCollections = [];
      collections.data.map((e) => {
        const { data } = e;
        allCollections.push(data);
      });
      console.log({ allCollections });
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

  // FETCHES NFT FROM COLLECTION
  const fetch_nfts_from_collection = async (collection_address) => {
    try {
      const db = polybase();

      let nfts = [];
      const res = await db
        .collection("NFT")
        .where("nftCollection", "==", {
          collectionId: `${process.env.NEXT_PUBLIC_POLYBASE_NAMESPACE}/NFTCollection`,
          id: collection_address,
        })
        .get();

      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.listingPrice = e.data.listingPrice
          ? ethers.utils.formatEther(e.data.listingPrice)
          : "";
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        const url = await e.data.ipfsURL.replace(
          "ipfs://",
          "https://gateway.ipfscdn.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  //FETCHES ALL THE NFTS FROM POLYBASE
  const fetch_all_nfts_from_polybase = async () => {
    try {
      const db = polybase();
      const res = await db.collection("NFT").get();
      let nfts = [];
      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.listingPrice = e.data.listingPrice
          ? ethers.utils.formatEther(e.data.listingPrice)
          : "";
        obj.nft_name = e.data?.nft_name ? e.data?.nft_name : "";
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        const url = e.data.ipfsURL.replace(
          "ipfs://",
          "https://gateway.ipfscdn.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      set_nfts(nfts);
      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  //FETCHES NFTS BY USER FROM POLYBASE
  const fetch_nfts_from_user_wallet = async (signer_address) => {
    try {
      // if (!signer_address) return;
      let nfts = [];
      const db = polybase();
      const res = await db
        .collection("NFT")
        .where("owner", "==", {
          collectionId: `${process.env.NEXT_PUBLIC_POLYBASE_NAMESPACE}/User`,
          id: signer_address,
        })
        .get();

      for (const e of res.data) {
        let obj = {};
        obj.chainId = e.data.chainId;
        obj.tokenId = e.data.tokenId;
        obj.isListed = e.data.isListed;
        obj.chain_block = e.data.chain_block;
        obj.chain_image = e.data.chain_image;
        obj.chain_symbol = e.data.chain_symbol;
        const url = e.data.ipfsURL.replace(
          "ipfs://",
          "https://gateway.ipfscdn.io/ipfs/"
        );
        const { data } = await axios.get(url);
        obj.ipfsData = data;
        nfts.push(obj);
      }
      return nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  // sending collection verification notification
  const sendCollectionNoti = async ({ collectionName }) => {
    const signer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY}`
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
          title: `Your new collection on rarx is verified`,
          body: `Congratulations, now you can sell your nfts via your collection`,
        },
        recipients: `eip155:80001:${signer_address}`,
        channel: `eip155:80001:${RARX_CHANNEL_ADDRESS}`,
        env: "staging",
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // sending nft list notification
  const sendNFTListNoti = async ({ NftName, NftPrice }) => {
    const signer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY}`
    );
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3,
        identityType: 2,
        notification: {
          title: `${NftName} is listed for sale on RarX`,
          body: `Congratulations, you have successfully listed ${NftName} on sale for ${NftPrice}`,
        },
        payload: {
          title: `${NftName} is listed for sale on RarX`,
          body: `Congratulations, you have successfully listed ${NftName} on sale for ${NftPrice}`,
        },
        recipients: `eip155:80001:${signer_address}`,
        channel: `eip155:80001:${RARX_CHANNEL_ADDRESS}`,
        env: "staging",
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // sending nft buy notification
  const sendNFTSaleNoti = async ({ NftName, NftPrice }) => {
    const signer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY}`
    );
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3,
        identityType: 2,
        notification: {
          title: `You have purchased NFT ${NftName} for ${NftPrice}`,
          body: `Congratulations, you have successfully purchased ${NftName}`,
        },
        payload: {
          title: `You have purchased NFT ${NftName} for ${NftPrice}`,
          body: `Congratulations, you have successfully purchased ${NftName}`,
        },
        recipients: `eip155:80001:${signer_address}`,
        channel: `eip155:80001:${RARX_CHANNEL_ADDRESS}`,
        env: "staging",
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // sending nft minted notification
  const sendNFTMintNoti = async () => {
    const signer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_OWNER_PRIVATE_KEY}`
    );
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3,
        identityType: 2,
        notification: {
          title: `Your new NFT is created onchain via RarX Marketplace`,
          body: `Congratulations, now you can list your newly minted NFT on Rarx`,
        },
        payload: {
          title: `Your new NFT is created onchain via RarX Marketplace`,
          body: `Congratulations, now you can list your newly minted NFT on Rarx`,
          cta: ``,
        },
        recipients: `eip155:8001:${signer_address}`,
        channel: `eip155:80001:${RARX_CHANNEL_ADDRESS}`,
        env: "staging",
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  // polybase db connect
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

  const getUserData = async (user_address) => {
    try {
      const db = polybase();
      const res = await db
        .collection("User")
        .record(user_address)
        .get();
      const {
        bio,
        coverImage,
        email,
        id,
        profileImage,
        username,
        socials,
        isArtist,
        membershipFees,
        perks,
      } = res.data;
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const search_nft = async (query) => {
    try {
      const db = polybase();
      let filtered_nfts = [];
      nfts.filter(async (item) => {
        if (item.nft_name.toLowerCase().includes(query)) {
          filtered_nfts.push(item);
          return item;
        }
      });
      return filtered_nfts;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }

    connectToWallet();
    get_all_collections();
    fetch_all_nfts_from_polybase();
    console.log("render");
  }, [router.pathname]);

  return (
    <>
      <Navbar
        search_nft={search_nft}
        connectToWallet={connectToWallet}
        signer={signer}
        signer_bal={format_signer_bal}
        signer_address={signer_address}
        connectToIntmax={connectToIntmax}
        chainIdMain={chainIdMain}
        setChainIdMain={setChainIdMain}
        RARX_CHANNEL_ADDRESS={RARX_CHANNEL_ADDRESS}
        chainImg={chainImg}
        blockURL={blockURL}
        symbol={symbol}
        signOut={signOut}
      />
      <Component
        {...pageProps}
        create_token={create_token}
        create_collection={create_collection}
        all_collections={all_collections}
        signer={signer}
        get_my_collections={get_my_collections}
        signer_address={signer_address}
        rarx_collection={rarx_collection}
        fetch_nfts_from_user_wallet={fetch_nfts_from_user_wallet}
        fetch_NFT_info={fetch_NFT_info}
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
        fetch_all_nfts_from_polybase={fetch_all_nfts_from_polybase}
        nfts={nfts}
        list_nft={list_nft}
        fetch_listed_nfts={fetch_listed_nfts}
        RARX_CHANNEL_ADDRESS={RARX_CHANNEL_ADDRESS}
        chainImg={chainImg}
        blockURL={blockURL}
        executeSale={executeSale}
        getUserData={getUserData}
        defaultCollectionAddress={defaultCollectionAddress}
        cancel_listing={cancel_listing}
      />
      <Footer />
    </>
  );
}
