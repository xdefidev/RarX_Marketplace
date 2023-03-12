import React from 'react';
import Image from "next/image";
import testNFT from '../../public/test.jpg'


const Marketplace = () => {
    return (
        <section className="relative py-24" id='pageBack'>
            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
            </picture>
            <div className="container">
                <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
                    Explore NFTs
                </h1>

                {/* <!-- Filters --> */}
                <div className="mb-8 flex flex-wrap items-center justify-between">
                    <ul className="flex flex-wrap items-center">
                        <li className="my-1 mr-2.5">
                            <a
                                href="#"
                                className="group flex h-9 items-center justify-center rounded-lg bg-jacarta-100 px-4 font-display text-sm font-semibold text-jacarta-700 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:bg-jacarta-700 dark:text-white dark:hover:bg-accent"
                            >All</a>
                        </li>
                        <li className="my-1 mr-2.5">
                            <a
                                href="#"
                                className="group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="mr-1 h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white dark:fill-jacarta-100"
                                >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M12 2c5.522 0 10 3.978 10 8.889a5.558 5.558 0 0 1-5.556 5.555h-1.966c-.922 0-1.667.745-1.667 1.667 0 .422.167.811.422 1.1.267.3.434.689.434 1.122C13.667 21.256 12.9 22 12 22 6.478 22 2 17.522 2 12S6.478 2 12 2zm-1.189 16.111a3.664 3.664 0 0 1 3.667-3.667h1.966A3.558 3.558 0 0 0 20 10.89C20 7.139 16.468 4 12 4a8 8 0 0 0-.676 15.972 3.648 3.648 0 0 1-.513-1.86zM7.5 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM12 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                    />
                                </svg>
                                <span>Art</span>
                            </a>
                        </li>
                        <li className="my-1 mr-2.5">
                            <a
                                href="#"
                                className="group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-500 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-900 dark:text-white dark:hover:border-transparent dark:hover:bg-accent dark:hover:text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="mr-1 h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white dark:fill-jacarta-100"
                                >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm6.085 15a1.5 1.5 0 0 1 2.83 0H20v-2.968a4.5 4.5 0 0 1 0-8.064V5h-9.085a1.5 1.5 0 0 1-2.83 0H4v14h4.085zM9.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                    />
                                </svg>
                                <span>Gaming</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* loop nfts here  */}
                <div>
                    <div className="container">
                        <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <div
                                    className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                                    <figure className="relative">
                                        <a href="#">
                                            <Image src={testNFT} height={100} width={100} alt="item 5" className="w-full rounded-[0.625rem]" loading="lazy" />
                                        </a>
                                    </figure>
                                    <div className="mt-7 flex items-center justify-between">
                                        <a href="#">
                                            <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">Test #1</span>
                                        </a>
                                    </div>
                                    <div className="mt-2 text-sm">
                                        <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">Best NFT to buy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Marketplace