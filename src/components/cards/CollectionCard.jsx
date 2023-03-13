import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const CollectionCard = ({ Cover, Logo, Name, Description, OwnerAddress, CollectionAddress }) => {
    return (
        <div class="rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700">
            <Link href={`/collection/${CollectionAddress}`} class="relative flex space-x-[0.625rem]">
                <span class="w-[100%]">
                    <Image
                        src={Cover.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        alt="Cover Image"
                        class="h-full w-[100%] rounded-[0.625rem] object-cover"
                        loading="lazy"
                        height={100}
                        width={100}
                    />
                </span>
                <span class="absolute bottom-[-25px] right-20">
                    <Image
                        src={Cover.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                        )}
                        alt="Logo"
                        class="h-[70px] w-[80px] rounded-[100%] "
                        loading="lazy"
                        height={100}
                        width={100}
                    />
                </span>
            </Link>

            <Link href={`/collection/${CollectionAddress}`} class="mt-8 block font-display text-[22px] text-jacarta-700 hover:text-accent dark:text-white dark:hover:text-accent">
                {Name}
            </Link>

            <div class="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                <div class="flex flex-wrap items-center">
                    <span class="mr-1 dark:text-jacarta-400">by</span>
                    {!OwnerAddress == "" ?
                        <Link href={`/profile/${OwnerAddress}`} class="text-accent">
                            <span>{OwnerAddress.slice(0, 5) + "..." + OwnerAddress.slice(38)}</span>
                        </Link>
                        :
                        <Link href="#" class="text-accent">
                            <span>you</span>
                        </Link>
                    }
                </div>
                <span class="text-sm dark:text-jacarta-300">3 NFT Items</span>
            </div>
        </div>
    )
}

export default CollectionCard