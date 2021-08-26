import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className="w-full h-full flex z-10 bg-opacity-75 justify-center bg-white pt-40 mx-auto  ">
      <div className={classes.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
