import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../Api/apis";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

function Searchengine() {
  const [userData, setUserData] = useState([]);
  const [subscriber, setSubscriber] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllProfile = async () => {
      const uid = await localStorage.getItem("uid");

      await axios
        .get(API.PROFILE.GET_ALL_PROFILE)
        .then((response) => {
          const data = response?.data?.data;
          const filteredData = data.filter((item) => item.uid !== uid);

          setUserData(filteredData);
        })
        .catch((error) => {
          console.error("Axios POST request error:", error.message);
        });
    };
    console.log("all profile", userData);
    const getAllSubscriber = async () => {
      const uid = await localStorage.getItem("uid");

      await axios
        .get(API.PAYMENT.GET_SUB_STATUS)
        .then(async (response) => {
          const data = response?.data?.data;
          const subscriberData = data.filter(
            (item) =>
              item?.subcriberId === uid && item?.subStatus == "subscribe"
          );

          // console.log('all sub', subscriberData);

          const alluserSubscriber = subscriberData?.map((subItem) => {
            const matchingData = userData?.find(
              (item) => item?.uid === subItem?.creatorId
            );
            return matchingData;
          });

          // console.log('all user  sub', alluserSubscriber);
          setSubscriber(alluserSubscriber);
        })
        .catch((error) => {
          console.error("Axios POST request error:", error.message);
        });
    };

    getAllSubscriber();
    getAllProfile();
  }, [searchQuery,subscriber]);

  //   useEffect(() => {
  //     const handleSearch = () => {
  //       const results = userData?.filter((item) =>
  //         item?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  //       );
  //       setSearchResults(results);
  //     };

  //     handleSearch();
  //   }, []);

  //   console.log("item", subscriber);

  const handleSearch = () => {
    const results = userData?.filter((item) =>
      item?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setSearchResults(results);
    setUserData([]);
    console.log("search", results);
  };

  // const goBack = () => {
  //   window.history.back();
  // };
  console.log("subscriber data", userData);
  return (
    <div>
      <div className="flex gap-2 m-2">
        <img onClick={()=>{navigate("/Shareprofile")}} src="backicon.png" alt="" />
        <input
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          type="text"
         
            // className=" h-6  p-2 bg-[#110e0f] placeholder-[#525458] placeholder-sm"
          placeholder="Search by creators"
        />
        <button style={{ color: "white" }} onClick={handleSearch}>
          search
        </button>
      </div>

      <div className="flex justify-center items-center ">
        <hr className=" w-1/3 h-0.2 " />

        <p className="text-[#4753EA] mx-2 font-thin text-sm">Subscriptions</p>
        <hr className=" w-1/3 h-0.2" />
      </div>

      <div style={{
        display:"flex",flexDirection:'row',justifyContent:'space-evenly',alignItems:"center",flexWrap:'wrap'
      }}>
        {subscriber?.map((item, index) => {
          return (
            <div key={index} class="flex justify-center">
              <div className="rounded-full   h-12 w-12" style={{justifyContent:'center',display:'flex',flexDirection:'column'}}>
                <img
                  src={
                    item?.pic_url ||
                    "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                  }
                  // className="mt-5 rounded-full"
                  style={{height:30,width:30,alignSelf:'center'}}
                  alt=""
                />
                <p  style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',alignSelf:'center',display:"flex",width:30,}}  className="text-white font-thin  text-xs">
                  {item?.name || "Name"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 flex justify-center">
        <div className="w-full h-0.5 bg-[#4753EA] mb-2 "></div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        {userData.length > 0
          ? userData?.map((item, index) => {
              console.log(item);
              return (
                <div>
                  <div
                    onClick={() =>
                      navigate("/Creater", { state: { userData: item } })
                    }
                    key={index}
                    class="relative h-40 w-full"
                    style={{
                      backgroundImage: `url(${
                        item?.pic_url ||
                        "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div class="absolute bottom-0 left-0 flex items-center p-2">
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>

                    <div class="absolute bottom-0 right-0  px-2 py-1 m-1 bg-[#110e0f] rounded-lg">
                      <p class="text-xs text-white">1</p>
                    </div>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  >
                    {" "}
                    <p style={{ color: "#fff" }}>{item?.name || "Name"}</p>{" "}
                  </div>
                </div>
              );
            })
          : searchResults?.map((item, index) => {
              return (
                <div>
                  <div
                    key={index}
                    class="relative h-40 w-full"
                    style={{
                      backgroundImage: `url(${
                        item?.pic_url ||
                        "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div class="absolute bottom-0 left-0 flex items-center p-2">
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>

                    <div class="absolute bottom-0 right-0  px-2 py-1 m-1 bg-[#110e0f] rounded-lg">
                      <p class="text-xs text-white">1</p>
                    </div>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      alignSelf: "center",
                      display: "flex",
                    }}
                  >
                    {" "}
                    <p style={{ color: "#fff" }}>{item?.name || "Name"}</p>{" "}
                  </div>
                </div>
              );
            })}
      </div>

      {/* <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <button class="bg-[#110e0f] hover:bg-blue-600 border border-[#4753ea] text-white font-bold py-4 px-4 rounded-full ">
          <img src="plusicon.png" alt="" />
        </button>
      </div> */}
    </div>
  );
}

export default Searchengine;
