import React from "react";
import { BiLoaderCircle, BiLoaderAlt } from "react-icons/bi";
const Loader = () => {
  return (
    <div className="absolute h-full w-full flex justify-center items-center bg-white ">
      {/* <BiLoaderCircle className="h-52 w-52 animate-spin" /> */}
      <BiLoaderAlt className="h-52 w-[100px] animate-spin" />
    </div>
  );
};

export default Loader;
