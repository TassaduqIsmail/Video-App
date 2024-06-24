import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../Api/apis";
import { Navigate, useNavigate } from "react-router-dom";

function Editprofile() {
  // const { height, width } = Dimensions.get('window');
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentProfile, setCurrentProfile] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageAssets, setImageAssets] = useState(null);
  const [isloading, setisloading] = useState(false);

  const navigate = useNavigate();
  //   const toggleModal1 = () => {
  //     setModalVisible1(!isModalVisible1);
  //   };

  useEffect(() => {
    const getProfileData = async () => {
      const profileUid = localStorage.getItem("profileUid");
      const uid = localStorage.getItem("uid");

      //    console.log('profileuid', profileUid);
      //    console.log('uid', uid);

      await axios
        .get(`${API.PROFILE.GET_ALL_PROFILE}`)
        .then((response) => {
          //  console.log(response);
          const filteredData = response?.data?.data;
          console.log("filterdata", filteredData);
          if ("Profile not found" === response.data.error) {
            alert(
              "error"
              //   text1: response.data.error,
            );
          } else if ("Profile found" === response.data.message) {
            // alert({
            //   type: 'success',
            //   text1: response.data.msg,
            // }
            // );
            // if(profileUid === response.data.data._id )
            setCurrentProfile({
              name: filteredData[0]?.name,
              username: filteredData[0]?.username,
              price: filteredData[0]?.price,
              pic_url: filteredData[0]?.pic_url,
              proId: filteredData[0]?._id,
              pubId:  filteredData[0]?.pic_public_id
            });
          }
        })
        .catch((error) => {
          console.error("Axios POST request error:", error);
        });
    };

    getProfileData();
  }, [currentProfile]);

  const goBack = () => {
    window.history.back(); // This will navigate back to the previous page in the browser history
  };

  const copyToClipboard = async (username) => {
    try {
      const text = `vinedo.com/@${username}`;
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // console.log("currentpro",currentProfile);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    if (file) {
      const reader = new FileReader();
      console.log("reader", reader);
      reader.onload = () => {
        const base64Data = reader.result;
        if (file.type.startsWith("video/")) {
          const video = document.createElement("video");
          video.onloadedmetadata = () => {
            const duration = video.duration;
            handleUpload(base64Data, file.type, duration);
            console.log("dddd", duration);
          };
          video.src = URL.createObjectURL(file);
        } else {
          handleUpload(base64Data, file.type);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (base64Data, fileType, duration) => {
    // let base64Img = `data:image/jpg;base64,${base64}`;
    // let base64Img = `data:video/mp4;base64,${base64Data}`;
    // var formData = new FormData();
    const formData = {};
    try {
      const filetype = fileType?.split("/");
      if (filetype[0] === "image" || filetype[0] === "video") {
        formData["duration"] = duration !== null ? duration : null;
        formData["base64"] = base64Data;
        formData["type"] = filetype[0] === "image" ? "image" : "video/mp4";
        formData["username"] = currentProfile?.username;
        formData["pic_public_id"] = currentProfile?.pubId;
      }
      // formData.append(item.name, reader.createReadStream(base64Data));
      // console.log("form", filetype);
      // console.log("form", formData);
      // const base64Value = formData.get("base64");
      // const typeValue = formData.get("type");
      // const usernameValue = formData.get("username");

      // console.log("Base64:", base64Value);
      // console.log("Type:", typeValue);
      // console.log("Username:", usernameValue);

      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      // if (formData) {
      // await axios({
      //   method: "post",
      //   url: `${API.IMAGE_VIDEO.UPLOAD_ASSETS}`, formData ,
      //   headers: {
      //     "Content-Type": `multipart/form-data; `,
      //   },
      // })
      let getUid = localStorage.getItem("uid");
      //  await axios({
      //   method: "put",
      //   url: `${API.PROFILE.UPDATE_PROFILE_PIC}/${currentProfile?.proId}`,
      //   data:formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      await axios
        .put(
          `${API.PROFILE.UPDATE_PROFILE_PIC}/${currentProfile?.proId}`,
          formData,
          {
            // headers: {
            //   "Content-Type": "multipart/form-data",
            // },
          }
        )
        .then(function (response) {
          console.log("res", response.data);

          if (response?.data?.succes == true) {
            alert("Success");
          }
        })
        .catch(function (error) {
          console.log("err", error);
        });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between m-2">
        <img
          onClick={() => navigate("/shareprofile")}
          src="backicon.png"
          alt=""
        />
        <div className="flex items-center">
          <p className="text-white text-sm font-thin">Edit profile</p>
        </div>
        <div></div>
      </div>

      <center>
        <div className="relative rounded-full h-28 w-28">
          <img
            onClick={() => setModalVisible(true)}
            className="opacity-20 mt-5 rounded-full"
            style={{height:"100%",width:"100%"}}
            src={
              currentProfile?.pic_url ||
              "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
            }
            alt=""
          />
          <img
            src="cameraicon.png"
            className="absolute inset-0 m-auto"
            alt=""
          />
        </div>

        <p className="text-white font-thin mt-2 text-xs">Change photo</p>
      </center>

      <div className="p-5">
        <p className="text-white font-thin mt-2 text-xs">About you</p>
        <div class="flex justify-between mt-3">
          <p className="text-white  mt-2 text-sm">Name</p>
          <button
            onClick={() =>
              navigate("/changename", { state: { name: currentProfile?.name } })
            }
            className="text-white  mt-2 text-sm flex"
          >
            {currentProfile?.name || "Name"} <img src="rightarrow.png" />
          </button>
        </div>
        <div class="flex justify-between mt-3">
          <p className="text-white  mt-2 text-sm">Username</p>
          <button
            onClick={() =>
              navigate("/changeusername", {
                state: { username: currentProfile?.username },
              })
            }
            className="text-white  mt-2 text-sm flex"
          >
            {currentProfile?.username || "Username"}
            <img src="rightarrow.png" />
          </button>
        </div>

        <div class="flex justify-between mt-3">
          <p className="text-white  mt-2 text-sm"></p>
          <button
            onClick={() => copyToClipboard(currentProfile?.username)}
            className="text-white font-thin mt-2 text-xs flex"
          >
            vinedo.com/@{currentProfile?.username || "Username"}{" "}
            <img src="copyicon.png" />
          </button>
        </div>

        <div class="flex justify-between mt-3">
          <p className="text-white  mt-2 text-sm">Set your price</p>
          <button
            onClick={() =>
              navigate("/setprice", { state: { price: currentProfile?.price } })
            }
            className="text-white  mt-2 font-thin text-sm flex"
          >
            {" "}
            ${currentProfile?.price || 0.0} <img src="rightarrow.png" />
          </button>
        </div>
      </div>

      {isModalVisible && (
        <div>
          <div
            id="drawer-bottom-example"
            className="fixed rounded-t-lg bottom-0 left-0 right-0 z-40 w-full p-4 overflow-y-auto transition-transform bg-[#110e0f] border-t border-[#4753EA]  dark:bg-gray-800 transform-none"
            tabIndex="-1"
            aria-labelledby="drawer-bottom-label"
          >
            <div className="flex justify-center mb-2 border-b border-[#59585b]">
              <label
                htmlFor="fileInput"
                className="text-white text-sm p-2 cursor-pointer"
              >
                {isloading ? "Uploading to server..." : "Select from Gallery"}
              </label>
              {isloading ? null : (
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              )}
            </div>
            <div
              onClick={() => setModalVisible(false)}
              className="flex justify-center mb-2"
            >
              <p className="text-white text-sm text-[#59585b]">Cancel</p>
            </div>
            {/* {selectedFile && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={handleUpload}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Upload
                </button>
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
}

export default Editprofile;
