import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Error404 from "../../public/404.png"

const ErrorPage = () => {
    return (
        // <!-- 404 -->
        <section class="relative py-16 dark:bg-jacarta-800 md:py-24 mt-16">
            <div class="container">
                <div class="mx-auto max-w-lg text-center">
                    <Image src={Error404} alt="gradient" class="h-full w-full" />

                    <h1 class="mb-6 font-display text-4xl text-jacarta-700 dark:text-white md:text-6xl">Page Not Found!</h1>
                    <p class="mb-12 text-lg leading-normal dark:text-jacarta-300">
                        Oops! The page you are looking for does not exist. It might have been moved or deleted.
                    </p>
                    <Link
                        href="/"
                        class="inline-block rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                    >Return Home</Link>
                </div>
            </div>
        </section>
    )
}

export default ErrorPage