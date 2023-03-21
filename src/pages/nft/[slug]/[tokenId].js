import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import testNFT from "../../../../public/test.jpg";
import Image from "next/image";
import { ethers } from "ethers";
import Head from "next/head";
import Link from "next/link";
const NFTPage = ({
  fetch_NFT_info,
  signer,
  signer_address,
  list_nft,
  executeSale,
}) => {
  const router = useRouter();
  const { slug, tokenId } = router.query;

  const [listSale, setListSale] = useState(false);
  const [propShow, setPropShow] = useState(true);
  const [listingPrice, set_listing_price] = useState(0);
  const [nft, set_nft_info] = useState({});

  const get_nft = async (collectionAddress, tokenId) => {
    if (!tokenId && !collectionAddress) return;
    const nft = await fetch_NFT_info(collectionAddress, tokenId);
    set_nft_info(nft);
  };

  const list_token = async (e) => {
    e.preventDefault();
    const res = await list_nft(tokenId, listingPrice, slug, signer);
  };

  const buyNFT = async (tokenId, collection_address, listing_price) => {
    const res = await executeSale(tokenId, collection_address, listing_price);
  };

  useEffect(() => {
    get_nft(slug, tokenId);
  }, [signer_address]);
  return (
    <>
      <Head>
        <title>NFT - RarX Marketplace</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section className="relative pt-12 pb-24 lg:py-24 mt-10">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image
            height={100}
            width={100}
            src="img/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <div className="md:flex md:flex-wrap">
            <div className="mb-8 md:w-2/5 md:flex-shrink-0 md:flex-grow-0 md:basis-auto lg:w-1/2">
              <Image
                src={nft?.ipfsData?.image?.replace(
                  "ipfs://",
                  "https://gateway.ipfscdn.io/ipfs/"
                )}
                width={100}
                height={100}
                alt="item"
                className="cursor-pointer rounded-2.5xl h-[auto] w-[100%]"
              />
            </div>

            {/* <!-- Details --> */}
            <div className="md:w-3/5 md:basis-auto md:pl-8 lg:w-1/2 lg:pl-[3.75rem]">
              <div className="mb-3 flex">
                {/* <!-- Collection --> */}
                <div className="flex items-center">
                  <Link
                    href={`/collection/${nft?.collection_id}`}
                    className="mr-2 text-sm font-bold text-accent"
                  >
                    {nft?.collection_name}
                  </Link>
                  <span
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                    data-tippy-content="Verified Collection"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      className="h-[.875rem] w-[.875rem] fill-white"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                    </svg>
                  </span>
                </div>

                {/*Likes*/}
                <div className="ml-auto flex space-x-2">
                  <div className="flex items-center space-x-1 rounded-xl border border-jacarta-100 bg-white py-2 px-4 dark:border-jacarta-600 dark:bg-jacarta-700">
                    <span
                      className="js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                      data-tippy-content="Favorite"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-4 w-4 fill-jacarta-500 hover:fill-red dark:fill-jacarta-200 dark:hover:fill-red"
                      >
                        <path fill="none" d="M0 0H24V24H0z"></path>
                        <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"></path>
                      </svg>
                    </span>
                    <span className="text-sm dark:text-jacarta-200">12</span>
                  </div>
                </div>
              </div>

              {/* nft title  */}
              <h1 className="mb-4 font-display text-4xl font-semibold text-jacarta-700 dark:text-white">
                {nft?.ipfsData?.name}
              </h1>

              {/* nnft desc  */}
              <p className="mb-10 dark:text-jacarta-300">
                {nft?.ipfsData?.description}
              </p>

              {/* <!-- Owner --> */}
              <div className="mb-8 flex flex-wrap">
                <div className="mb-4 flex">
                  <figure className="mr-4 shrink-0">
                    <a href="user.html" className="relative block">
                      <Image
                        src={nft?.ownerImage ? nft?.ownerImage : testNFT}
                        height={40}
                        width={40}
                        alt="avatar 1"
                        className="rounded-2lg"
                        loading="lazy"
                      />
                      <div
                        className="absolute -right-3 top-[60%] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
                        data-tippy-content="Verified Collection"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-[.875rem] w-[.875rem] fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      </div>
                    </a>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="block text-sm text-jacarta-400 dark:text-white">
                      Owned by
                    </span>
                    <Link
                      href={`/profile/${nft?.user_id}`}
                      className="block text-accent"
                    >
                      <span className="text-sm font-bold">
                        {nft.seller
                          ? nft.seller
                          : nft.owner_username
                          ? nft.owner_username
                          : nft?.user_id}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* -------------------------- all action buttons start ------------------------  */}

              {/* <!-- place Bid button design --> */}
              {/* {
                <div className="rounded-2lg  border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#placeBidModal"
                    className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                  >
                    Place Bid
                  </a>
                </div>
              } */}

              {/* <!-- list nft --> */}
              <div className="rounded-2lg  border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                {listSale == false ? (
                  nft?.nft_owner === signer_address && (
                    <button
                      onClick={() => setListSale(true)}
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#placeBidModal"
                      className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                    >
                      List For Sale
                    </button>
                  )
                ) : (
                  <div>
                    <form
                      onSubmit={list_token}
                      className="modal-dialog max-w-2xl"
                    >
                      <div
                        className="modal-content"
                        style={{ backgroundColor: "#f5f5f5" }}
                      >
                        <div className="modal-header">
                          <h5 className="modal-title" id="placeBidLabel">
                            List For Sale
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => setListSale(false)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              className="h-6 w-6 fill-jacarta-700 dark:fill-white"
                            >
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                            </svg>
                          </button>
                        </div>

                        <div className="modal-body p-6">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-display text-sm font-semibold text-jacarta-700 dark:text-white">
                              Price
                            </span>
                          </div>

                          <div className="relative mb-2 flex items-center overflow-hidden rounded-lg border border-jacarta-100 dark:border-jacarta-600">
                            <div className="flex flex-1 items-center self-stretch border-r border-jacarta-100 bg-jacarta-50 px-2">
                              <span className="font-display text-sm text-jacarta-700">
                                ETH
                              </span>
                            </div>

                            <input
                              type="text"
                              onChange={(e) =>
                                set_listing_price(e.target.value)
                              }
                              className="h-12 w-full flex-[3] border-0 focus:ring-inset focus:ring-accent"
                              placeholder="Amount"
                            />
                          </div>
                        </div>

                        <div className="modal-footer">
                          <div className="flex items-center justify-center space-x-4">
                            <button
                              type="submit"
                              className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                            >
                              List Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* buy now section  */}
              {nft?.isListed && nft.seller !== signer_address && (
                <div className="rounded-2lg  border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                  <div className="mb-8 sm:flex sm:flex-wrap">
                    <div className="sm:w-1/2 sm:pr-4 lg:pr-8">
                      <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="text-sm text-jacarta-400 dark:text-jacarta-300">
                          Price
                        </span>
                      </div>
                      <div className="mt-3 flex">
                        <div>
                          <div className="flex items-center whitespace-nowrap">
                            <span className="text-lg font-medium leading-tight tracking-tight text-green">
                              {ethers.utils.formatEther(nft?.listingPrice)}{" "}
                              matic
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => buyNFT(tokenId, slug, nft?.listingPrice)}
                    data-bs-toggle="modal"
                    data-bs-target="#placeBidModal"
                    className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                  >
                    Buy Now
                  </button>
                </div>
              )}

              {/* <!-- cancel nft sale --> */}
              {/* <div className="rounded-2lg  border-jacarta-100 bg-white p-8 dark:border-jacarta-600 dark:bg-jacarta-700">
                <a
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#placeBidModal"
                  className="inline-block w-full rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                >
                  Cancel Sale
                </a>
              </div> */}

              {/* -------------------------- all action buttons end ------------------------  */}
            </div>
          </div>

          {/* <!-- other detail Tabs --> */}
          <div className="scrollbar-custom mt-14 overflow-x-auto rounded-lg">
            <div className="min-w-fit">
              {/* <!-- Tabs Nav --> */}
              <ul className="nav nav-tabs flex items-center" role="tablist">
                {/* <!-- Properties --> */}
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setPropShow(true)}
                >
                  <button
                    className={`nav-link ${propShow &&
                      "active relative"} flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white`}
                    id="properties-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#properties"
                    type="button"
                    role="tab"
                    aria-controls="properties"
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
                      <path d="M6.17 18a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2v-2h4.17zm6-7a3.001 3.001 0 0 1 5.66 0H22v2h-4.17a3.001 3.001 0 0 1-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2V4h4.17z" />
                    </svg>
                    <span className="font-display text-base font-medium">
                      Properties
                    </span>
                  </button>
                </li>

                {/* <!-- Details --> */}
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => setPropShow(false)}
                >
                  <button
                    className={`nav-link ${!propShow &&
                      "active relative"} flex items-center whitespace-nowrap py-3 px-6 text-jacarta-400 hover:text-jacarta-700 dark:hover:text-white`}
                    id="details-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#details"
                    type="button"
                    role="tab"
                    aria-controls="details"
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
                      <path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm-1-2V4H5v16h14zM7 6h4v4H7V6zm0 6h10v2H7v-2zm0 4h10v2H7v-2zm6-9h4v2h-4V7z" />
                    </svg>
                    <span className="font-display text-base font-medium">
                      Details
                    </span>
                  </button>
                </li>
              </ul>

              {/* <!-- Tab Content --> */}
              <div className="tab-content">
                {propShow ? (
                  <div>
                    <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
                      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                        {nft?.properties?.map((e, index) => {
                          return (
                            <a
                              key={index}
                              className="flex flex-col space-y-2 rounded-2lg border border-jacarta-100 bg-light-base p-5 text-center transition-shadow hover:shadow-lg dark:border-jacarta-600 dark:bg-jacarta-800"
                            >
                              <span className="text-sm uppercase text-accent">
                                {e.type}
                              </span>
                              <span className="text-base text-jacarta-700 dark:text-white">
                                {e.value}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="rounded-t-2lg rounded-b-2lg rounded-tl-none border border-jacarta-100 bg-white p-6 dark:border-jacarta-600 dark:bg-jacarta-700 md:p-10">
                      <div className="mb-2 flex items-center">
                        <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
                          Contract Address:
                        </span>
                        <a href="" className="text-accent">
                          {nft.collection}
                        </a>
                      </div>
                      <div className="mb-2 flex items-center">
                        <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
                          Token ID:
                        </span>
                        <span
                          className="js-copy-clipboard cursor-pointer select-none text-jacarta-700 dark:text-white"
                          data-tippy-content="Copy"
                        >
                          {tokenId}
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
                          Token Standard:
                        </span>
                        <span className="text-jacarta-700 dark:text-white">
                          ERC-721
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 min-w-[9rem] dark:text-jacarta-300">
                          Blockchain:
                        </span>
                        <span className="text-jacarta-700 dark:text-white">
                          Ethereum
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NFTPage;
