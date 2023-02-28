import React from 'react';

import { loader } from '../assets';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0, 0.7)] flex items-center justify-center flex-col">
      <img
        src={loader}
        alt="loader component"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-5 font-epilogue font-bold text-xl text-center text-white">
        Transaction in progress
        <br />
        Patience is a virtue, isn't it..?
      </p>
    </div>
  );
};

export default Loader;
