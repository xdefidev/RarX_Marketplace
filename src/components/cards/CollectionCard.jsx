import Link from "next/link";
import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const CollectionCard = ({
  Cover,
  Logo,
  Name,
  Description,
  OwnerAddress,
  CollectionAddress,
  collectionId,
  chainImgPre,
  chain_image,
  isCollectionVerified,
}) => {
  return (
    <div className="relative rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700 h-[290px] overflow-hidden">
      <Link
        href={`/collection/${CollectionAddress}`}
        className="relative flex space-x-[0.625rem]"
      >
        <span className="w-[100%] h-[150px]">
          <Image
            src={Cover?.replace(
              /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
              "https://gateway.ipfscdn.io/ipfs/"
            )}
            alt="Cover Image"
            className="h-full w-[100%] rounded-[0.625rem] object-cover"
            loading="lazy"
            height={100}
            width={100}
          />
        </span>
        <span className="absolute bottom-[-25px] right-20">
          <Image
            src={Logo?.replace(
              /^(ipfs:\/\/|https:\/\/ipfs\.moralis\.io:2053\/ipfs\/)/,
              "https://gateway.ipfscdn.io/ipfs/"
            )}
            alt="Logo"
            className="h-[75px] w-[75px] rounded-[100%] border b-4 border-black shadow-lg"
            loading="lazy"
            height={100}
            width={100}
          />
        </span>
      </Link>

      <div className="flex">
        <Link
          href={`/collection/${CollectionAddress}`}
          className=" mt-8 font-display text-[22px] text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent"
          style={{
            width: "180px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {Name}
        </Link>
        {isCollectionVerified ? (
          <MdVerified
            style={{ color: "#4f87ff", marginLeft: "-4px", marginTop: "34px" }}
            size={25}
          />
        ) : (
          <BsFillExclamationCircleFill
            style={{ color: "#cfc62d", cursor: "pointer", marginTop: "34px" }}
            size={25}
          />
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
        <div className="flex flex-wrap items-center">
          <span className="mr-1 dark:text-jacarta-400">by</span>
          {!OwnerAddress == "" ? (
            <Link href={`/profile/${OwnerAddress}`} className="text-accent">
              <span>
                {OwnerAddress.slice(0, 5) + "..." + OwnerAddress.slice(38)}
              </span>
            </Link>
          ) : (
            <Link href="#" className="text-accent">
              <span>you</span>
            </Link>
          )}
        </div>
        {/* <span className="text-sm dark:text-jacarta-300">3 NFT Items</span> */}
      </div>
      <div>
        <Image
          src={`${chainImgPre}${
            chain_image == "" ? "chains/polygon.png" : chain_image
          }`}
          height={100}
          width={100}
          alt="item 5"
          className="absolute h-6 w-6 right-3 bottom-3"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CollectionCard;
