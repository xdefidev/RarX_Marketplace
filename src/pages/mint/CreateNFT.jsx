import React from 'react'

const CreateNFT = () => {
    return (
        <>
            <div className="relative py-24">
                <div className="container">
                    <h1 className="py-16 text-center font-display text-4xl font-medium text-jacarta-700 dark:text-white">Create NFT</h1>
                    <div className="mx-auto max-w-[48.125rem]">
                        {/* <!-- File Upload --> */}
                        <div className="mb-6">
                            <label className="mb-2 block font-display text-jacarta-700 dark:text-white"
                            >Image, Video, Audio, or 3D Model<span className="text-red">*</span></label>
                            <p className="mb-3 text-2xs dark:text-jacarta-300">Drag or choose your file to upload</p>

                            <div
                                className="group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-jacarta-100 bg-white py-20 px-5 text-center dark:border-jacarta-600 dark:bg-jacarta-700"
                            >
                                <div className="relative z-10 cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="mb-4 inline-block fill-jacarta-500 dark:fill-white"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path
                                            d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z"
                                        />
                                    </svg>
                                    <p className="mx-auto max-w-xs text-xs dark:text-jacarta-300">
                                        JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
                                    </p>
                                </div>
                                <div
                                    className="absolute inset-4 cursor-pointer rounded bg-jacarta-50 opacity-0 group-hover:opacity-100 dark:bg-jacarta-600"
                                ></div>
                                <input
                                    type="file"
                                    accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf"
                                    id="file-upload"
                                    className="absolute inset-0 z-20 cursor-pointer opacity-0"
                                />
                            </div>
                        </div>

                        {/* <!-- Name --> */}
                        <div className="mb-6">
                            <label htmlFor="item-name" className="mb-2 block font-display text-jacarta-700 dark:text-white"
                            >Name<span className="text-red">*</span></label>
                            <input
                                type="text"
                                id="item-name"
                                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                                placeholder="Item name"
                                required
                            />
                        </div>

                        {/* <!-- Description --> */}
                        <div className="mb-6">
                            <label htmlFor="item-description" className="mb-2 block font-display text-jacarta-700 dark:text-white"
                            >Description</label>
                            <p className="mb-3 text-2xs dark:text-jacarta-300">
                                The description will be included on the fnt detail page.
                            </p>
                            <textarea
                                id="item-description"
                                className="w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                                rows="4"
                                required
                                placeholder="Provide a detailed description of your item."
                            ></textarea>
                        </div>

                        {/* <!-- Collection --> */}
                        <div className="relative">
                            <div>
                                <label className="mb-2 block font-display text-jacarta-700 dark:text-white">Collection</label>
                                <div className="mb-3 flex items-center space-x-2">
                                    <p className="text-2xs dark:text-jacarta-300">
                                        This is the collection where your nft will appear.
                                    </p>
                                </div>
                            </div>

                            <div className="dropdown my-1 cursor-pointer">
                                <div
                                    className="dropdown-toggle flex items-center justify-between rounded-lg border border-jacarta-100 bg-white py-3 px-3 dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-jacarta-300"
                                    role="button"
                                    id="item-collection"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <span className="">Select collection</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="h-4 w-4 fill-jacarta-500 dark:fill-white"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                                    </svg>
                                </div>

                                {/* collection drop down  */}
                                <div className="dropdown-menu z-10 hidden w-full whitespace-nowrap rounded-xl bg-white py-4 px-2 text-left shadow-xl dark:bg-jacarta-800"
                                    aria-labelledby="item-collection">
                                    <ul className="scrollbar-custom flex max-h-48 flex-col overflow-y-auto">
                                        <li>
                                            <a
                                                href="#"
                                                className="dropdown-item flex w-full items-center justify-between rounded-xl px-5 py-2 text-left font-display text-sm transition-colors hover:bg-jacarta-50 dark:text-white dark:hover:bg-jacarta-600"
                                            >
                                                <span className="flex items-center space-x-3">
                                                    <img
                                                        src="img/avatars/collection_ava_1.png"
                                                        className="h-8 w-8 rounded-full"
                                                        loading="lazy"
                                                        alt="avatar"
                                                    />
                                                    <span className="text-jacarta-700 dark:text-white">CryptoKitties</span>
                                                </span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    className="mb-[3px] h-4 w-4 fill-accent"
                                                >
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Properties --> */}
                        <div className="relative border-b border-jacarta-100 py-6 dark:border-jacarta-600 mb-8">
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
                                        <path
                                            d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"
                                        />
                                    </svg>

                                    <div>
                                        <label className="block font-display text-jacarta-700 dark:text-white">Properties</label>
                                        <p className="dark:text-jacarta-300">Textual traits that show up as rectangles.</p>
                                    </div>
                                </div>
                                <button
                                    className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent bg-white hover:border-transparent hover:bg-accent dark:bg-jacarta-700"
                                    type="button"
                                    id="item-properties"
                                    data-bs-toggle="modal"
                                    data-bs-target="#propertiesModal"
                                >
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
                                </button>
                            </div>
                        </div>

                        {/* <!-- Submit nft form --> */}
                        <button className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white transition-all cursor-pointer">
                            Create
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Properties Modal --> */}
            <div className="modal fade" id="propertiesModal" tabIndex="-1" aria-labelledby="addPropertiesLabel" aria-hidden="true">
                <div className="modal-dialog max-w-2xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addPropertiesLabel">Add properties</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="h-6 w-6 fill-jacarta-700 dark:fill-white"
                                >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path
                                        d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* <!-- Body --> */}
                        <div className="modal-body p-6">
                            <p className="mb-8 dark:text-jacarta-300">
                                Item Properties show up underneath your item, are clickable, and can be filtered in your collection's
                                sidebar.
                            </p>

                            <div className="relative my-3 flex items-center">
                                <button
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
                                        <path
                                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                                        ></path>
                                    </svg>
                                </button>

                                <div className="flex-1">
                                    <label className="mb-3 block font-display text-base font-semibold text-jacarta-700 dark:text-white"
                                    >Type</label>
                                    <input
                                        type="text"
                                        className="h-12 w-full border border-r-0 border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder-jacarta-300"
                                        placeholder="Character"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="mb-3 block font-display text-base font-semibold text-jacarta-700 dark:text-white"
                                    >Name</label>
                                    <input
                                        type="text"
                                        className="h-12 w-full rounded-r-lg border border-jacarta-100 focus:ring-inset focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder-jacarta-300"
                                        placeholder="Male"
                                    />
                                </div>
                            </div>

                            <button
                                className="mt-2 rounded-full border-2 border-accent py-2 px-8 text-center text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-white"
                            >
                                Add More
                            </button>
                        </div>
                        {/* <!-- end body --> */}

                        <div className="modal-footer">
                            <div className="flex items-center justify-center space-x-4">
                                <button
                                    type="button"
                                    className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateNFT