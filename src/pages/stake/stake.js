import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { Flex, Box, Text } from "@chakra-ui/react";
// import { NFTContext } from "../context/NFTContext";
// import { shortenAddress } from "../utils/shortenAddress";
import { ethers } from "ethers";
// import { Loader, SearchBar, Banner, Button } from "../components";
// import { Network } from "@ethersproject/networks";
import Head from "next/head";
import NftCard from "@/components/cards/NftCard";
import { checkAddressChecksum, toChecksumAddress } from "web3-utils";
import { MdEventAvailable } from "react-icons/md";
// import images from "../assets";

const Stake = ({
  get_my_collections,
  signer,
  signer_address,
  fetch_nfts_from_user_wallet,
  RARX_CHANNEL_ADDRESS,
  setChainIdMain,
  chainIdMain,
  getUserData,
  blockURL,
  fetch_collections_polybase,
  connectToWallet,
  polybase,
  symbol,
  defaultCollectionAddress,
  stake_nft,
  unstake_nft,
  available_reward,
  claim_reward,
}) => {
  //   const {
  //     fetchMyNFTsOrCreatedNFTs,
  //     claimRewards,
  //     Withdraw,
  //     Claimable,
  //     currentAccount,
  //     getStakedNFTs,
  //     stakeNFT,
  //     nftCurrency,
  //   } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [stakedNFTS, setStakedNFTs] = useState([]);
  const [unStakedNFTS, setUnStakedNFTs] = useState([]);
  const [claimable, setClaimable] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState("Recently Added");
  const [reward, set_reward] = useState("0.00");
  const [balance, setBalance] = useState(0);

  const klay = {
    name: "klay",
    chainId: 1001,
    _defaultProvider: (providers) =>
      new providers.JsonRpcProvider(`https://api.baobab.klaytn.net:8651`),
  };

  async function user_market_nfts() {
    const nfts1 = await fetch_nfts_from_user_wallet(signer_address);

    const nfts2 = nfts1.filter((item) => {
      return item.collectionId == defaultCollectionAddress;
    });

    setUnStakedNFTs(nfts2);
  }

  useEffect(() => {
    async function run() {
      await connectToWallet();
      user_market_nfts();
      const reward = await available_reward();
      set_reward(reward);
    }

    run();
  }, [signer_address, chainIdMain]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     if (currentAccount) {
  //       getStakedNFTs().then((items) => {
  //         setStakedNFTs(items);
  //       });
  //       setIsLoading(false);
  //     }
  //   }, [currentAccount]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     if (currentAccount) {
  //       getClaimable();
  //       getUserBalance();
  //     }
  //     setIsLoading(false);
  //   }, [currentAccount]);

  //   const getClaimable = async () => {
  //     const res = await Claimable();
  //     setClaimable(res.toString());
  //   };

  //   const getUserBalance = async () => {
  //     try {
  //       const provider = ethers.getDefaultProvider(klay);
  //       const balance = await provider.getBalance(currentAccount);
  //       setBalance(ethers.utils.formatEther(balance.toString()));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     const sortedNfts = [...nfts];

  //     switch (activeSelect) {
  //       case "Price (low to high)":
  //         setNfts(sortedNfts.sort((a, b) => a.price - b.price));
  //         break;
  //       case "Price (high to low)":
  //         setNfts(sortedNfts.sort((a, b) => b.price - a.price));
  //         break;
  //       case "Recently added":
  //         setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
  //         break;
  //       default:
  //         setNfts(nfts);
  //         break;
  //     }
  //   }, [activeSelect]);

  //   const onHandleSearch = (value) => {
  //     const filteredNfts = nfts.filter(({ name }) =>
  //       name.toLowerCase().includes(value.toLowerCase())
  //     );

  //     if (filteredNfts.length === 0) {
  //       setNfts(nftsCopy);
  //     } else {
  //       setNfts(filteredNfts);
  //     }
  //   };

  //   const onClearSearch = () => {
  //     if (nfts.length && nftsCopy.length) {
  //       setNfts(nftsCopy);
  //     }
  //   };

  //   if (isLoading) {
  //     return <div className="flexStart min-h-screen">{/* <Loader /> */}</div>;
  //   }

  //   const Step = ({ title, amount, fixed }) => {
  //     return (
  //       <Flex
  //         className="text-nft-black-1 dark:text-black shadow-xl border-nft-gray-1"
  //         direction="column"
  //         bg="whiteAlpha.100"
  //         cursor="pointer"
  //         _hover={{ bg: "whiteAlpha.200" }}
  //         transitionDuration="200ms"
  //         p="10"
  //         rounded="xl"
  //       >
  //         <Box mt="2">
  //           <Text fontWeight="bold" fontSize="2xl">
  //             {title}
  //           </Text>
  //           <Text
  //             mt="1"
  //             fontWeight="bold"
  //             fontSize="2xl"
  //             className="text-nft-black-1 dark:text-nft-gray-2 border-nft-gray-1"
  //           >
  //             {fixed ? amount?.toFixed(9) : Number.parseFloat(amount).toFixed(3)}{" "}
  //             KLAY
  //           </Text>
  //         </Box>
  //       </Flex>
  //     );
  //   };

  //   const NFTCard = ({ nft, action }) => {
  //     return (
  //       <div
  //         onClick={action}
  //         className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md"
  //       >
  //         <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
  //           <Image
  //             src={nft.image || images[`nft${nft.i}`]}
  //             layout="fill"
  //             objectFit="cover"
  //             alt="nft01"
  //           />
  //         </div>
  //         <div className="mt-3 flex flex-col">
  //           <p className="font-poppins dark:text-black text-nft-black-1 font-semibold text-sm minlg:text-xl">
  //             {nft.name}
  //           </p>
  //           <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
  //             <p className="font-poppins dark:text-black text-nft-black-1 font-semibold text-xs minlg:text-lg">
  //               {nft.price}
  //               <span className="font-normal"> {nftCurrency}</span>
  //             </p>
  //             <p className="font-poppins dark:text-black text-nft-black-1 font-semibold text-xs minlg:text-lg">
  //               {shortenAddress(currentAccount)}
  //             </p>
  //           </div>
  //           <div className="mt-1 minlg:mt-3 flexBetween flex-row" />
  //         </div>
  //       </div>
  //     );
  //   };

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <Head>
        <title>Stake NFTs</title>
      </Head>
      <div className="w-full flexCenter flex-col">
        {/* <Banner
          name="Stake Your Nifty NFTs and get rewards"
          childStyles="text-center mb-4"
          parentStyle="h-80 justify-center"
        /> */}

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            {/* <Image
              src={images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
            /> */}
          </div>
          <p className="font-poppins dark:text-black text-nft-black-1 font-semibold text-2xl mt-6">
            {/* {shortenAddress(currentAccount)} */}
          </p>
        </div>
      </div>
      <div className="w-full text-center items-center justify-center">
        <h1 className="font-poppins mt-4 dark:text-black text-nft-black-1 text-3xl font-extrabold">
          Your Tokens Rewards
        </h1>
        <div className="w-full flex mt-4 justify-center items-center sm:flex-col">
          <div className="sm:mb-8 mb-8 flex space-x-4 flex-nowrap !justify-between">
            {/* <Step
              fixed={true}
              title="Claimable Rewards"
              amount={claimable / 10000000000}
            /> */}
            <div className="bg-slate-800 text-white w-full h-[150px] p-4 font-display rounded shadow-xl">
              <h2 className="h-[60px]">Claimable Rewards</h2>
              <p className="text-slate-400">{reward} SHIBLITE</p>
            </div>
          </div>

          {/* <Step title="Current Balance" amount={balance} /> */}
        </div>
        <button
          onClick={claim_reward}
          className="inline-block rounded bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
        >
          Claim Rewards
        </button>
        {/* <Button
          btnName="Claim Rewards"
          btnType="primary"
          
          handleClick={() => claimRewards()}
        /> */}
      </div>

      {/* <div className="w-full mt-8 flex-col justify-center text-center pl-16 pr-16 sm:pl-2 sm:pr-2">
        <h1 className="font-poppins mt-4 text-slate-600 text-3xl font-extrabold">
          Your Staked NFTs
        </h1>
        {stakedNFTS.length === 0 ? (
          <div className="flex-col sm:p-4 p-16 border border-nft-gray-2 mt-4 rounded-md dark:bg-nft-black-1 bg-slate-800 h-[300px] flex content-center justify-center">
            <h1 className="font-poppins text-slate-200 text-2xl font-extrabold">
              No NFTs Staked
            </h1>
            <p className="font-poppins text-slate-200 text-1xl font-bold">
              Stake some NFT first
            </p>
          </div>
        ) : (
          <div className="mt-3 w-full flex flex-wrap">
            {stakedNFTS?.map((nft) => (
              <NFTCard
                key={`nft-${nft.tokenId}`}
                nft={nft}
                action={() => Withdraw(nft.tokenId)}
              />
            ))}
          </div>
        )}
      </div> */}
      <div className="w-full mt-8 flex-col justify-center text-center pl-16 pr-16 sm:pl-2 sm:pr-2">
        <h1 className="font-poppins mt-4 text-slate-600 text-3xl font-extrabold">
          Your NFTs
        </h1>
        {unStakedNFTS.length === 0 ? (
          <div className="flex-col sm:p-4 p-16 border border-nft-gray-2 mt-4 rounded-md dark:bg-nft-black-1 bg-slate-800 h-[300px] flex content-center justify-center">
            <h1 className="font-poppins text-slate-200 text-2xl font-extrabold">
              No NFTs owned
            </h1>
            <p className="font-poppins text-slate-200 text-1xl font-bold">
              Buy or Unlist a ShibLite NFT first
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[2rem] md:grid-cols-3 lg:grid-cols-4 py-12 px-0 sm:px-4">
            {unStakedNFTS?.map(
              (nft, index) =>
                nft.isListed !== true && (
                  <a>
                    <NftCard
                      key={index}
                      ImageSrc={
                        nft?.ipfsData?.image
                          ? nft?.ipfsData?.image?.replace(
                              /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
                              "https://gateway.ipfscdn.io/ipfs/"
                            )
                          : "/test.jpg"
                      }
                      Name={nft?.ipfsData?.name}
                      Description={nft?.ipfsData?.description}
                      Address={toChecksumAddress(nft?.collectionId)}
                      tokenId={nft?.tokenId}
                      chainImgPre={"../"}
                      listedBool={false}
                      chain_image={
                        chainIdMain == 1
                          ? "chains/goerli.png"
                          : chainIdMain == "56"
                          ? "chains/bsc.png"
                          : "chains/polygon.png"
                      }
                      chain_symbol={nft?.chain_symbol}
                    />

                    {nft?.isStaked ? (
                      <button
                        className="inline-block rounded bg-accent py-3 px-8 mt-2 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                        onClick={() => unstake_nft(nft?.tokenId)}
                      >
                        Unstake
                      </button>
                    ) : (
                      <button
                        className="inline-block rounded bg-accent py-3 px-8 mt-2 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                        onClick={() => stake_nft(nft?.tokenId)}
                      >
                        Stake
                      </button>
                    )}
                  </a>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stake;
