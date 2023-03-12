import React from 'react';
import Image from "next/image";
import testNFT from '../../../public/test.jpg'

const TopCollections = () => {
    return (
        <section class="relative py-24" id='pageBack'>
            <picture class="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                <img src="img/gradient_light.jpg" alt="gradient" class="h-full w-full" />
            </picture>
            <div class="container">
                <h1 class="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
                    Explore Collections
                </h1>

                {/* loop collections here  */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-4">
                    <div
                        className="flex rounded-2.5xl border border-jacarta-100 bg-white py-4 px-7 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700">
                        <figure className="mr-4 shrink-0">
                            <a href="#" className="relative block">
                                <Image src={testNFT} alt="avatar 1" className="rounded-2lg" loading="lazy" height={100} width={100} />
                                <div
                                    className="absolute -left-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                                    data-tippy-content="Verified Collection">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                        className="h-[.875rem] w-[.875rem] fill-white">
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                                    </svg>
                                </div>
                            </a>
                        </figure>
                        <div>
                            <a href="#" className="block">
                                <span className="font-display font-semibold text-jacarta-700 hover:text-accent dark:text-white">NFT Funny
                                    Cat</span>
                            </a>
                            <span className="text-sm dark:text-jacarta-300">7,080.95 ETH</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopCollections