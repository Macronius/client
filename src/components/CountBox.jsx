import React from 'react';

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold text-center text-[30px] text-white p-3 bg-[#1c1c24] w-full rounded-t-[10px] truncate">
        {value}
      </h4>
      <p className="font-epilogue font-normal text-center text-4 text-[#808191] bg-[#28282e] px-3 py-2 w-full rounded-b-[10px]">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
