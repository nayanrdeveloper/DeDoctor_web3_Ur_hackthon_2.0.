import Image from "next/image";
import React from "react";
import { GoLocation, GoThumbsup } from "react-icons/go";
import {
  BsChat,
  BsBookmark,
  BsFillTelephoneFill,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import { BiMoney, BiChat } from "react-icons/bi";

function ProfileGeneral() {
  return (
    <div className="flex flex-col md:flex-row space-y-3 justify-between px-5 py-5 border border-[#f0f0f0] rounded-lg">
      {/* Left Side Profile general */}
      <div className="flex flex-col md:flex-row space-x-2 mx-auto md:mx-0">
        <div className="relative h-48 w-48">
          <Image
            src={
              "https://doccure.dreamguystech.com/react/template/7058680646be673ef70f79e43f408408.jpg"
            }
            alt={"Nayan"}
            fill
          />
        </div>
        <div className="space-y-2">
          <h5 className="text-lg font-medium text-[#272b41]">
            Dr. Darren Elder
          </h5>
          <p className="text-[#757575]">
            BDS, MDS - Oral and Maxillofacial Surgery
          </p>
          <p className="text-primary-blue">Dentist</p>
          <div className="flex space-x-2 text-[#757575] items-center">
            <GoLocation className="h-6 w-6" />
            <span> Newyork, USA</span>
          </div>
        </div>
      </div>

      {/* Right Feedback, Appointment */}
      <div className="space-y-2 items-center mx-auto md:mx-0">
        <div className="space-y-2 text-[#4E4852]">
          <div className="flex space-x-2 items-center">
            <GoThumbsup className="h-6 w-6" />
            <span>99%</span>
          </div>
          <div className="flex space-x-2 items-center">
            <BsChat className="h-6 w-6" />
            <span>35 Feedback</span>
          </div>
          <div className="flex space-x-2 items-center">
            <GoLocation className="h-6 w-6" />
            <span>Newyork, USA</span>
          </div>
          <div className="flex space-x-2 items-center">
            <BiMoney className="h-6 w-6" />
            <span>$100 per hour</span>
          </div>
        </div>
        <div className="flex space-x-2 text-[#272b41]">
          <div className="border border-[#ccc] rounded-md p-2 hover:bg-primary-green hover:text-white">
            <BsBookmark className="h-5 w-5" />
          </div>
          <div className="border border-[#ccc] rounded-md p-2 hover:bg-primary-green hover:text-white">
            <BiChat className="h-5 w-5" />
          </div>
          <div className="border border-[#ccc] rounded-md p-2 hover:bg-primary-green hover:text-white">
            <BsFillTelephoneFill className="h-5 w-5" />
          </div>
          <div className="border border-[#ccc] rounded-md p-2 hover:bg-primary-green hover:text-white">
            <BsFillCameraVideoFill className="h-5 w-5" />
          </div>
        </div>
        <button className="px-3 py-3 bg-primary-blue text-white rounded-md text-xl font-medium">Book Appointment</button>
      </div>
    </div>
  );
}

export default ProfileGeneral;