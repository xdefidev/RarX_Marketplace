import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import testNFT from "../../public/test.jpg";
import gradient from "../../public/gradient.jpg";
import heroImg from "../../public/hero.jpg";
import Link from "next/link";
import { useMemo } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ collections }) {
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

      {/* hero section  */}
      <div className="relative pb-10 pt-20 md:pt-32 lg:h-[88vh]" id="heroBack">
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
          </div>
        </div>
      </div>

      {/* Newly minted  */}
      <div className="py-24">
        <div className="container">
          <h2 className="mb-8 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            <span
              className="mr-1 inline-block h-6 w-6 bg-contain bg-center text-xl"
              style={{
                backgroundImage:
                  "url(https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/Image/apple/64/26a1.png)",
              }}
            ></span>
            Newly Minted NFTs
          </h2>

          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
                <figure className="relative">
                  <a href="#">
                    <Image
                      src={testNFT}
                      height={100}
                      width={100}
                      alt="item 5"
                      className="w-full rounded-[0.625rem]"
                      loading="lazy"
                    />
                  </a>
                </figure>
                <div className="mt-7 flex items-center justify-between">
                  <a href="#">
                    <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white">
                      Test #1
                    </span>
                  </a>
                </div>
                <div className="mt-2 text-sm">
                  <span className="mr-1 text-jacarta-700 dark:text-jacarta-200">
                    Best NFT to buy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* trending collections  */}
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
          <div className="mb-12 text-center font-display text-3xl text-jacarta-700 dark:text-white">
            <h2 className="inline">Trending Collections </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[1.875rem] lg:grid-cols-4">
            {collections?.map((e, index) => (
              <div
                key={index}
                className="flex rounded-2.5xl border border-jacarta-100 bg-white py-4 px-7 transition-shadow hover:shadow-lg dark:border-transparent dark:bg-jacarta-700"
              >
                <figure className="mr-4 shrink-0">
                  <a href="#" className="relative block">
                    <Image
                      src={e.image.replace(
                        "ipfs://",
                        "https://gateway.ipfscdn.io/ipfs/"
                      )}
                      alt="avatar 1"
                      className="rounded-2lg"
                      loading="lazy"
                      height={100}
                      width={100}
                    />
                    <div
                      className="absolute -left-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                      data-tippy-content="Verified Collection"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-[.875rem] w-[.875rem] fill-white"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
                      </svg>
                    </div>
                  </a>
                </figure>
                <div>
                  <a href="#" className="block">
                    <span className="font-display font-semibold text-jacarta-700 hover:text-accent dark:text-white">
                      {e.name}
                    </span>
                  </a>
                  <span className="text-sm dark:text-jacarta-300">
                    {/* 7,080.95 ETH */}
                    {e.owner.slice(0, 5) + "..." + e.owner.slice(38)}
                  </span>
                </div>
              </div>
            ))}
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
          <Image src={gradient} alt="gradient" className="h-full w-full" />
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
