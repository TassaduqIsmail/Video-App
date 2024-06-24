// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { API } from "./apis";

export async function saveProfileData(name, username, price, base64Img) {
  const uid = localStorage.getItem("uid");

  const profileData = {
    uid: uid,
    name: name,
    username: username,
    price: price,
    profilePic: base64Img,
    pic_url: "",
    pic_asset_id: "",
    pic_public_id: "",
    pic_created_at: "",
  };
  console.log("profile", profileData);
  try {
    // await axios.post(API.PROFILE.SET_PROFILE, { profileData })
    //     .then(response => {
    //         console.log(response.data);
    //         if (response.data.succes) {
    //             ToastAndroid.show('Name saved!', ToastAndroid.SHORT);
    //         }
    //         else if (response.data.error) {
    //             ToastAndroid.show('username already exist!', ToastAndroid.SHORT);
    //         }

    //     })
    //     .catch(error => {
    //         console.error('Axios PUT request error:', error);
    //         ToastAndroid.show('failed to saved!', ToastAndroid.SHORT);
    //     });

    await axios({
      method: "post",
      url: API.PROFILE.SET_PROFILE,
      data: JSON.stringify({ profileData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log("res", response.data);
        if (response.data.succes) {
          alert("Data saved!");
          // navigation.pop()
        } else if (response.data.error) {
          alert("error while saving!");
        }
      })
      .catch(function (error) {
        console.log("err", error);
      });
  } catch (error) {
    console.log(error);
  }
}
export async function updateUserName(username, currentProfileUid) {
  // const uid = await AsyncStorage.getItem('uid');

  try {
    await axios
      .put(`${API.PROFILE.UPDATE_PROFILE_USERNAME}/${currentProfileUid}`, {
        username: username,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.succes) {
          
          alert("username saved!");
        } else if (response.data.error) {
          alert("username already exist!");
        }
      })
      .catch((error) => {
        console.error("Axios PUT request error:", error);
        alert("username failed to saved!");
      });
  } catch (error) {
    console.log(error);
  }
}

export async function updateName(name, currentProfileUid) {
  // const uid = await AsyncStorage.getItem('uid');

  try {
    await axios
      .put(`${API.PROFILE.UPDATE_PROFILE_NAME}/${currentProfileUid}`, {
        name: name,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.succes) {
          alert("name saved!");
        }
      })
      .catch((error) => {
        console.error("Axios PUT request error:", error);
        alert("name failed to saved!");
      });
  } catch (error) {
    console.log(error);
  }
}
export async function updatePrice(price, currentProfileUid) {
  // const uid = await AsyncStorage.getItem('uid');

  try {
    await axios
      .put(`${API.PROFILE.UPDATE_PROFILE_PRICE}/${currentProfileUid}`, {
        price: price,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.succes) {
          alert("price saved!");
        }
      })
      .catch((error) => {
        console.error("Axios PUT request error:", error);
        alert("price failed to saved!");
      });
  } catch (error) {
    console.log(error);
  }
}
export async function updateProfilePic(base64Img, pic_public_id, proId) {
  // const uid = await AsyncStorage.getItem('uid');

  try {
    await axios({
      method: "put",
      url: `${API.PROFILE.UPDATE_PROFILE_PIC}/${proId}`,
      data: JSON.stringify({ base64Img, pic_public_id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log("res", response.data);
        if (response.data.succes == true) {
          alert("picture updated successfuly!");
        }
      })
      .catch(function (error) {
        console.log("err", error);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function getProfileData() {
  try {
    const uid =  localStorage.getItem("uid");
    console.log("uid", uid);
    const response = await axios.get(`${API.PROFILE.GET_ALL_PROFILE}`);

    const filteredData = response?.data?.data?.find((item) => item.uid === uid);
    console.log(filteredData);
    if (filteredData) {
      return filteredData;
    } else {
      throw new Error("Profile data not found for the given user ID");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
}
