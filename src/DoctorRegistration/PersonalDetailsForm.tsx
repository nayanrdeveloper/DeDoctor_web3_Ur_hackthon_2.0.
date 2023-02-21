import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateStep } from "@/features/doctorStepSlice";

type personalData = {
  name: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  about: string;
};

type props = {
  personalData: personalData;
  setPersonalData: (personalData: personalData) => void;
  userImage: any;
  setUserImage: (image: any) => void;
};

const PersonalDetailsForm: React.FC<props> = ({
  personalData,
  setPersonalData,
  userImage,
  setUserImage,
}) => {
  const doctorStep = useSelector((state: RootState) => state.doctorStep.value);
  const dispatch = useDispatch();
  return (
    <div className="form-group">
      <div className="flex w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-96 h-32 border-2 border-[#E6E9F4] border-dashed rounded-lg cursor-pointer bg-[#F5F6FA] dark:bg-dark-blue-input hover:bg-gray-100 dark:border-dark-input-border"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold dark:text-dark-muted">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-muted">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            name="image"
            onChange={(e) =>
              setUserImage(e.currentTarget.files && e.currentTarget.files[0])
            }
          />
        </label>
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="name">
          Legal Name *
        </label>
        <input
          type={"text"}
          name="name"
          id="name"
          value={personalData.name}
          onChange={(e) =>
            setPersonalData({ ...personalData, name: e.currentTarget.value })
          }
          className="input-box"
          placeholder="Enter Name"
        />
      </div>
      <div className="flex space-x-2">
        <div className="input-group">
          <label className="input-label" htmlFor="gender">
            Gender *
          </label>
          <select
            className="input-box"
            placeholder="Select Gender"
            name="gender"
            id="gender"
            value={personalData.gender}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                gender: e.currentTarget.value,
              })
            }
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="dob">
            Date of Birth *
          </label>
          <input
            type={"date"}
            id="dob"
            name="dob"
            className="input-box"
            placeholder="Date of Birth"
            value={personalData.dob}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                dob: e.currentTarget.value,
              })
            }
          />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="address">
          Address *
        </label>
        <textarea
          id="address"
          name="address"
          className="input-box md:w-[30rem]"
          placeholder="Enter Address"
          value={personalData.address}
          onChange={(e) =>
            setPersonalData({
              ...personalData,
              address: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="flex flex-col md:flex-row space-x-2">
        <div className="input-group">
          <label className="input-label" htmlFor="city">
            City *
          </label>
          <input
            type={"text"}
            id="city"
            name="city"
            className="input-box"
            placeholder="City"
            value={personalData.city}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                city: e.currentTarget.value,
              })
            }
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="state">
            State *
          </label>
          <input
            type={"text"}
            id="state"
            name="state"
            className="input-box"
            placeholder="State"
            value={personalData.state}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                state: e.currentTarget.value,
              })
            }
          />
        </div>
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="about">
          About You *
        </label>
        <textarea
          name="about"
          id="about"
          className="input-box md:w-[30rem] h-[6rem]"
          value={personalData.about}
          onChange={(e) =>
            setPersonalData({
              ...personalData,
              about: e.currentTarget.value,
            })
          }
        />
      </div>
      <button
        className="submit-btn"
        onClick={() => dispatch(updateStep(1))}
      >
        Continue
      </button>
    </div>
  );
};

export default PersonalDetailsForm;
