import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { API } from "../Api/apis";
import { useNavigate, useNavigation } from "react-router-dom";
import CheckOutPage from "./CheckOutPage";

function Shareprofile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };
  // const [isModalVisible1, setModalVisible1] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentUid, setCurrentUid] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [currentImages, setCurrentImages] = useState([]);
  const [currentVideo, setCurrentVideo] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0.0);
  const [averageRating, setAverageRating] = useState(0.0);
  const [button, Setbutton] = useState({
    pic: true,
    video: false,
  });
  // const [modalVisible, setModalvisible] = useState(false);

  //   const navigation = useNavigation();
  //   console.log("current", currentProfile);

  // const toggleModal1 = () => {
  //   setModalVisible1(!isModalVisible1);
  // };
  // const [isModalVisible2, setModalVisible2] = useState(false);
  // const toggleModal2 = () => {
  //   setModalVisible2(!isModalVisible2);
  // };
  //   const { height, width } = Dimensions.get('window');

  const [activeIndex, setActiveIndex] = useState(0);
  const [isloading, setisloading] = useState(false);
  const handleNextPress = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, 1));
  };

  const handlePrevPress = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const [isModalVisible3, setModalVisible3] = useState(false);
  const toggleModal3 = () => {
    setModalVisible3(!isModalVisible3);
  };

  //   const shareProfile = async item => {
  //     try {
  //       const shareOptions = {
  //         username: currentProfile?.username,
  //         name: currentProfile?.name,
  //         // imageUrl: currentProfile?.pic_url,
  //         url: `${currentProfile?.pic_url}`,
  //       };
  //       await Share.open(shareOptions);
  //     } catch (error) {
  //       console.error('Error sharing article:', error);
  //     }
  //   };

  const fetchSubTotal = async (item) => {
    try {
      const uid = await localStorage.getItem("uid");
      const response = await axios.get(API.PAYMENT.GET_SUB_STATUS);
      const subData = response.data.data;
      console.log(subData);
      const countSub = subData.filter(
        (item) => item.subStatus === "subscribe" && item.creatorId === uid
      );
      setSubTotal(countSub);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProfileData();
    fetchSubTotal();
  }, []);
  useEffect(() => {
    getAssets();
  }, [currentImages,currentVideo]);

  const getProfileData = async () => {
    const profileUid = localStorage.getItem("profileUid");
    const uid = localStorage.getItem("uid");
    // console.log("profileuid", profileUid);
    // console.log('uid', uid);

    await axios
      .get(`${API.PROFILE.GET_ALL_PROFILE}`)
      .then((response) => {
        const filteredData = response?.data?.data?.filter(
          (item) => item.uid === uid
        );
        //   console.log(filteredData);

        setCurrentProfile({
          name: filteredData[0]?.name,
          username: filteredData[0]?.username,
          price: filteredData[0]?.price,
          pic_url: filteredData[0]?.pic_url,
          id: filteredData[0]?._id,
        });
        // }
      })
      .catch((error) => {
        console.error("Axios POST request error:", error);
      });
  };

  const getAssets = async () => {
    const uid = localStorage.getItem("uid");
    console.log(uid);
    await axios
      .get(`${API.IMAGE_VIDEO.GET_ASSETS}`)
      .then((response) => {
        //  console.log('assets data', response);

        const filteredData = response?.data?.filter(
          (item) => item?.uid === uid
        );
        // console.log("assets", filteredData);

        if (filteredData) {
          const images = filteredData.filter(
            (item) => item?.pic_format == "jpg" || item?.pic_format == "png"
          );
          const videos = filteredData.filter(
            (item) => item?.pic_format == "mp4"
          );
          console.log("videos", videos);
          const picData = images.map((item) => {
            return {
              format: item?.pic_format,
              pubId: item?.pic_public_id,
              pic_url: item?.pic_url,
              id: item?._id,
              likes: item.likes,
              rating: item?.ratings,
              view: item?.views,
              likedBy: item?.likedBy,
            };
          });
          // console.log('img', picData);
          const videoData = videos.map((item) => {
            return {
              format: item?.pic_format,
              pubId: item?.pic_public_id,
              pic_url: item?.pic_url,
              id: item?._id,
              duration: item?.duration,
              likes: item.likes,
              rating: item?.ratings,
              view: item?.views,
              likedBy: item?.likedBy,
            };
          });
          setCurrentImages(picData);
          setCurrentVideo(videoData);
        }
      })
      .catch((error) => {
        console.error("Axios POST request error:", error);
      });
  };

  useEffect(() => {
    let totalImageLikes = 0;
    let totalImageRating = 0;
    let ratingLength = 0;

    currentImages?.forEach((image) => {
      console.log("current image data", image);
      if (typeof image?.likes === "number" && !isNaN(image.likes)) {
        totalImageLikes += image.likes;
      }
      ratingLength = image?.ratings?.length || 0;
      if (ratingLength > 0) {
        totalImageRating +=
          image?.ratings.reduce((acc, curr) => acc + curr.rate, 0) /
          ratingLength;
      }
    });

    console.log("totalImageLikes", totalImageLikes);

    const averageImageRating =
      ratingLength === 0 ? 0 : totalImageRating / ratingLength;
    console.log("averageImageRating", averageImageRating);

    let totalVideoLikes = 0;
    let totalVideoRating = 0;
    let ratingVideoLength = 0;

    currentVideo.forEach((video) => {
      console.log("current video data", video);
      // Check if likes exist and are valid numbers
      if (typeof video?.likes === "number" && !isNaN(video.likes)) {
        totalVideoLikes += video.likes;
      }

      ratingVideoLength = video?.ratings?.length || 0;

      if (ratingVideoLength > 0) {
        totalVideoRating +=
          video?.ratings.reduce((acc, curr) => acc + curr?.rate, 0) /
          ratingVideoLength;
      }
    });

    console.log("totalVideoLikes", totalVideoLikes);

    // Calculate average rating for videos
    const averageVideoRating =
      ratingVideoLength === 0 ? 0 : totalVideoRating / ratingVideoLength;
    console.log("averageVideoRating", averageVideoRating);

    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "k";
      }
      return num.toString();
    };

    const totalLikes = totalImageLikes + totalVideoLikes;
    // const formattedSubscribe = formatNumber(toltalSubcribe);
    const formattedLikes = formatNumber(totalLikes);

    const avgRating = (averageImageRating + averageVideoRating) / 2;

    setAverageRating(avgRating);
    setTotalLikes(formattedLikes);
    // setToltalSubcribe(formattedSubscribe);
    // getSubscriberData();
  }, [currentImages, currentVideo]);
  const navigate = useNavigate();

  const shareProfile = (data) => {
    // Logic to share the profile, could be via email, social media, etc.
    // Example: You can use the Web Share API to share content
    if (navigator.share) {
      navigator
        .share({
          title: `${data?.name}'s Profile`,
          text: `Check out ${data?.name}'s profile on our website!`,
          url: window.location.href,
        })
        .then(() => console.log("Profile shared successfully"))
        .catch((error) => console.error("Error sharing profile:", error));
    } else {
      // Fallback if Web Share API is not supported
      alert("Profile sharing is not supported on this browser.");
    }
  };

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

  // console.log(selectedFile);
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
        formData["uid"] = currentProfile?.id;
      }
      // formData.append(item.name, reader.createReadStream(base64Data));
      console.log("form", filetype);
      console.log("form", formData);
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
      setisloading(true);
      await axios
        .post(`${API.IMAGE_VIDEO.UPLOAD_ASSETS}`, formData, {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        })
        .then(function (response) {
          console.log("res", response.data);
          setisloading(false);
          if (response?.data?.succes == true) {
            alert("Success");
          }
        })
        .catch(function (error) {
          console.log("err", error);
          setisloading(false);
        });
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Appbar />
      {/* <CheckOutPage/> */}

      <center>
    
        <br />

        <div className="rounded-full h-28 w-28">
          <img
            src={
              currentProfile?.pic_url ||
              "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
            }
            className="mt-5 rounded-full"
            style={{height:"100%",width:"100%"}}
            alt=""
          />
        </div>

        <p className="text-white font-thin  text-lg">
          {" "}
          {currentProfile?.name || "Name"}
        </p>
        <p className="text-[#a1a3a7] font-thin text-xs ">
          @{currentProfile?.username || "Username"}
        </p>

        <div className="flex justify-center gap-10 mt-10">
          <div>
            <p className="text-white">{totalLikes}</p>
            <p className="text-[#a1a3a7] font-extralight">Likes</p>
          </div>

          <div>
            <p className="text-white font-bold">{subTotal?.length}</p>
            <p className="text-[#a1a3a7] font-extralight ">Subscribers</p>
          </div>

          <div>
            <p className="text-white font-bold">{averageRating}</p>
            <p className="text-[#a1a3a7] font-extralight">Rating</p>
          </div>
        </div>
      </center>

      <div className="flex  justify-center gap-3 mt-8">
        <button
          onClick={() => navigate("/editprofile")}
          type="button"
          className="text-white border border-[#4753ea] text-sm font-thin py-1 p-4 rounded-full "
        >
          Edit profile
        </button>
        <button
          onClick={() => shareProfile(currentProfile)}
          type="button"
          className="text-white border border-[#4753ea] text-sm font-thin py-1 p-4 rounded-full"
        >
          Share profile
        </button>
      </div>

      <div className="flex  justify-center gap-10 mt-8">
        <button
          type="button"
          onClick={() => Setbutton({ pic: true, video: false })}
          className={
            button.pic
              ? "text-white border-b  border-b-white text-sm font-thin py-1 p-4 "
              : "text-white  text-sm font-thin py-1 p-4 "
          }
        >
          <img src="gridicon.png" alt="" className="pb-3" />
        </button>

        <button
          type="button"
          onClick={() => Setbutton({ pic: false, video: true })}
          className={
            button.video
              ? "text-white border-b  border-b-white text-sm font-thin py-1 p-4 "
              : "text-white  text-sm font-thin py-1 p-4 "
          }
        >
          <img src="reelsicon.png" alt="" className="pb-3" />
        </button>
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
      <div
        style={{
          display: "flex",
          // gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          // gap: "0.5rem",
          marginTop: 10,
        }}
      >
        {button.pic &&
          currentImages?.map((item, index) => (
            <div
              onClick={() => navigate("/Showpic", { state: { item } })}
              key={index}
              style={{}}
            >
              <img
                src={item?.pic_url}
                style={{ height: "130px", width: "120px" }}
                alt=""
              />
            </div>
          ))}
      </div>

      <div
        style={{
          display: "flex",
          // gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          // gap: "0.5rem",
          marginTop: 10,
        }}
      >
        {button.video &&
          currentVideo?.map((item, index) => (
            <div key={index} style={{}}>
              <video
                style={{
                  height: "130px",
                  width: "120px",
                }}
                controls
              >
                <source src={item?.pic_url} type="video/mp4" />
              </video>
            </div>
          ))}
      </div>

      <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => setModalVisible(true)}
          class="bg-[#110e0f] hover:bg-blue-600 border border-[#4753ea] text-white font-bold py-4 px-4 rounded-full "
        >
          <img src="plusicon.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Shareprofile;
