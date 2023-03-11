import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import testNFT from '../../public/test.jpg'
import gradient from '../../public/gradient.jpg'


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>RarX - Advanced NFT Marketplace</title>
        <meta name="description" content="First Cross-chain And Multi-chain Advanced NFT Marketplace With AI NFT Generation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* hero section  */}
      <div className="relative pb-10 pt-20 md:pt-32 lg:h-[88vh]">
        <div className="container h-full">
          <div className="grid h-full items-center gap-4 md:grid-cols-12">
            <div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-4">
              <h1 className="mb-6 text-center font-display text-5xl text-jacarta-700 dark:text-white md:text-left lg:text-6xl xl:text-7xl">
                NFT Marketplace
              </h1>
              <p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
                First Cross-chain And Multi-chain Advanced NFT Marketplace With AI NFT Generation
              </p>
            </div>

            {/* <div className="col-span-6 xl:col-span-8">
              <div className="relative text-center md:pl-8 md:text-right">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-8 inline-block w-72 rotate-[8deg] sm:w-full lg:w-[24rem] xl:w-[35rem]"
                >
                  <defs>
                    <clipPath id="clipping" clipPathUnits="userSpaceOnUse">
                      <path
                        d="
                    M 0, 100
                    C 0, 17.000000000000004 17.000000000000004, 0 100, 0
                    S 200, 17.000000000000004 200, 100
                        183, 200 100, 200
                        0, 183 0, 100
                "
                        fill="#9446ED"
                      ></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#clipping)">
                    <image
                      href="Image/hero/hero.jpg"
                      width="200"
                      height="200"
                      clipPath="url(#clipping)"
                    />
                  </g>
                </svg>
                <Image
                  height={100} width={100}
                  src={testNFT}
                  alt=""
                  className="absolute top-0 animate-fly md:-right-[10%]"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>


    </>
  );
}
