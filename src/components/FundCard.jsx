import React from 'react';
//utils
import { daysLeft } from '../utils';
//assets
import { tagType, thirdweb } from '../assets';

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  clickHandler,
}) => {
  //
  const remainingDays = daysLeft(deadline);

  // TODO: implement severity color-code for the card background color, severity as a function of deadline
  console.log('amountCollected: ', amountCollected);

  return (
    <div
      className="sm:w-[288px] w-full bg-[#1c1c24] cursor-pointer p-2 rounded-2xl mx-[2px] my-2"
      onClick={clickHandler}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-[158px] object-cover rounded-t-xl"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row mb-4 items-center">
          <img src={tagType} alt="tag" className="w-4 h-4 object-contain" />

          <p className="font-epilogue font-medium text-3 text-[#808191] ml-3">
            Category: help
          </p>
        </div>

        <hr className="bg-gray-800 border-none h-[0.5px] m-1" />

        {/* <p className="font-epilogue font-medium text-3 text-white mt-3">
          Needs:{' '}
          <span className="text-[#808191] leading-5">
            water, sunscreen, protein, marker, alms cup
          </span>
        </p> */}

        <div className="block mt-2">
          <h3 className="font-epilogue font-semibold text-3 text-white text-left leading-5 truncate">
            {title}
          </h3>
          <p className="font-epilogue text-2 text-[#808191] text-left leading-5 line-clamp-2 ">
            {description}
          </p>
        </div>

        <hr className="bg-gray-800 border-none h-[0.5px] m-1" />
        <div className="block mt-2">
          <h3 className="font-epilogue font-semibold text-3 text-white text-left leading-5 truncate">
            Needs:
          </h3>
          <p className="font-epilogue font-normal text-2 text-[#808191] text-left leading-5">
            water, sunscreen, protein, marker, alms cup
          </p>
        </div>

        <hr className="bg-gray-800 border-none h-[0.5px] m-1" />
        <div className="flex justify-between flex-wrap mt-4 gap-2">
          {/* left side */}
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue leading-[18px] text-[#808191] text-sm sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          {/* right side */}
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue leading-[18px] text-[#808191] text-sm sm:max-w-[120px] truncate">
              Days left
            </p>
          </div>
        </div>

        <hr className="bg-gray-800 border-none h-[0.5px] m-1" />
        <div className="flex items-center mt-5">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="ml-4 flex-1 font-epiloge font-normal text-3 text-[#808191] truncate">
            by <span className="text-[#b2b3bd] text-sm truncate">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
