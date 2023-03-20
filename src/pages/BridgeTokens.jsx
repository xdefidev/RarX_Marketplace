import Link from 'next/link'
import React from 'react'

const BridgeTokens = () => {
    return (
        <form className="relative py-24">
            <div className="container">
                <h1 className="pt-16 text-center font-display text-4xl font-medium text-jacarta-700 ">
                    Bridge Your Tokens
                </h1>
                <p className="mb-3 mt-2 text-center text-sm font-medium text-jacarta-700">
                    Bridge tokens functionality is under maintenance, will notify once added
                </p>
                <div className=" flex justify-center">
                    <Link
                        href="/"
                        className="rounded-full bg-accent mt-8 py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </form>
    )
}

export default BridgeTokens