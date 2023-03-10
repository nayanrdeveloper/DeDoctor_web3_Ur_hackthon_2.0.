import deDoctorABI from "@/constants/constants";
import { pharmacyUpdateStep } from "@/features/pharmacyStepSlice";
import usePharmacyIPFs from "@/hooks/pharmacyStoreIpfs";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OwnerDetails from "./OwnerDetails";
import PharmacyPersonal from "./PharmacyPersonal";
import PharmacyVerification from "./PharmacyVerification";
import PreferencePharmacy from "./PreferencePharmacy";
import { useAccount, useProvider, useSigner } from "wagmi";
import { NFTStorage, File } from "nft.storage";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type pharmacyStruct = {
  name: string;
  address: string;
  city: string;
  state: string;
  about: string;
};

type pharmacyOwnerStruct = {
  name: string;
  gender: string;
  dob: string;
  city: string;
  state: string;
  about: string;
};

type pharmacyCouncilStruct = {
  councilNumber: string;
  medicineSpecialization: string;
};

type pharmacyPreference = {
  openDays: string[];
  startTime: string;
  endTime: string;
};

function RegisterPharmacy() {
  // const { write, data, error, isSuccess } = useContractWrite({
  //   mode: "recklesslyUnprepared",
  //   address: "0x752af2Fe8473819728303C75B6740A2Df5e200fB",
  //   abi: deDoctorABI,
  //   functionName: "registerPharmacy",
  //   chainId: 8081,
  // });

  const doctorStep = useSelector(
    (state: RootState) => state.pharmacyStep.value
  );
  const dispatch = useDispatch();
  // Pharmacy Data
  const [pharmacyPersonaData, setPharmacyPersonalData] =
    useState<pharmacyStruct>({
      name: "",
      address: "",
      city: "",
      state: "",
      about: "",
    });
  const [pharmacyImage, setPharmacyImage] = useState<any>();
  //   Pharmacy Owner data
  const [pharmacyOwnerData, setPharmacyOwnerData] =
    useState<pharmacyOwnerStruct>({
      name: "",
      gender: "",
      dob: "",
      city: "",
      state: "",
      about: "",
    });
  const [pharmacyOwnerImage, setPharmacyOwnerImage] = useState<any>();
  //   Pharmacy Verification
  const [pharmacyVerificationData, setPharmacyVerificationData] =
    useState<pharmacyCouncilStruct>({
      councilNumber: "",
      medicineSpecialization: "",
    });
  const [pharmacyVerificationDoc, setPharmacyVerificationDoc] = useState<any>();
  // Pharmacy Preference
  const [pharmacyPreferenceData, setPharmacyPreferenceData] =
    useState<pharmacyPreference>({
      openDays: [],
      startTime: "",
      endTime: "",
    });
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnecting, isDisconnected } = useAccount();
  const onSubmitPharmacy = async () => {
    try {
      console.log("Start");
      
      const nftStorage = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API || "",
      });
      const link = await nftStorage.store({
        image: pharmacyImage,
        name: pharmacyPersonaData.name,
        description: pharmacyPersonaData.about || "",
        address: pharmacyPersonaData.address,
        city: pharmacyPersonaData.city,
        state: pharmacyPersonaData.state,

        ownerImage: pharmacyOwnerImage,
        ownerName: pharmacyOwnerData.name,
        gender: pharmacyOwnerData.gender,
        dob: pharmacyOwnerData.dob,
        ownerCity: pharmacyOwnerData.city,
        ownerState: pharmacyOwnerData.state,
        ownerAbout: pharmacyOwnerData.about,

        pharmacyVerificationDoc: pharmacyVerificationDoc,
        councilNumber: pharmacyVerificationData.councilNumber,
        medicineSpecialization: pharmacyVerificationData.medicineSpecialization,

        openDays: pharmacyPreferenceData.openDays,
        startTime: pharmacyPreferenceData.startTime,
        endTime: pharmacyPreferenceData.endTime,
      });
      const ipfsURL = `https://ipfs.io/ipfs/${link.url.substr(7)}`;
      let patientRegisterContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer || provider
      );
      console.log(ipfsURL);
      
      let traction = await patientRegisterContract.registerPharmacy(
        pharmacyPersonaData.name,
        pharmacyPersonaData.city,
        pharmacyOwnerData.name,
        address,
        pharmacyVerificationData.councilNumber,
        ipfsURL
      );
      let tx = await traction.wait();
      console.log(tx);
      
      toast.success("Pharmacy Register Succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // console.log("Submit Phamacy");
    // const link: any = await usePharmacyIPFs(
    //   pharmacyPersonaData,
    //   pharmacyImage,
    //   pharmacyOwnerData,
    //   pharmacyOwnerImage,
    //   pharmacyVerificationData,
    //   pharmacyVerificationDoc,
    //   pharmacyPreferenceData
    // );
    // const dataPharmacy : any = await write?.({
    //   recklesslySetUnpreparedArgs: [
    //     pharmacyPersonaData.name,
    //     pharmacyPersonaData.city,
    //     pharmacyOwnerData.name,
    //     address,
    //     pharmacyVerificationData.councilNumber,
    //     link,
    //   ],
    // });
    // console.log("End");
  };

  const registrationSteps = [
    {
      id: 1,
      title: "Registration",
      subTitle: "Enter Pharmacy Details",
      component: (
        <PharmacyPersonal
          pharmacyPersonaData={pharmacyPersonaData}
          setPharmacyPersonalData={setPharmacyPersonalData}
          pharmacyImage={pharmacyImage}
          setPharmacyImage={setPharmacyImage}
        />
      ),
      step: 1,
    },
    {
      id: 2,
      title: "Owner Details",
      subTitle: "Enter pharmacy owner Details",
      component: (
        <OwnerDetails
          pharmacyOwnerData={pharmacyOwnerData}
          setPharmacyOwnerData={setPharmacyOwnerData}
          pharmacyOwnerImage={pharmacyOwnerImage}
          setPharmacyOwnerImage={setPharmacyOwnerImage}
        />
      ),
      step: 2,
    },
    {
      id: 3,
      title: "Pharmacy Verification",
      subTitle: "Identification of your Pharmacy",
      component: (
        <PharmacyVerification
          pharmacyVerificationData={pharmacyVerificationData}
          setPharmacyVerificationData={setPharmacyVerificationData}
          pharmacyVerificationDoc={pharmacyVerificationDoc}
          setPharmacyVerificationDoc={setPharmacyVerificationDoc}
        />
      ),
      step: 3,
    },
    {
      id: 4,
      title: "Preferences",
      subTitle: "Setup Your Preferences for your Account",
      component: (
        <PreferencePharmacy
          pharmacyPreferenceData={pharmacyPreferenceData}
          setPharmacyPreferenceData={setPharmacyPreferenceData}
          onSubmitPharmacy={onSubmitPharmacy}
        />
      ),
      step: 4,
    },
  ];

  return (
    <div className="px-5 py-3">
      <ToastContainer theme="light" />
      <div className="flex flex-col md:flex-row space-x-5 space-y-5">
        <div className="space-y-3 md:w-[24rem]">
          {registrationSteps.map((registrationStep) => {
            return (
              <div
                key={registrationStep.id}
                className="flex space-x-2 px-2 py-3 shadow-lg rounded-md cursor-pointer border border-[#F4F4F4] dark:border-dark-input-border dark:bg-dark-card"
                onClick={() =>
                  dispatch(pharmacyUpdateStep(registrationStep.id - 1))
                }
              >
                <div className="rounded-full p-2 bg-[#10916F] text-white w-10 h-10 text-center dark:bg-primary-yellow dark:text-black">
                  {registrationStep.step}
                </div>
                <div>
                  <h5 className="font-semibold dark:text-white">
                    {registrationStep.title}
                  </h5>
                  <p className="text-[#585858] dark:text-dark-muted">
                    {registrationStep.subTitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full">{registrationSteps[doctorStep].component}</div>
      </div>
    </div>
  );
}

export default RegisterPharmacy;
