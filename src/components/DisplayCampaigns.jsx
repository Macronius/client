import React from 'react';
// routing
import { useNavigate } from 'react-router-dom';
// assets
import { loader } from '../assets';
// components
import { FundCard } from '../components';

const DisplayCampaigns = ({ campaigns, isLoading, title }) => {
  // routing
  const navigate = useNavigate();
  //
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-5 text-white text-left">
        {title}: {campaigns.length}
      </h1>

      <div className="flex flex-wrap">
        {
          /* check if isloading */
          isLoading && <img src={loader} alt="loader" className="w-24 h-24" />
        }

        {
          /* check if campaigns */
          !isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
              You have not created any campaigns yet.
            </p>
          )
        }

        {
          /* map over the campaigns now */
          !isLoading &&
            campaigns.length > 0 &&
            campaigns.map((campaign) => (
              <FundCard
                key={campaign.pId}
                {...campaign}
                clickHandler={() => handleNavigate(campaign)}
              />
            ))
        }
      </div>
    </div>
  );
};

export default DisplayCampaigns;
