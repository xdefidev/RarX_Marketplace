import React from 'react';
import Image from "next/image";
import testNFT from '../../../public/test.jpg'
import CollectionCard from '@/components/cards/CollectionCard';

const TopCollections = ({ collections }) => {
    return (
        <section className="relative py-24" id='pageBack'>
            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
                <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
            </picture>
            <div className="container">
                <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">
                    Explore Collections
                </h1>

                {/* loop collections here  */}
                <div class="grid grid-cols-1 gap-[1.875rem] md:grid-cols-3 lg:grid-cols-4">
                    {collections?.map((e) => (
                        <CollectionCard Cover={e.image} Name={e.name} OwnerAddress={e.owner} CollectionAddress={e.owner} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TopCollections