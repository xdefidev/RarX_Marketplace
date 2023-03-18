import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import testNFT from "../../../public/test.jpg";
import Image from "next/image";
import axios from "axios";
import NftCard from "@/components/cards/NftCard";
import CollectionCard from "@/components/cards/CollectionCard";
import Loader from "@/components/Loader";
import { Chat } from "@pushprotocol/uiweb";
import { Framework } from "@superfluid-finance/sdk-core";
import { Wallet, providers, ethers } from "ethers";


const Profile = ({
  get_my_collections,
  signer,
  signer_address,
  fetch_nfts_from_user_wallet,
  default_collection_address,
  setChainIdMain,
  chainIdMain
}) => {

  // superfluid config start
  const tokens = [
    {
      name: "fDAIx",
      symbol: "fDAIx",
      address: "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00",
      icon:
        "https://raw.githubusercontent.com/superfluid-finance/assets/master/public//tokens/dai/icon.svg",
    },
  ];
  const [provider, setProvider] = useState(null);
  const [superfluidSdk, setSuperfluidSdk] = useState(null);
  const [userStreamData, SetUserStreamData] = useState([]);

  const [streamInput, setStreamInput] = useState({
    token: tokens[0].address,
    flowRate: 1,
  });

  const connectSF = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    setProvider(provider);
  };

  const calculateFlowRate = (amount) => {
    if (amount) {
      return (ethers.utils.formatEther(amount) * 60 * 60 * 24 * 30).toFixed(2);
    }
    return 0;
  };

  const calculateFlowRateInWeiPerSecond = (amount) => {
    const flowRateInWeiPerSecond = ethers.utils
      .parseEther(amount.toString())
      .div(2592000)
      .toString();
    return flowRateInWeiPerSecond;
  };

  const switchGoerliChain = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
      setChainIdMain("5");
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x5",
                chainName: "Goerli Testnet",
                nativeCurrency: {
                  name: "Goerli Testnet",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://goerli.etherscan.io/"],
                rpcUrls: ["https://rpc.ankr.com/eth_goerli"],
              },
            ],
          });
          setChainIdMain("5");
        } catch (addError) {
          console.error(addError);
        }
      }
    }
  };

  const handleCreateStream = async ({
    token,
    sender = signer_address,
    receiver = slug,
    flowRate,
  }) => {
    if (chainIdMain != 5) {
      alert("Please switch to goerli chain to join memberships");
      switchGoerliChain();
    }
    try {
      // set_loading(true);
      const { chainId } = await provider.getNetwork();
      const sf = await Framework.create({
        chainId,
        provider,
      });
      setSuperfluidSdk(sf);
      const superToken = await superfluidSdk.loadSuperToken(token);
      const flowRateInWeiPerSecond = calculateFlowRateInWeiPerSecond(flowRate);

      let flowOp = superToken.createFlow({
        sender,
        receiver,
        flowRate: flowRateInWeiPerSecond,
      });
      await flowOp.exec(provider.getSigner());

      setTimeout(() => {
        alert(
          "Stream created successfully"
        );
        set_loading(false);
      }, 8000);

    } catch (err) {
      console.log({ streamError: err })
      set_loading(false);
    }
  };

  const handleDeleteStream = async () => {
    try {
      // set_loading(true);
      const { chainId } = await provider.getNetwork();
      const sf = await Framework.create({
        chainId,
        provider,
      });
      setSuperfluidSdk(sf);

      const superToken = await superfluidSdk.loadSuperToken("fDAIx");
      let flowOp = superToken.deleteFlow({
        sender: signer_address,
        receiver: slug,
      });
      await flowOp.exec(provider.getSigner());
      setTimeout(() => {
        alert(
          "Stream deleted Successfully"
        );
        set_loading(false);
      }, 8000);
    } catch (err) {
      set_loading(false);
      alert("Something went wrong! Please try again");
    }
  };

  const fetchStreams = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    setProvider(provider);
    const { chainId } = await provider.getNetwork();
    if (chainId == 5) {
      const sf = await Framework.create({
        chainId,
        provider,
      });
      const daix = await sf.loadSuperToken("fDAIx");

      const res = await daix.getFlow({
        sender: signer_address,
        receiver: slug,
        providerOrSigner: provider,
      });
      console.log({ res })
      SetUserStreamData(res);
    }
  };

  // superfluid config end

  const [loading, set_loading] = useState(false);
  const [membershipVisible, setMembershipVisible] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const [myNFTsActive, setMyNFTSActive] = useState(true);
  const [my_collections, set_my_collections] = useState([]);
  const [nfts, set_nfts] = useState([]);

  const theme = {
    btnColorPrimary: "#7348F2",
    bgColorSecondary: "#7348F2",
    moduleColor: "#f0f0f0",
  };

  const myCollections = async () => {
    if (!signer) return;
    const my_collections = await get_my_collections(signer);
    set_my_collections(my_collections);
  };

  const get_nfts = async (collection_address, slug) => {
    set_loading(true);
    const nfts = await fetch_nfts_from_user_wallet(signer_address);
    set_nfts(nfts);
    set_loading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      myCollections();
      if (!signer_address) return;
      get_nfts(default_collection_address, slug);
    };
    fetchData();
    connectSF();
    fetchStreams();
  }, [signer]);


  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <!-- Banner IMG--> */}
      <div className="relative mt-24">
        <Image
          src={testNFT}
          alt="banner"
          height={100}
          width={100}
          className="h-[18.75rem] w-[100%] object-cover"
        />
      </div>

      {/* <!-- Profile Section --> */}
      <section className="relative bg-light-base pb-6 pt-28 dark:bg-jacarta-800">
        <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <figure className="relative">
            <Image
              src={testNFT}
              alt="collection avatar"
              height={100}
              width={100}
              className="rounded-xl border-[5px] border-white dark:border-jacarta-600 h-[130px] w-[auto]"
            />
          </figure>
        </div>

        <div className="container">
          {/* follow  */}
          {/* <div className="mt-[-27px] mb-6 flex items-center justify-center space-x-2.5">
            <div className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600">
              <div
                className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm before:absolute before:h-4 before:w-4 before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                role="button"
                data-tippy-content="Favorite"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                >
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                </svg>
              </div>
            </div>
          </div> */}

          <div className="text-center">
            <h2 className="mt-[-20px] mb-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">
              Aniruddha{" "}
            </h2>
            <div className="mb-8 inline-flex items-center justify-center rounded-full border border-jacarta-100 bg-white py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
              <button className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap dark:text-jacarta-200">
                <span>{slug}</span>
              </button>
            </div>

            <p className="mx-auto mb-2 max-w-xl text-lg dark:text-jacarta-300">
              I make bakwas arts, please buy them
            </p>

            {/* membership on click buttons */}
            {!membershipVisible &&
              <div className="flex justify-center align-middle mb-10 mt-10">
                {calculateFlowRate(userStreamData?.flowRate) > 0 &&
                  <button type="button" onClick={() => setMembershipVisible(true)}
                    class="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark">
                    View Membership
                  </button>
                }
                {calculateFlowRate(userStreamData?.flowRate) <= 0 &&
                  <button type="button" onClick={() => setMembershipVisible(true)}
                    class="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark">
                    Become Member
                  </button>
                }
              </div>
            }
            {/* membership division main  */}
            {membershipVisible &&
              <div>
                <div class="modal-dialog max-w-2xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      {calculateFlowRate(userStreamData?.flowRate) > 0 &&
                        <h5 class="modal-title" id="placeBidLabel">Your Membership Info</h5>
                      }
                      {!calculateFlowRate(userStreamData?.flowRate) <= 0 &&
                        <h5 class="modal-title" id="placeBidLabel">Become A Member</h5>
                      }
                      <button type="button" onClick={() => setMembershipVisible(false)} class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                          class="h-6 w-6 fill-jacarta-700 dark:fill-white">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                        </svg>
                      </button>
                    </div>
                    {calculateFlowRate(userStreamData?.flowRate) > 0 &&
                      <div class="modal-body p-6">
                        <div class="mb-2 flex items-center justify-between">
                          <span class="font-display text-sm font-semibold text-jacarta-700 dark:text-white">On Going Membership Streams </span>
                          <div className="flex items-center justify-center space-x-2 mr-6">
                            <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
                            <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
                            <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-400"></div>
                          </div>
                        </div>

                        <div
                          class="relative mb-2 flex items-center overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600">
                          <div class="flex flex-1 items-center self-stretch border-r border-jacarta-100 bg-jacarta-50 px-2">
                            <span class="font-display text-sm text-jacarta-700">fDAIx </span>
                          </div>

                          <input type="text" class="h-12 w-full flex-[3] border-0 bg-jacarta-50"
                            placeholder="Amount" value={calculateFlowRate(userStreamData.flowRate)} readOnly />

                          <div class="flex flex-1 justify-center self-stretch border-l border-jacarta-100 bg-jacarta-50">
                            <span class="self-center px-2 text-sm">/ Month</span>
                          </div>
                        </div>

                        <div class="mt-4 flex items-center space-x-2 flex-col">
                          <label htmlFor="terms" class="text-sm dark:text-jacarta-200">You are eligible to avail all the perks from the artist</label>
                          <div className="mt-4 ">
                            <label htmlFor="terms" class="text-sm dark:text-jacarta-200">If you cancel your membership you will no longer be eligible for the membership perks </label>
                          </div>
                        </div>
                      </div>
                    }

                    {calculateFlowRate(userStreamData?.flowRate) <= 0 &&
                      <div class="modal-body p-6">
                        <div class="mb-2 flex items-center justify-between">
                          <span class="font-display text-sm font-semibold text-jacarta-700 dark:text-white">Price</span>
                        </div>

                        <div
                          class="relative mb-2 flex items-center overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600">
                          <div class="flex flex-1 items-center self-stretch border-r border-jacarta-100 bg-jacarta-50 px-2">

                            <span class="font-display text-sm text-jacarta-700">fDAIx</span>
                          </div>

                          <input type="text" class="h-12 w-full flex-[3] border-0 focus:ring-inset focus:ring-accent"
                            placeholder="Amount" value="0.05" />

                          <div class="flex flex-1 justify-center self-stretch border-l border-jacarta-100 bg-jacarta-50">
                            <span class="self-center px-2 text-sm">/ Month</span>
                          </div>
                        </div>

                        <div class="text-right">
                          <span class="text-sm dark:text-jacarta-400">Balance: 0.00 fDAIx</span>
                        </div>

                        <div class="mt-4 flex items-center space-x-2 flex-col">
                          <label htmlFor="terms" class="text-sm dark:text-jacarta-200">After joining membership, 0.05 fDAIx tokens will be streamed from your account to the respective artists account and you will be eligible  for all the membership perks from the artist</label>
                          <div className="mt-4 ">
                            <input type="checkbox" id="terms" defaultChecked
                              class="h-5 w-5 self-start rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600" />
                            {"  "}
                            <label htmlFor="terms" class="text-sm dark:text-jacarta-200">I Accept And Understand The Terms </label>
                          </div>
                        </div>
                      </div>
                    }


                    {/* action area of membership  */}
                    <div class="modal-footer">
                      {calculateFlowRate(userStreamData?.flowRate) > 0 &&
                        <div class="flex items-center justify-center space-x-4">
                          <button type="button" onClick={() => (handleDeleteStream())}
                            class="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark">
                            Cancel Memebership
                          </button>
                        </div>
                      }
                      {calculateFlowRate(userStreamData?.flowRate) <= 0 &&
                        <div class="flex items-center justify-center space-x-4">
                          <button type="button" onClick={() => handleCreateStream(streamInput)}
                            class="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark">
                            Join Membership
                          </button>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }

          </div>
        </div>
      </section>

      {/* switch buttons  */}
      <div className="container mt-6">
        <ul
          className="nav nav-tabs scrollbar-custom mb-12 flex items-center justify-start overflow-x-auto overflow-y-hidden border-jacarta-100 pb-px dark:border-jacarta-600 md:justify-center"
          role="tablist"
        >
          {/* my nfts button  */}
          <li
            className="nav-item"
            role="presentation"
            onClick={() => setMyNFTSActive(true)}
          >
            <button
              className={`nav-link ${myNFTsActive &&
                "active relative"} flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white`}
              id="created-tab"
              data-bs-toggle="tab"
              data-bs-target="#created"
              type="button"
              role="tab"
              aria-controls="created"
              aria-selected="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 5v3h14V5H5zM4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" />
              </svg>
              <span className="font-display text-base font-medium">
                My NFTs (5)
              </span>
            </button>
          </li>

          {/* my collections button  */}
          <li
            className="nav-item"
            role="presentation"
            onClick={() => setMyNFTSActive(false)}
          >
            <button
              className={`nav-link ${!myNFTsActive &&
                "active relative"} flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white`}
              id="collections-tab"
              data-bs-toggle="tab"
              data-bs-target="#collections"
              type="button"
              role="tab"
              aria-controls="collections"
              aria-selected="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="mr-1 h-5 w-5 fill-current"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm.707 2.122L3.828 12l8.486 8.485 7.778-7.778-1.06-7.425-7.425-1.06zm2.12 6.364a2 2 0 1 1 2.83-2.829 2 2 0 0 1-2.83 2.829z" />
              </svg>
              <span className="font-display text-base font-medium">
                My Collections
              </span>
            </button>
          </li>
        </ul>
      </div>

      {myNFTsActive == true ? (
        <section className="relative py-24 pt-20">
          <div className="container">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="on-sale"
                role="tabpanel"
                aria-labelledby="on-sale-tab"
              >
                <div className="grid grid-cols-1 gap-[2rem] md:grid-cols-3 lg:grid-cols-4">
                  {nfts?.map((e, index) => {
                    return (
                      <NftCard
                        key={index}
                        ImageSrc={e.ipfsData.image.replace(
                          "ipfs://",
                          "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        Name={e.ipfsData.name}
                        Description={e.ipfsData.description}
                        Address={e.ipfsData.collection}
                        tokenId={e.tokenId}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        //fetch collections here
        <section className="relative py-24 pt-20">
          <div className="container">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="on-sale"
                role="tabpanel"
                aria-labelledby="on-sale-tab"
              >
                <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
                  {my_collections?.map((e, index) => (
                    <CollectionCard
                      key={index}
                      Cover={e.image}
                      Logo={e.logo}
                      Name={e.name}
                      Description={e.description}
                      OwnerAddress={e.owner}
                      CollectionAddress={e.collection_address}
                      collectionId={e.collectionId}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* chat area  */}
      {signer_address !== slug && (
        <div>
          {signer_address && (
            <Chat
              account={signer_address}
              supportAddress={slug}
              apiKey={process.env.NEXT_PUBLIC_PUSH_API_KEY}
              env="staging"
              greetingMsg={`Hey, I am available to chat`}
              // modalTitle={`chat with ${slug}`}
              theme={theme}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
