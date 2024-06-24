import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, fbProvider, provider } from "../service/config";
import { signInWithPopup } from "firebase/auth";
import { API } from "../Api/apis";
import axios from "axios";

function Signuppage() {
  const navigate = useNavigate();
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      // setGoogleDetailObj(data);
      console.log(".........", data);
      // localStorage.setItem("email",data.user.email);

      const userData = {
        providerName: "google",
        providerUId: data.user?.uid,
        email: data?.user.email,
        name: data.user.displayName,
        status: "activate",
      };
      saveCredidentials(userData);
    });
  };

  async function checkCredidentials(userData) {
    try {
      const loginData = {
        email: userData?.email.toLowerCase(),
        password: " ",
        providerUId: userData?.providerUId,
      };

      const response = await axios.post(API.USER.LOGIN, loginData);
      console.log("checkCredidentials", response);
      if (response.data?.succes) {
        await localStorage.setItem("uid", response.data.uid);
        await checkProfileAndStatus(response.data.uid);
      }
    } catch (error) {
      // console.error('Error in checkCredidentials:', error);
      return null;
    }
  }

  async function saveCredidentials(userData) {
    try {
      console.log("userData", userData);
      const response = await axios.post(API.USER.SIGNUP, userData);
      console.log("response", response);
      if ("User registered successfully" === response.data.message) {
        alert("Register in successfully");
        await localStorage.setItem("uid", response.data.uid);

        checkProfileAndStatus(response.data.uid);
        return "register user";
      } else {
        return await checkCredidentials(userData);
      }
    } catch (error) {
      console.error("Error in saveCredidentials:", error);
      return null;
    }
  }

  const checkProfileAndStatus = async (uid) => {
    // const uid = localStorage.getItem("uid");
    console.log(uid);
    await axios
      .get(`${API.USER.GET_USERS_BY_ID}/${uid}`)
      .then(async (response) => {
        // console.log(response.data);
        console.log("uid", uid);
        console.log("profile", response.data.data.status);
        if (response?.data?.data?.status == "activate") {
          alert({
            type: "success",
            text1: "sign in successfully",
          });
          await axios
            .get(API.PROFILE.GET_ALL_PROFILE)
            .then((response) => {
              console.log(response.data);
              // console.log('uid', uid);
              const profileData = response?.data?.data?.filter(
                (item) => item?.uid === uid
              );
              if (
                profileData[0]?.name ||
                profileData[0]?.pic_url ||
                profileData[0]?.price ||
                profileData[0]?.username
              ) {
                navigate("/shareprofile");
              } else {
                navigate("/getstart");
              }
              // console.log('profile', profileData);
            })
            .catch((error) => {
              console.error("Axios POST request error:", error);
            });
        } else if (response?.data?.data?.status == "deactivate") {
          alert({
            type: "error",
            text1: "admin deactivate your account",
          });
        }
      });
  };

  const handleClickFB = () => {
    signInWithPopup(auth, fbProvider).then((data) => {
      // setGoogleDetailObj(data);
      console.log(".........", data);
      // localStorage.setItem("email",data.user.email);

      const userData = {
        providerName: "google",
        providerUId: data.user?.uid,
        email: data?.user.email,
        name: data.user.displayName,
        status: "activate",
      };
      // saveCredidentials(userData);
    });
  };
  return (
    <div className="p-3">
      <h1 className="text-5xl font-thin text-white mb-5 mt-5 ">
        Unleash <br />
        Desire & <br />
        Forge Instant Connections.
      </h1>

      <p className="text-white mb-5 font-thin text-sm ">
        Unlock instant, passionate interactions effortlessly.
      </p>

      <div className="flex gap-3 justify-center mb-5">
        <img src="facebook.png" alt="" onClick={() => handleClickFB()} />
        <img
          src="google.png"
          alt=""
          onClick={() => {
            handleClick();
          }}
        />
        {/* <img src="apple.png" alt="" /> */}
      </div>

      <div className="flex justify-center items-center mb-5">
        <hr className="bg-[#727574] w-1/3 h-0.5" />
        <p className="text-white mx-2 font-bold">OR</p>
        <hr className="bg-[#727574] w-1/3 h-0.5" />
      </div>

      <center>
        <a
          href="register"
          type="submit"
          className="mt-10 mb-4 text-white font-bold py-2 px-24 rounded-full"
          style={{
            backgroundImage: "linear-gradient(to bottom, #3640c2, black)",
          }}
        >
          Sign&nbsp;up&nbsp;with&nbsp;email
        </a>

        <br />
        <a className="text-white text-xs" href="login">
          Existing account? <span className="text-white font-bold">Log in</span>
        </a>
      </center>
    </div>
  );
}

export default Signuppage;
