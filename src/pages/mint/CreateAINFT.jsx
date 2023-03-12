import React, { useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CreateAINFT = ({ defaultCol }) => {
    const [prediction, setPrediction] = useState(null);
    const [predictionOutput, setPredictionOutput] = useState(null);
    const [predictionReady, setPredictionReady] = useState(false);
    const [error, setError] = useState(null);

    const [showMintForm, setShowMintForm] = useState(false);
    const [loading, set_loading] = useState(false);
    const [loadingPrediction, set_loadingPrediction] = useState(false);
    const [propModel, setPropModel] = useState(false);

    const [properties, set_properties] = useState([{ type: "", value: "" }]);
    const [data, set_data] = useState({
        image: "",
        name: "",
        description: "",
        collection: "",
        properties: properties,
    });

    const handleChange = (e) => {
        set_data({ ...data, [e.target.name]: e.target.value });
    };

    const handle_change_input = (index, e) => {
        const values = [...properties];
        values[index][e.target.name] = e.target.value;
        set_properties(values);
    };

    const handle_add_field = () => {
        set_properties([...properties, { type: "", value: "" }]);
    };

    const handle_remove_field = (index) => {
        const values = [...properties];
        values.splice(index, 1);
        set_properties(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            set_loading(true);
            console.log(data);
            // await create_token(data);
        } catch (error) {
            console.log(error);
        }
        set_loading(false);
    };

    const handleAISubmit = async (e) => {
        e.preventDefault();
        set_loadingPrediction(true);
        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: e.target.prompt.value,
            }),
        });
        let prediction = await response.json();
        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }
        setPrediction(prediction);

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
        ) {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
            console.log({ prediction })
            setPrediction(prediction);
            if (prediction.output) {
                setPredictionOutput(prediction.output[prediction.output.length - 1]);
                setPredictionReady(true);
                set_loadingPrediction(false);
            }
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {!showMintForm &&
                        <form onSubmit={handleAISubmit} className="relative py-24">
                            <div className="container">
                                <h1 className="pt-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-black">
                                    Create AI NFT
                                </h1>
                                <p className="mb-14 mt-4 text-center text-2xs dark:text-jacarta-300">
                                    Write some information about a situation or condition and <br /> AI will generate a random NFT for you
                                </p>
                                <div className=" flex flex-col justify-center align-middle text-center">
                                    <div className="mb-6">
                                        {/* nft prediction response here  */}
                                        {predictionOutput ? (
                                            <>
                                                <div className="ml-20 flex items-center justify-center">
                                                    <img
                                                        src={predictionOutput}
                                                        alt="predictionOutput"
                                                        className="h-[300px] w-[auto] rounded-lg border-2 border-gray-500"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-white py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700 lg:ml-[360px]">
                                                {loadingPrediction == true ?

                                                    <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    :
                                                    <div className="relative z-10">
                                                        <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                                                            Generate prediction to view image
                                                        </p>
                                                    </div>
                                                }

                                            </div>
                                        )}
                                    </div>
                                    {/* nft prediction text  */}
                                    <div className="mb-6">
                                        <textarea
                                            name="prompt"
                                            id="prompt"
                                            className="w-[28.125rem] rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black dark:placeholder:text-jacarta-300"
                                            rows="4"
                                            required
                                            placeholder="Provide a short description of a NFT Image you want to generate"
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-center">
                                        {loadingPrediction == true ?
                                            <button
                                                disabled
                                                type="button"
                                                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white transition-all w-[250px]"
                                            >
                                                Generating {" "}
                                                <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </button>
                                            :
                                            <button
                                                type="submit"
                                                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer w-[250px]"
                                            >
                                                Generate Prediction
                                            </button>
                                        }

                                        {predictionReady &&
                                            <button
                                                onClick={() => setShowMintForm(true)}
                                                type="button"
                                                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer ml-4 w-[250px]"
                                            >
                                                Mint NFT
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    }

                    {/* minting form  */}
                    {showMintForm &&
                        <form onSubmit={handleSubmit} className="relative py-24">
                            <div className="container">
                                <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-black">
                                    Create AI NFT
                                </h1>
                                <div className="mx-auto max-w-[48.125rem]">
                                    {/* <!-- File Upload --> */}
                                    <div className="mb-6">
                                        <p className="mb-3 text-2xs dark:text-jacarta-300">
                                            Your generated nft prediction will appear here
                                        </p>

                                        {/* nft prediction response here  */}
                                        {predictionOutput ? (
                                            <>
                                                <div>
                                                    <img
                                                        src={predictionOutput}
                                                        alt="predictionOutput"
                                                        className="h-44 rounded-lg border-2 border-gray-500"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-white py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700">
                                                <div className="relative z-10 cursor-pointer">
                                                    <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                                                        Generate to view image
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <label
                                        htmlFor="item-name"
                                        className="mb-2 block font-display text-jacarta-700 dark:text-black mt-6"
                                    >
                                        <span className="text-red">* </span> Please Fill The Below Form To Mint The NFT<span className="text-red"> *</span>
                                    </label>

                                    {/* <!-- Name --> */}
                                    <div className="mb-6 mt-6">
                                        <label
                                            htmlFor="item-name"
                                            className="mb-2 block font-display text-jacarta-700 dark:text-black"
                                        >
                                            Name<span className="text-red">*</span>
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            name="name"
                                            type="text"
                                            id="item-name"
                                            className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black dark:placeholder:text-jacarta-300 text-black"
                                            placeholder="Item name"
                                            required
                                        />
                                    </div>

                                    {/* <!-- Description --> */}
                                    <div className="mb-6">
                                        <label
                                            htmlFor="item-description"
                                            className="mb-2 block font-display text-jacarta-700 dark:text-black"
                                        >
                                            Description
                                            <span className="text-red">*</span>
                                        </label>
                                        <p className="mb-3 text-2xs dark:text-jacarta-300">
                                            The description will be included on the nft detail page.
                                        </p>
                                        <textarea
                                            onChange={handleChange}
                                            name="description"
                                            id="item-description"
                                            className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black dark:placeholder:text-jacarta-300"
                                            rows="4"
                                            required
                                            placeholder="Provide a detailed description of your item."
                                        ></textarea>
                                    </div>

                                    {/* select collection  */}
                                    <div className="relative">
                                        <div>
                                            <label className="mb-2 block font-display text-jacarta-700 dark:text-black">
                                                Collection
                                            </label>
                                            <div className="mb-3 flex items-center space-x-2">
                                                <p className="text-2xs dark:text-jacarta-300">
                                                    This is the collection where your nft will appear.{" "}
                                                    <Link
                                                        href="/mint/CreateNFTCollection"
                                                        target="_blank"
                                                        className="underline"
                                                    >
                                                        Create a new collection{" "}
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                        <select
                                            name="select"
                                            className="dropdown my-1 cursor-pointer w-[100%]"
                                        >
                                            <option value={defaultCol}>
                                                RarX Marketplace Collection
                                            </option>
                                            {/* create a loop of fetched nft collections of users  */}
                                        </select>
                                    </div>

                                    {/* <!-- Properties --> */}
                                    <div className="relative border-b border-jacarta-100 py-6 dark:border-jacarta-600 mb-6 mt-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    className="mr-2 mt-px h-4 w-4 shrink-0 fill-jacarta-700 dark:fill-white"
                                                >
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" />
                                                </svg>

                                                <div>
                                                    <label className="block font-display text-jacarta-700 dark:text-black">
                                                        Properties
                                                    </label>
                                                    <p className="dark:text-jacarta-300">
                                                        Textual traits that show up as rectangles.
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent bg-white hover:border-transparent hover:bg-accent dark:bg-jacarta-700"
                                                type="button"
                                                id="item-properties"
                                                data-bs-toggle="modal"
                                                data-bs-target="#propertiesModal"
                                                onClick={() => setPropModel(!propModel)}
                                            >
                                                {!propModel ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        className="fill-accent group-hover:fill-white"
                                                    >
                                                        <path fill="none" d="M0 0h24v24H0z" />
                                                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                        className="h-6 w-6 fill-jacarta-500 group-hover:fill-white"
                                                    >
                                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* <!-- Properties Modal --> */}
                                    {propModel && (
                                        <div>
                                            <div className="max-w-2xl mb-4">
                                                <div className="modal-content">
                                                    <div className="modal-body p-6">
                                                        {properties.map((e, index) => (
                                                            <div className="relative my-3 flex items-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handle_remove_field(index)}
                                                                    className="flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-l-lg border border-r-0 border-jacarta-100 bg-jacarta-50 hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        width="24"
                                                                        height="24"
                                                                        className="h-6 w-6 fill-jacarta-500 dark:fill-jacarta-300"
                                                                    >
                                                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                                                        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path>
                                                                    </svg>
                                                                </button>

                                                                <div className="flex-1">
                                                                    <input
                                                                        onChange={(e) => handle_change_input(index, e)}
                                                                        name="type"
                                                                        type="text"
                                                                        className="h-12 w-full border border-r-0 border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black dark:placeholder-jacarta-300"
                                                                        placeholder="Type"
                                                                    />
                                                                </div>

                                                                <div className="flex-1">
                                                                    <input
                                                                        onChange={(e) => handle_change_input(index, e)}
                                                                        name="value"
                                                                        type="text"
                                                                        className="h-12 w-full rounded-r-lg border border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-black dark:placeholder-jacarta-300"
                                                                        placeholder="Value"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <button
                                                            type="button"
                                                            onClick={handle_add_field}
                                                            className="mt-2 rounded-full border-2 border-accent py-2 px-8 text-center text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-white"
                                                        >
                                                            Add More
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* <!-- Submit nft form --> */}
                                    <button
                                        type="submit"
                                        className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer"
                                    >
                                        Create NFT
                                    </button>
                                </div>
                            </div>
                        </form>
                    }
                </>
            )}
        </>
    )
}

export default CreateAINFT