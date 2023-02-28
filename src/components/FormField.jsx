import React from 'react';

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex flex-col flex-1 w-full ">
      {labelName && (
        <span className="font-epilogue font-medium text-4 leading-6 text-[#808191] mb-2">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          row={10}
          className="py-4 px-4 sm:px-6  outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-sm placeholder:text-[#4b5264] rounded-lg sm:min-w-[300px]"
          required
        />
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          step="0.1"
          className="py-4 px-4 sm:px-6  outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-sm placeholder:text-[#4b5264] rounded-lg sm:min-w-[300px]"
          required
        />
      )}
    </label>
  );
};

export default FormField;
