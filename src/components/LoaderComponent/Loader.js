import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className="w-screen h-screen z-10 bg-opacity-75 bg-white pt-40 mx-auto  ">
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
