import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { TbArrowsUpDown } from "react-icons/tb"


const BridgeNFT = ({ connectToWallet, chainIdMain, setChainIdMain }) => {
    const [defaultDomain, setDefaultDomain] = useState(true);
    const [showSelectNFT, setShowSelectNFT] = useState(false);

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
        }
        if (defaultDomain == false && chainIdMain == "5") {
            setShowSelectNFT(true);
        }
    }

    const handleSubmitSelectNFT = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        connectToWallet();
    }, [showSelectNFT, chainIdMain]);

    return (
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
                        <p className="mb-16 mt-2 text-center text-sm font-medium text-jacarta-700">
                            Select the NFT which you want to xbridge
                        </p>
                        <div className="mx-auto max-w-[48.125rem]">
                            {/* fetch nft here  */}
                        </div>
                    </div>
                </form>
            }
        </>
    )
}

export default BridgeNFT