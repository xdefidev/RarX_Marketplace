import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { TbArrowsUpDown } from "react-icons/tb"
import NftCard from '@/components/cards/NftCard';
import Loader from '@/components/Loader';


const BridgeNFT = ({ connectToWallet, chainIdMain, setChainIdMain, fetch_nfts_from_user_wallet, default_collection_address, signer_address, signer, xchain_NFT, x_chain_goerli, x_chain_polygon }) => {
    const [domainID, setDomainID] = useState("9991");
    const [assetContract, setAssesContract] = useState("");
    const [assetTokenID, setAssetTokenID] = useState();
    const [xChainContract, setxChainContract] = useState();

    const [defaultDomain, setDefaultDomain] = useState(true);
    const [showSelectNFT, setShowSelectNFT] = useState(false);
    const [isNFTBriding, setIsNFTBriding] = useState(false);
    const [isNFTBridged, SetIsNFTBridged] = useState(false);

    const [loading, set_loading] = useState(false);
    const [nfts, set_nfts] = useState([]);

    const get_nfts = async (collection_address, slug) => {
        set_loading(true);
        const nfts = await fetch_nfts_from_user_wallet(
            collection_address,
            slug,
            signer
        );
        set_nfts(nfts);
        set_loading(false);
    };

    const switchPolygonChain = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x13881" }],
            });
            setChainIdMain("80001");
            setShowSelectNFT(true);
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: "0x13881",
                                chainName: "Mumbai",
                                nativeCurrency: {
                                    name: "Polygon",
                                    symbol: "MATIC",
                                    decimals: 18,
                                },
                                blockExplorerUrls: ["https://polygonscan.com/"],
                                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                            },
                        ],
                    });
                    setChainIdMain("80001");
                    setShowSelectNFT(true);
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    };

    const switchGoerliChain = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x5" }],
            });
            setChainIdMain("5");
            setShowSelectNFT(true);
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
                    setShowSelectNFT(true);
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    };

    const handleSubmitSelectChain = async (e) => {
        e.preventDefault();
        if (defaultDomain == true && chainIdMain != "80001") {
            switchPolygonChain();
        }
        if (defaultDomain == false && chainIdMain != "5") {
            switchGoerliChain();
        }

        if (defaultDomain == true && chainIdMain == "80001") {
            setShowSelectNFT(true);
            get_nfts(default_collection_address, signer_address);
            setxChainContract(x_chain_polygon);
        }
        if (defaultDomain == false && chainIdMain == "5") {
            setShowSelectNFT(true);
            get_nfts(default_collection_address, signer_address);
            setxChainContract(x_chain_goerli);
        }
    }

    const handleSubmitSelectNFT = async (e) => {
        setIsNFTBriding(true);
        if (assetContract != "") {
            try {
                const xChainBridgeTxn = await xchain_NFT(assetContract, assetTokenID, xChainContract, domainID);
                await xChainBridgeTxn.wait();
                setIsNFTBriding(false);
            } catch (error) {
                alert("Transaction failed, please try again later!");
                setIsNFTBriding(false);
            }
        }
        else {
            alert("Please select the NFT again!");
            setIsNFTBriding(false);
        }
    }

    useEffect(() => {
        connectToWallet();
        if (chainIdMain == "5") {
            setDomainID("1735353714");
        }
        if (chainIdMain == "80001") {
            setDomainID("9991");
        }
    }, [showSelectNFT, chainIdMain]);

    return (
        <>
            {isNFTBridged == false &&
                <>
                    {showSelectNFT == false &&
                        <form className="relative py-24">
                            <div className="container">
                                <h1 className="pt-16 text-center font-display text-4xl font-medium text-jacarta-700 ">
                                    Bridge Your NFTs
                                </h1>
                                <p className="mb-16 mt-2 text-center text-sm font-medium text-jacarta-700">
                                    Take your NFTs cross-chain, move your NFTs from one chain to another chain
                                </p>
                                <div className="mx-auto max-w-[48.125rem]">

                                    {/* select collection  */}
                                    <div className="relative">
                                        <div>
                                            <label className="mb-1 block font-display text-jacarta-700 dark:text-black">
                                                From
                                            </label>
                                            <div className="mb-2 flex items-center space-x-2">
                                                <p className="text-2xs dark:text-jacarta-300">
                                                    This is the chain where your NFT is
                                                </p>
                                            </div>
                                        </div>
                                        {defaultDomain == true ?
                                            <select
                                                name="collection"
                                                className="dropdown my-1 cursor-pointer w-[100%]"
                                            >
                                                <option>
                                                    Polygon Mumbai
                                                </option>
                                            </select>
                                            :
                                            <select
                                                name="collection"
                                                className="dropdown my-1 cursor-pointer w-[100%]"
                                            >
                                                <option>
                                                    Ethereum Goerli Testnet
                                                </option>
                                            </select>
                                        }

                                        <button onClick={() => { setDefaultDomain(!defaultDomain) }} className='mt-10 mb-10 flex align-middle justify-center' type='button'>
                                            <TbArrowsUpDown className='text-[20px]' />
                                        </button>

                                        <div>
                                            <label className="mb-2 block font-display text-jacarta-700 dark:text-black">
                                                Destination
                                            </label>
                                            <div className="mb-3 flex items-center space-x-2">
                                                <p className="text-2xs dark:text-jacarta-300">
                                                    This is the chain where you want your NFT
                                                </p>
                                            </div>
                                        </div>

                                        {defaultDomain == false ?
                                            <select
                                                name="collection"
                                                className="dropdown my-1 cursor-pointer w-[100%]"
                                            >
                                                <option>
                                                    Polygon Mumbai
                                                </option>
                                            </select>
                                            :
                                            <select
                                                name="collection"
                                                className="dropdown my-1 cursor-pointer w-[100%]"
                                            >
                                                <option>
                                                    Ethereum Goerli Testnet
                                                </option>
                                            </select>
                                        }
                                    </div>

                                    <button
                                        onClick={handleSubmitSelectChain}
                                        type="button"
                                        className="rounded-full bg-accent mt-8 py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </form>
                    }
                    {showSelectNFT == true &&
                        <form className="relative py-24">
                            <div className="container">
                                <h1 className="pt-16 text-center font-display text-4xl font-medium text-jacarta-700 ">
                                    Select NFT For Bridging
                                </h1>
                                <p className="mb-2 mt-2 text-center text-sm font-medium text-jacarta-700">
                                    Select the NFT which you want to xbridge
                                </p>
                                <section className="relative py-24 pt-20">
                                    {loading ?
                                        <Loader />
                                        :
                                        (<>
                                            {isNFTBriding ? <Loader /> :
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
                                                                        e.name && (
                                                                            <div onClick={() => (setAssesContract(default_collection_address), setAssetTokenID(index), handleSubmitSelectNFT())}>
                                                                                <NftCard
                                                                                    ImageSrc={e.image.replace(
                                                                                        "ipfs://",
                                                                                        "https://gateway.ipfscdn.io/ipfs/"
                                                                                    )}
                                                                                    Name={e.name}
                                                                                    Description={e.description}
                                                                                    Address={default_collection_address}
                                                                                    tokenId={index}
                                                                                    onClickOpen={false}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                        )
                                    }
                                </section>
                            </div>
                        </form>
                    }
                </>
            }
            {isNFTBridged == true && "Bridged successfully"}
        </>
    )
}

export default BridgeNFT