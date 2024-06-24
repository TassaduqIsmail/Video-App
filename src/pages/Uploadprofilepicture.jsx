import React from "react";

function Uploadprofilepicture() {
  return (
    <div className="w-full h-full ">
      <img src="backicon.png" alt="" />
      <center>
        <img src="whitelogo.png" className=" mt-16" alt="" />

        <p className="text-white text-2xl mt-20 font-bold">
          Upload profile picture
        </p>
        <div className="p-5 mt-10">
          <div className="relative rounded-full h-28 w-28">
            <img
              className="opacity-20 mt-5 rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              alt=""
            />
            <img
              src="cameraicon.png"
              className="absolute inset-0 m-auto"
              alt=""
            />
          </div>

          <img className="mt-14" src="slide5.png" />

          <div className="flex justify-between">
            <a
              href="statersetyourrate"
              type="button"
              className="mt-20  mb-5 text-white font-thin py-2  rounded-full"
            >
              Skip
            </a>

            <a
              href="statersetyourrate"
              type="button"
              className="mt-20 bg-[#3640c2]  mb-5 text-white font-bold p-4  rounded-full"
            >
              <img src="whiteplayicon.png" />
            </a>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Uploadprofilepicture;
