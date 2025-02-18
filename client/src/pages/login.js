import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../CSS/Reg&Log.css";
import { Checkbox, FormControlLabel } from "@mui/material";

function Login(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  //Handling Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://e-book-store-ten.vercel.app/api/v1/user/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        // Store login state in sessionStorage only
        sessionStorage.setItem("userdetails", JSON.stringify(data));
        sessionStorage.setItem("islogin", "true");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //Constants for storig input variables
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //Handling Change while inputing data
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Navigate to OTP Function

  const nagigateToOtp = async (e) => {
    //e.preventDefault();
    try {
      const OTP = Math.floor(Math.random() * 9000 + 1000); //Generating OTP
      console.log(OTP);
      const { data } = await axios.post(
        "https://e-book-store-ten.vercel.app/api/v1/user/send_recovery_email",
        {
          //Calling OTP Controller (Mailsender)
          email: inputs.email,
          OTP: OTP,
          procedure: "Password Recovery",
        }
      );
      console.log(data);
      const da = {
        //Storing user email and otp generated
        recp_email: inputs.email,
        Otp: OTP,
      };
      //  Mail sent
      if (data.success) {
        toast.success(data.message);
        navigate("/OTPInput", { state: da }); //Navigating to otpinput and sending email and otp to otpinput page
      }
      // Mail send error
      else {
        toast.error(data.message);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <div className="loginBody">
      <div className="auth-form-container">
        <form className="login-form form" onSubmit={handleSubmit}>
          <div className="separateL">
            <img
              className="auth-img"
              src="https://www.globalsign.com/application/files/4616/2199/5695/ManagedPKI_Strong_Authentication_Cover_1_APAC_2021_05_19.jpg"
              alt="authentication "
            />
          </div>
          <div className="separateR">
            <p className="change not">
              Don't have an account{" "}
              <button
                className="link-btn"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
            <h3>Weclome to BooKraze</h3>
            <p className="tagline">Dicover a world of stories </p>
            <h1>Login</h1>
            <label className="label not" htmlFor="email">
              User Email
            </label>
            <input
              className="input not"
              onChange={handleChange}
              value={inputs.email}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              required
            />
            <label className="label not" htmlFor="password">
              Password
            </label>
            <input
              className="input not"
              onChange={handleChange}
              value={inputs.password}
              type={passwordShown ? "text" : "password"}
              placeholder="********"
              id="password"
              name="password"
            />
            <div className="passwordShow">
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                onClick={togglePassword}
              />
              <p className="pStyle">Show Password</p>
            </div>
            <p className="forgotPwd not">
              <a href="#" onClick={() => nagigateToOtp()}>
                {" "}
                Forgot password?
              </a>
            </p>
            <button className="btn not" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
