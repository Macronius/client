// javascript library
import React, { createContext, useContext } from 'react';
// thirdweb
import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from '@thirdweb-dev/react';
// smart contract interaction
import { ethers } from 'ethers';

/* PURPOSE OF THIS CONTEXT
store all web3 logic
then wrap application with this context so that every single page and component can use it without any conflict
A centralized source of truth
*/

const StateContext = createContext();

//
export const StateContextProvider = ({ children }) => {
  /* _EVERYTHING NEEDED TO INTERACT WITH THE SMART CONTRACT */
  // address of smart contract
  const { contract } = useContract(
    '0xB8044b43F268656D70dA446AB400fbF91CA4D07d'
  );
  // write contract function from contract: mutateAsync renamed as createCampaign; pass the contract and specify which write-function
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  );
  // address of smart wallet
  const address = useAddress();
  const connect = useMetamask();

  /* _FUNCTIONS */
  // publishCampaign
  const publishCampaign = async (form) => {
    try {
      // defensive programming
      // data from: web3 > contracts > CrowdFunding.sol _> createCampaign
      const data = await createCampaign([
        address, // from the owner who created the campaign
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        // form.amountCollected,
        form.image,
      ]);
      console.log('Contract Call: DATA AQUIRED SUCCESSFULLY: ', data);
    } catch (err) {
      console.log('Contract CALL: FAILED TO AQUIRE DATA:', err);
    }
  };

  // GET ALL CAMPAIGNS
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');
    // parse
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      key: i,
      pId: i,
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
    }));
    //
    return parsedCampaigns;
  };

  // GET ONLY A PARTICULAR USER'S CAMPAIGNS
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  // DONATE TO A CAMPAIGN
  // TODO: change donate to donateToCampaign
  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  // GET DONATIONS
  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i]).toString(),
      });
    }
    return parsedDonations;
  };

  /* RETURNED CONTEXT-PROVIDER COMPONENT */
  return (
    <StateContext.Provider
      value={{
        // values
        address,
        connect,
        contract,
        // functions
        createCampaign: publishCampaign, // rename publishCampaign to createCampaign
        getCampaigns,
        getUserCampaigns,
        donate, // TODO: change donate to donateToCampaign
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

/* CUSTOM HOOK TO UTILIZE THE CONTEXT */
export const useStateContext = () => useContext(StateContext);
// QUESTION: why not pass StateContextProvider to useContext()?
// QUESTION: how is this StateContext-user connected to the StateContextProvider?
