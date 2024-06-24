import React, { useEffect, useState } from "react";
import {
  getProfileData,
  saveProfileData,
  updateName,
} from "../Api/saveProfileData";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";

function Changename({name}) {
  const navigate =useNavigate()
  const location = useLocation();

  // console.log('name',location);

  const [inputText, setInputText] = useState(location?.state?.name);
  const [currentProfileUid, setcurrentProfileUid] = useState("");
  const [textLeng, setTextLeng] = useState(0);

  // console.log(inputText);
  const handleTextChange = (text) => {
    if (text.length <= 30) {
      setTextLeng(text.length);
      setInputText(text);
    }
  };
  // const letterCount = inputText.length;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfileData();
        console.log(data);
        setcurrentProfileUid(data?._id);
        console.log(data?._id);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [currentProfileUid]);

  const saveChanges = async () => {
    console.log("current id", currentProfileUid);
    if (inputText === "") {
      alert("Name is required");
    } else {
      try {
        const name = inputText;

        if (currentProfileUid === "" || currentProfileUid === undefined) {
          await saveProfileData(name); // Pass inputText value to saveProfileData
          console.log("Profile data saved successfully.");
        } else {
          await updateName(name, currentProfileUid).then(()=>{
            navigate("/editprofile")
          }); // Pass inputText value to updateName
          console.log("Name updated successfully.");
        }
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  const goBack = () => {
    window.history.back(); // This will navigate back to the previous page in the browser history
};
  // console.log("hejek", currentProfileUid);
  return (
    <div>
      <div className="flex justify-between m-2">
        <img onClick={goBack} src="backicon.png" alt="" />
        <div className="flex items-center">
          <p className="text-white text-sm font-thin">Name</p>
        </div>
        <button className="text-[#00FF00]" onClick={saveChanges}>
          Save
        </button>
      </div>

      <div className="p-5 ">
        <p className="text-[#A1A3A7] mb-2 font-thin mt-2 text-sm ">Name</p>
        <input
          type="text"
          value={inputText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="text-white border-b h-6 border-[#A1A3A7] p-2 w-full bg-[#110e0f]"
        />
        <p className="text-[#A1A3A7] mb-2 font-thin mt-2 text-xs ">{textLeng}/30</p>
      </div>
    </div>
  );
}

export default Changename;
