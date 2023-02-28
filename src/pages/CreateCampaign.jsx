import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
// context
import { useStateContext } from '../context';
//
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  // navigation (rrd)
  const navigate = useNavigate();
  // contexts
  const { createCampaign } = useStateContext(); // NOTE: from context > index _> line65
  //states
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });
  // handlers
  //___
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  //___
  const handleSubmit = async (e) => {
    e.preventDefault();
    //_ check if image input is legitimate, then initiate creatCampaign process
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
          // NOTE: user input in ETH units, but must be converted to WEI units to 18 decimal places (0.000000000000000001)
        });
        setIsLoading(false);
        //
        navigate('/');
      } else {
        alert('Provide an valid image url');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex flex-col justify-center items-center rounded-3 sm:p-4">
      {isLoading && <Loader />}
      {/* page main content */}
      <div className="flex justify-center items-center p-4 sm:min-w-[380px] bg-[#3a3a43] rounded-lg">
        <h1 className="font-epilogue font-bold sm:text-6 text-4 leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      {/* form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[30px] w-full mt-[65px]"
      >
        {/*  */}
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Ender Wiggin"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Catchy title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        {/*  */}
        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />
        {/*  */}
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-28 rounded-xl">
          <img
            src={money}
            alt="100% proceeds go to campaign"
            className="w-10 h-10 object-contain"
          />
          <h4 className="font-epilogue font-bold text-white ml-5 text-2xl">
            You will get 100% of the raised amount
          </h4>
        </div>
        {/*  */}
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 5.0"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
        <FormField
          labelName="Campaign Image *"
          placeholder="URL of campaign image"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />
        {/* </div> */}
        {/*  */}
        <div className="flex justify-center items-center my-10">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
