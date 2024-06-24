import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { API } from "../Api/apis";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../service/config";
import { useNavigate } from "react-router-dom";

function Register() {
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email); 
    });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const navigate = useNavigate();
  const userSignUp = async (email, pass, name, confirmPass) => {
    if (!name || !email || !pass || !confirmPass) {
      alert("Please fill in all fields");
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
    } else if (pass !== confirmPass) {
      alert("Passwords do not match");
    } else {
      const userData = {
        providerName: "email",
        name: name,
        email: email,
        password: pass,
        status: "activate",
      };

      try {
        const response = await axios.post(API.USER.SIGNUP, userData);
        console.log(response.status);
        if (response.data.message === "email already exists") {
          alert("Email already exists");
        } else if (response.data.message === "User registered successfully") {
          alert("User registered successfully");
          setName("");
          setEmail("");
          setPass("");
          setConfirmPass("");
          navigate("/getstart");
        }
      } catch (error) {
        console.error("Axios POST request error:", error);
      }
    }
  };

  const goBack = () => {
    window.history.back(); // This will navigate back to the previous page in the browser history
  };

  return (
    <div className="p-3">
      <img onClick={goBack} src="backicon.png" alt="" />
      <center>
        <h1 className="text-2xl text-[#4753ea] mb-5 font-bold">
          Log in to Vinedo
        </h1>
        <p className="text-white mb-5 font-thin text-sm ">
          Welcome back! Sign in using your social account or email to continue
        </p>
      </center>
      {/* <div className="flex gap-3 justify-center mb-5">
        <img src="facebook.png" alt="" />
        <img
          src="google.png"
          onClick={() => {
            handleClick();
          }}
          alt=""
        />
        <img src="apple.png" alt="" />
      </div> */}
      <div className="flex justify-center items-center mb-5">
        <hr className="bg-[#727574] w-1/3 h-0.5" />
        <p className="text-[#727574] mx-2 font-bold">OR</p>
        <hr className="bg-[#727574] w-1/3 h-0.5" />
      </div>
      <Formik
        initialValues={{ email: "", password: "", name: "", confirmPass: "" }}
        onSubmit={async (values) => {
          console.log("Submitted values:", values);
          await userSignUp(
            values.email,
            values.password,
            values.name,
            values.confirmPass
          );
        }}
      >
        <Form>
          <div className="flex flex-col gap-3 mb-3">
            <label className="text-white">Your name</label>
            <Field
              type="text"
              name="name"
              className="border-b h-6 border-white p-2 bg-[#110e0f]"
              style={{ color: "#fff" }}
            />
          </div>
          <div className="flex flex-col gap-3 mb-3">
            <label className="text-white">Your email</label>
            <Field
              type="text"
              name="email"
              className="border-b h-6 border-white p-2 bg-[#110e0f]"
              style={{ color: "#fff" }}
            />
          </div>
          <div className="flex flex-col gap-3 mb-3">
            <label className="text-white">Password</label>
            <Field
              type="password"
              name="password"
              className="h-6 border-b border-white p-2 bg-[#110e0f]"
              style={{ color: "#fff" }}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-white">Confirm Password</label>
            <Field
              type="password"
              name="confirmPass"
              className="h-6 border-b border-white p-2 bg-[#110e0f]"
              style={{ color: "#fff" }}
            />
          </div>
          <center>
            <button
              type="submit"
              className="mt-20 mb-5  text-white font-bold py-2 px-32 rounded-full text-xs "
              style={{
                backgroundImage: "linear-gradient(to bottom, #3640c2, black)",
              }}
            >
              Create&nbsp;an&nbsp;account
            </button>
          </center>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
