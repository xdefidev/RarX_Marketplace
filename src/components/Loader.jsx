import React from "react";
import { BiLoaderCircle, BiLoaderAlt } from "react-icons/bi";
const Loader = () => {
  return (
    // old loader 
    // <div className="absolute h-full w-full flex justify-center items-center bg-white ">
    //   <BiLoaderAlt className="h-52 w-[70px] animate-spin" />
    // </div>


    // new loader 
    <div className="absolute h-full w-full flex justify-center items-center bg-white ">
      <div class="pyramid-loader">
        <div class="wrapper">
          <span class="side side1"></span>
          <span class="side side2"></span>
          <span class="side side3"></span>
          <span class="side side4"></span>
          <span class="shadow"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
