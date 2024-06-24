import React, { useEffect, useState } from "react";
import { API } from "../Api/apis";
import axios from "axios";
import { auth, provider,fbProvider } from "../service/config";
import { Field, Form, Formik } from "formik";
import { AsyncStorage } from "AsyncStorage";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function SIgnup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [googleDetailObj, setGoogleDetailObj] = useState("");

  const navigate = useNavigate();
  const handlEmailChange = (newText) => {
    setEmail(newText);
  };
  const handlePasswordChange = (newText) => {
    setPass(newText);
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
}


  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setGoogleDetailObj(data);
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
      console.log("checkCredidentials",response)
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

  const userLogin = async (email, password) => {
    console.log("Email:", email);
    console.log("Password:", password);
    if (!email || !password) {
      alert("Please fill in all fields");
    } else {
      const userData = {
        email: email,
        password: password,
      };
      console.log("UserData:", userData);
      try {
        const response = await axios.post(API.USER.LOGIN, userData);
        console.log("responce", response);
        console.log("ajajs", response?.data?.uid);
        localStorage.setItem("uid", response.data.uid);
        if (response.data.error === "User does not exist") {
          alert("User does not exist");
        } else if (response.data.error === "Invalid password") {
          console.log("jjsj", response.data.error);
          alert("Invalid password");
        } else if (response.data.success == "success") {
          navigate("/getstart");
        }
        checkProfileAndStatus(response?.data?.uid);
      } catch (error) {
        console.error("Axios POST request error:", error);
      }
    }
  };
  const checkProfileAndStatus = async (uid) => {
    // const uid = localStorage.getItem("uid");
    console.log(uid);
    try {
        await axios
      .get(`${API.USER.GET_USERS_BY_ID}/${uid}`)
      .then(async (response) => {
        // console.log(response.data);
        console.log("uid", uid);
        console.log("profile", response.data.data.status);
        if (response?.data?.data?.status == "activate") {
          alert('sign in successfully')
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
          alert('admin deactivate your account');
        }
      });
    } catch (error) {
        
    }
  };
  const goBack = () => {
    window.history.back(); // This will navigate back to the previous page in the browser history
  };
  return (
    <div className="p-3">
      <img onClick={goBack} src="backicon.png" alt="" />
      <center>
        <h1 className="text-2xl text-[#4753EA] mb-5 font-bold">
          Sign In with Email
        </h1>
        <p className="text-white mb-5 font-thin text-sm ">
          Start experiencing freedom today by signing up for our app!
        </p>
      </center>
      <div className="flex gap-3 justify-center mb-5">
        <img src="facebook.png" alt=""  onClick={() => {
            handleClickFB();
          }} />
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
        <p className="text-[#727574] mx-2 font-bold">OR</p>
        <hr className="bg-[#727574] w-1/3 h-0.5" />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          console.log("Submitted values:", values);
          await userLogin(values.email, values.password);
        }}
      >
        <Form>
          <div className="flex flex-col gap-3 ">
            <label className="text-white">Your email</label>
            <Field
              type="email"
              name="email"
              className="h-6  border-b border-white p-2 bg-[#110E0F]"
              style={{ color: "#fff" }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-white">Password</label>
            <Field
              type="password"
              name="password"
              className="h-6  border-b border-white p-2 bg-[#110E0F]"
              style={{ color: "#fff" }}
            />
          </div>
          <center>
            <button
              type="submit"
              className="mt-20 mb-5 text-white font-bold py-2 px-32 rounded-full"
              style={{
                backgroundImage: "linear-gradient(to bottom, #3640C2, black)",
              }}
            >
              Login
            </button>
            <br />
            <a className="text-[#3D4A7A]" href="#">
              Forgot Password?
            </a>
          </center>
        </Form>
      </Formik>
    </div>
  );
}
export default SIgnup;
