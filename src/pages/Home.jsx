import React, { useEffect, useState } from 'react';
//
import { useStateContext } from '../context';
// components
import { DisplayCampaigns } from '../components';

const Home = () => {
  //
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]); // campaigns in state because they need to be fetched from the smart contract

  const { address, contract, getCampaigns } = useStateContext();

  // 1st: initial call of getCampaigns
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
      // QUESTION: why did getCampaigns need to go through one more layer of asynchronicity
    }
  }, [address, contract]);

  //
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
