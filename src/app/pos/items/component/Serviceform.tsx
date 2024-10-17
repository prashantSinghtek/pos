import Tabs from "@/app/Components/Tabs";
import TextInput from "@/app/Components/Textinput";
import React, { useState } from "react";
import { RiDropboxFill } from "react-icons/ri";
import Pricing from "./Pricing";
import { customStyles } from "@/app/Components/Customstyle";
import Select from "react-select";
import { ErrorMessage, Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectServiceForm } from "@/Redux/Item/selectors";
import * as Yup from "yup";
import { updateServiceForm } from "@/Redux/Item/reducer";

export default function ProductForm({
  setProductupdate,
  selectedproduct,
}: any) {
  const [pricevalue, setPricevalue] = useState<any>({});
  const [productcodevalue, setProductcodevalue] = useState("");
  const [selectedunit, setSelectedUnit] = useState<any>(
    selectedproduct?.service?.unit || null
  );
  const [selectedcategory, setSelectedCategory] = useState<any>(null);
  const [unit, setUnit] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [fieldValue, setFieldValue] = useState<File[]>([]);

  // Correct usage
  const handleImageChange = (newFiles: FileList | null) => {
    if (newFiles) {
      setFieldValue(Array.from(newFiles));
    }
  };
  const dispatch = useDispatch();
  const formData = useSelector(selectServiceForm);

  // Function to generate random service code and return it
  const generateRandomNumber = () => {
    const randomNum = Math.floor(Math.random() * 9000000000) + 1000000000;
    setProductcodevalue(randomNum.toString());
    return randomNum.toString(); // Return the random code as a string
  };

  // Handle unit selection change
  const handleUnitChange = (selectedOption: any) => {
    setSelectedUnit(selectedOption);
  };

  // Handle category selection change
  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption);
  };

  const allcategory = category?.map((option: any) => ({
    value: option.name.toUpperCase(),
    label: option.name.toUpperCase(),
    id: option.id,
  }));

  const allunits = unit?.map((option: any) => ({
    value: option.name.toUpperCase(),
    label: option.name.toUpperCase(),
    id: option.id,
  }));

  const submitForm = async (
    values: any,
    { setSubmitting, resetForm, setTouched }: any
  ) => {
    // Mark all fields as touched to trigger validation
    setTouched({
      serviceName: true,
      serviceHSN: true,
      serviceCode: true,
      unit: true,
      Category: true,
    });

    console.log("submitted values", values);

    // Check if the form is valid
    const isValid = await validationSchema.isValid(values);
    if (isValid) {
      console.log("Form Submitted:", values);
    } else {
      console.log("Form validation failed");
    }

    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service name is required"),
    serviceHSN: Yup.string().required("HSN is required"),
    serviceCode: Yup.string().required("Service code is required"),
  });

  const content = [<Pricing />];
  const heading = [
    {
      icon: <RiDropboxFill size={25} />,
      title: "PRICING",
    },
  ];

  return (
    <div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        validateOnMount={true} // Ensure validation is performed on mount
        validateOnChange={false} // Prevent validation on each change
      >
        {({ handleSubmit, isSubmitting, errors, touched, setFieldValue }) => (
          <>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center py-3 border-b">
                <div>Add Product</div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#fda80c] rounded-lg px-5 py-2 text-white"
                >
                  {formData.id ? "Update" : "Add"}
                </button>
              </div>

              <div className="flex items-end gap-5 my-5 w-full">
                <div className="w-[33%]">
                  <Field name="serviceName">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        label="Service Name"
                        istouched={touched.serviceName}
                        className="text-gray-800 text-base w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="serviceName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="w-[33%]">
                  <Field name="serviceHSN">
                    {({ field }: any) => (
                      <TextInput
                        {...field}
                        type="text"
                        label="HSN"
                        istouched={touched.serviceHSN}
                        className="text-gray-800 text-base w-full"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="serviceHSN"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="w-[25%] flex flex-col space-y-2">
                  <div className="text-[#808080]">Unit</div>
                  <Select
                    name="unit"
                    options={allunits}
                    value={selectedunit}
                    onChange={handleUnitChange}
                    styles={customStyles}
                    className="w-full bg-white rounded-md text-primary text-sm"
                  />
                </div>
              </div>
              <div className="flex items-end gap-5 my-5 w-full">
                <div className="w-[30%] flex flex-col space-y-2">
                  <div className="text-[#808080]">Category</div>
                  <Select
                    name="Category"
                    options={allcategory}
                    value={selectedcategory}
                    onChange={handleCategoryChange}
                    styles={customStyles}
                    className="w-full bg-white rounded-md text-primary text-sm"
                  />
                </div>

                <div className="w-[33%] flex items-center">
                  {/* Service Code Input */}
                  <Field name="serviceCode">
                    {({ field, form }: any) => (
                      <div className="w-full relative">
                        <TextInput
                          {...field}
                          disabled={true}                               
                          type="text"
                          label="Service Code"
                          istouched={touched.serviceCode}
                          className="text-gray-800 text-base w-full"
                        />
                        <ErrorMessage
                          name="serviceCode"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    )}
                  </Field>
                  {/* Assign Code Button */}
                  <div
                    className="ml-3 px-5 h-[40px] text-xs border border-gray-300 bg-[#E1F2FB] text-gray-500 rounded-lg flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      const randomCode = generateRandomNumber(); // Generate the random code
                      setFieldValue("serviceCode", randomCode); // Set the random code in the serviceCode field
                    }}
                  >
                    Assign Code
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-5 my-5 w-full">
                <div className="w-[20%] flex-col space-y-2">
                  <div>Image</div>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e.target.files)}
                    accept="image/*"
                    multiple
                    className="text-gray-500 border-gray-400 border rounded"
                  />
                </div>
              </div>

                <Tabs heading={heading} content={content} />
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}
