import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Link from "next/link";

const Slider = ({}) => {
  return (
    <div className="flex overflow-hidden max-w-full">
      <div>
        <div className="mb-4 flex space-x-4 relative left-[-60px] ">
          <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
            <img
              width={240}
              height={120}
              className=" hover:scale-125 ease-in "
              src={`/gradient.jpg`}
              alt="partner item"
            />
          </div>
          <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
            <img
              width={240}
              height={120}
              className=" hover:scale-125 ease-in"
              src={`/gradient.jpg`}
              alt="partner item"
            />
          </div>
          <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
            <img
              width={240}
              height={120}
              className=" hover:scale-125 ease-in"
              src={`/gradient.jpg`}
              alt="partner item"
            />
          </div>
          <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
            <img
              width={240}
              height={120}
              className=" hover:scale-125 ease-in"
              src={`/gradient.jpg`}
              alt="partner item"
            />
          </div>
          <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
            <img
              width={240}
              height={120}
              className=" hover:scale-125 ease-in"
              src={`/gradient.jpg`}
              alt="partner item"
            />
          </div>
          <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
            <img
              width={240}
              height={120}
              className=" hover:scale-125 ease-in"
              src={`/gradient.jpg`}
              alt="partner item"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

// <div>
// <div className="mb-8 flex space-x-8 relative left-[-120px] ">
//   <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
//     <img
//       width={240}
//       height={120}
//       className=" hover:scale-125 ease-in"
//       src={`/gradient.jpg`}
//       alt="partner item"
//     />
//   </div>
//   <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
//     <img
//       width={240}
//       height={120}
//       className=" hover:scale-125 ease-in"
//       src={`/gradient.jpg`}
//       alt="partner item"
//     />
//   </div>
//   <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
//     <img
//       width={240}
//       height={120}
//       className=" hover:scale-125 ease-in"
//       src={`/gradient.jpg`}
//       alt="partner item"
//     />
//   </div>
//   <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
//     <img
//       width={240}
//       height={120}
//       className=" hover:scale-125 ease-in"
//       src={`/gradient.jpg`}
//       alt="partner item"
//     />
//   </div>
//   <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
//     <img
//       width={240}
//       height={120}
//       className=" hover:scale-125 ease-in"
//       src={`/gradient.jpg`}
//       alt="partner item"
//     />
//   </div>
//   <div className="rounded-lg flex overflow-hidden flex-shrink-0 items-center justify-center border border-jacarta-100 ">
//     <img
//       width={240}
//       height={120}
//       className=" hover:scale-125 ease-in"
//       src={`/gradient.jpg`}
//       alt="partner item"
//     />
//   </div>
// </div>
// </div>
