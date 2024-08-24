import React from 'react'

export const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: "46px", // Set your desired height here
      minHeight: "46px", // Ensure the minimum height is the same as the height
      fontSize: "0.875rem", // Equivalent to text-sm
      fontWeight: "500", // Equivalent to font-medium
      borderRadius: "0.375rem", // Equivalent to rounded-md
      backgroundColor: "white", // Equivalent to bg-white
      outline: "none", // Equivalent to outline-none
      // Note: focus-within styles cannot be directly applied to the control
    }),
    // Additional styles for the dropdown menu
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "0.375rem", // Equivalent to rounded-md
    }),
  };