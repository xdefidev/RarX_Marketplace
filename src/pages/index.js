import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import testNFT from "../../public/test.jpg";
import gradient from "../../public/gradient.jpg";
import heroImg from "../../public/hero.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";
import NftCard from "@/components/cards/NftCard";
import CollectionCard from "@/components/cards/CollectionCard";

//chains
import filecoin from "../../public/chains/filecoin.png";
import gnosis from "../../public/chains/gnosis.png";
import mantle from "../../public/chains/mantle.png";
import polygon from "../../public/chains/polygon.png";
import scroll from "../../public/chains/scroll.png";
import taiko from "../../public/chains/taiko.png";

export default function Home({ all_collections, nfts }) {
  return (
    <>
      <Head>
        <title>RarX - Advanced NFT Marketplace</title>
        <meta
          name="description"
          content="First Cross-chain And Multi-chain Advanced NFT Marketplace With AI NFT Generation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* hero section old  */}
      {/* <div className="relative pb-10 pt-20 md:pt-32 lg:h-[88vh]" id="heroBack">
        <div className="container h-full mt-10">
          <div className="grid h-full items-center gap-6 md:grid-cols-12">
            <div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-4">
              <h1 className="mb-6 text-center font-display text-5xl text-jacarta-700 dark:text-white md:text-left lg:text-6xl xl:text-7xl">
                Buy, sell and collect NFTs.
              </h1>
              <p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
                First Cross-chain And Multi-chain Advanced NFT Marketplace With
                AI NFT Generation
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/mint/CreateNFT"
                  className="w-36 rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                  Create
                </Link>
                <Link
                  href="/Marketplace"
                  className="w-36 rounded-full bg-white py-3 px-8 text-center font-semibold text-accent shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume"
                >
                  Explore
                </Link>
              </div>
            </div>

            <div className="col-span-8 xl:col-span-8">
              <div className="relative">
                <Image
                  src={heroImg}
                  height="200px"
                  width="auto"
                  className="xl:ml-[300px]"
                />
              </div>
            </div>

            <div className="col-span-8 xl:col-span-8 ml-56" id="splineStyleMax" >
              <Spline scene="https://prod.spline.design/VbZkYW61RBUJEl-y/scene.splinecode" />
            </div>
          </div>
        </div>
      </div> */}

      {/* <!-- Hero secondary --> */}
      <section className="relative py-20 md:pt-32" id="heroBack">
        <div className="h-full px-6 xl:px-20">
          <div className="grid h-full items-center gap-4 lg:grid-cols-12">
            <div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-5 xl:pl-[20%] xl:pr-[10%]">
              <div className="mb-10 w-full sm:flex sm:space-x-4">
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-[#8DD059]">
                    43
                  </span>
                  <span className="block font-display text-sm text-jacarta-500 dark:text-white">
                    Collections
                  </span>
                </div>
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-[#737EF2]">
                    13
                  </span>
                  <span className="block font-display text-sm text-jacarta-500 dark:text-white">
                    Sales
                  </span>
                </div>
                <div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
                  <span className="block font-display text-3xl text-[#F35BC7]">
                    22
                  </span>
                  <span className="block font-display text-sm text-jacarta-500 dark:text-white">
                    Artists
                  </span>
                </div>
              </div>
              <h1 className="mb-6 text-center font-display text-5xl text-jacarta-700 dark:text-white md:text-left lg:text-5xl xl:text-6xl">
                create, buy, sell and collect NFT’s
              </h1>
              <p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
                Cross-chain And Multi-chain NFT Marketplace with features like
                AI NFT Generation, Cross-chain NFTs, On-chain Collections,
                Realtime Notifications, Chat with artists, Membership
                subscriptions for artists, etc.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/mint/CreateAINFT"
                  className="w-45 rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                  Create AI NFT
                </Link>
                <Link
                  href="/marketplace"
                  className="w-45 rounded-full bg-white py-3 px-8 text-center font-semibold text-accent shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume"
                >
                  Explore NFTs
                </Link>
              </div>
              <div className="flex space-x-4">
                <Image
                  src={polygon}
                  alt="chainImg"
                  className="h-[27px] w-[auto] my-8"
                  height={100}
                  width={100}
                />
                <Image
                  src={gnosis}
                  alt="chainImg"
                  className="h-[27px] w-[auto] my-8"
                  height={100}
                  width={100}
                />
                <Image
                  src={mantle}
                  alt="chainImg"
                  className="h-[27px] w-[auto] my-8"
                  height={100}
                  width={100}
                />
                <Image
                  src={taiko}
                  alt="chainImg"
                  className="h-[29px] w-[auto] my-8"
                  height={100}
                  width={100}
                />
                <Image
                  src={filecoin}
                  alt="chainImg"
                  className="h-[27px] w-[auto] my-8"
                  height={100}
                  width={100}
                />
                <Image
                  src={scroll}
                  alt="chainImg"
                  className="h-[23px] w-[auto] my-8"
                  height={100}
                  width={100}
                />
              </div>
            </div>

            {/* <!-- Hero images --> */}
            <div className="relative col-span-6 xl:col-span-6 xl:col-start-7">
              <div className="md:flex md:space-x-6 xl:space-x-12">
                <div className="mb-6 md:flex md:w-1/2 md:items-center ">
                  <div>
                    <div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                      <div className="relative">
                        <Link href="item.html">
                          <Image
                            src={testNFT}
                            alt="item 1"
                            className="w-full object-cover"
                            height="437"
                            width="406"
                          />
                        </Link>
                      </div>
                      <div className="p-6">
                        <div className="flex">
                          <Link href="user.html" className="shrink-0">
                            <Image
                              src={testNFT}
                              alt="avatar"
                              className="mr-4 h-10 w-10 rounded-full"
                              height={100}
                              width={100}
                            />
                          </Link>
                          <div>
                            <a className="block">
                              <span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
                                King of the jungle launchpad #4
                              </span>
                            </a>
                            <Link href="#" className="text-2xs text-accent">
                              By Shravan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 md:w-1/2 xl:space-y-12">
                  <div>
                    <div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                      <div className="relative">
                        <Link href="item.html">
                          <Image
                            src={testNFT}
                            alt="item 1"
                            height="437"
                            width="406"
                            className="w-full object-cover"
                          />
                        </Link>
                      </div>
                      <div className="p-6">
                        <div className="flex">
                          <Link href="user.html" className="shrink-0">
                            <Image
                              src={testNFT}
                              alt="avatar"
                              className="mr-4 h-10 w-10 rounded-full"
                              height={100}
                              width={100}
                            />
                          </Link>
                          <div>
                            <a className="block">
                              <span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
                                The Universe
                              </span>
                            </a>
                            <Link href="#" className="text-2xs text-accent">
                              By Aniruddha
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-3/4">
                    <div>
                      <div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
                        <div className="relative">
                          <Link href="item.html">
                            <Image
                              src={testNFT}
                              alt="item 1"
                              className="w-full object-cover"
                              height="300"
                              width="300"
                            />
                          </Link>
                        </div>
                        <div className="p-6">
                          <div className="flex">
                            <Link href="user.html" className="shrink-0">
                              <Image
                                src={testNFT}
                                alt="avatar"
                                className="mr-4 h-10 w-10 rounded-full"
                                height={100}
                                width={100}
                              />
                            </Link>
                            <div>
                              <a className="block">
                                <span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
                                  Ethereum NFT
                                </span>
                              </a>
                              <Link href="#" className="text-2xs text-accent">
                                By Petkar
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newly minted  */}
      <div className="py-24">
        <div className="container">
          <h2 className="mb-8 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            <span className="mr-1 inline-block h-6 w-6 bg-contain bg-center text-xl"></span>
            Newly Minted NFTs
          </h2>

          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
            {nfts.map(
              (e, index) =>
                index < 8 && (
                  <NftCard
                    ImageSrc={e.ipfsData.image.replace(
                      "ipfs://",
                      "https://gateway.ipfscdn.io/ipfs/"
                    )}
                    Name={e.ipfsData.name}
                    Description={e.ipfsData.description}
                    Address={e.ipfsData.collection}
                    tokenId={e.tokenId}
                    listedBool={e.isListed}
                    listingPrice={e.listingPrice}
                  />
                )
            )}
          </div>
        </div>
      </div>

      {/* trending collections  */}
      <div className="relative py-24 dark:bg-jacarta-800">
        <div className="container">
          <div className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            <h2 className="inline">Trending Collections </h2>
          </div>
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
            {all_collections?.map((e, index) => {
              return (
                index < 8 && (
                  <CollectionCard
                    key={index}
                    Cover={e.coverImage}
                    Logo={e.logo}
                    Name={e.name}
                    Description={e.description}
                    OwnerAddress={e.owner.id}
                    CollectionAddress={e.id}
                    collectionId={e.id}
                  />
                )
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/collection/TopCollections"
              className="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
            >
              Explore all collections
            </Link>
          </div>
        </div>
      </div>

      {/* create and sell div*/}
      <div className="relative py-24 dark:bg-jacarta-800">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            src={gradient}
            alt="gradient"
            className="h-full w-full"
            height={100}
            width={100}
          />
        </picture>
        <div className="container">
          <h2 className="mb-16 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            What Makes RarX Unique ?
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-6 inline-flex rounded-full bg-[#CDBCFF] p-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M17.409 19c-.776-2.399-2.277-3.885-4.266-5.602A10.954 10.954 0 0 1 20 11V3h1.008c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3H6V1h2v4H4v7c5.22 0 9.662 2.462 11.313 7h2.096zM18 1v4h-8V3h6V1h2zm-1.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                1. AI NFT Generation
              </h3>
              <p className="dark:text-jacarta-300">
                You can create an AI generated NFT by entering a random text of
                a situation or conditions. This functionality works on the
                principles of stable difussion
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 inline-flex rounded-full bg-[#C4F2E3] p-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                2. Cross Chain NFTs
              </h3>
              <p className="dark:text-jacarta-300">
                In one click you can tranfer any of you NFT from one chain to
                another chain. We are using connext and NFThashi to execute this
                functionality
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 inline-flex rounded-full bg-[#CDDFFB] p-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                3. On Chain Collections
              </h3>
              <p className="dark:text-jacarta-300">
                Create your own on-chain NFT collection on RarX. By creating
                on-chain collections you can access your collections with their
                NFTs on any marketplace
              </p>
            </div>
            <div className="text-center">
              <div className="mb-6 inline-flex rounded-full bg-[#FFD0D0] p-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-5 w-5 fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm2.828 8.486a2 2 0 1 0 2.828-2.829 2 2 0 0 0-2.828 2.829z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
                4. Chat With Artists
              </h3>
              <p className="dark:text-jacarta-300">
                Chat with any artists on RarX using push chat. Also, you can
                send monthly tips to your favourite artists (powered by
                superfluid streams)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
