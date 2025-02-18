import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Reg&Log.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PasswordChecklist from "react-password-checklist";
import toast from "react-hot-toast";

function Register(props) {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  // Function to Show and hide Password
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  //Handling Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessage === "Please enter strong password!!") {
      toast.error("Please enter strong password!!");
    } else if (inputs.password === inputs.confirmPassword) {
      //matching password and confirm password
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/user/register",
          {
            // Calling register route
            username: inputs.name, //Sending username, email and password to backend to perform required actions
            email: inputs.email,
            password: inputs.password,
          }
        );
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          navigate("/login"); //After successful registeration navigating to login page
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      toast.error("Password doesn't match!!!"); //telling user that password does not match
    }
  };

  //Constants for Storing inputs
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Handling input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [errorMessage, setErrorMessage] = useState("");

  const validatePassword = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (
      inputs.password.length < 8 ||
      !/\d/.test(inputs.password) ||
      !/[A-Z]/.test(inputs.password) ||
      !/[a-z]/.test(inputs.password) ||
      !/[0-9]/.test(inputs.password)
    ) {
      setErrorMessage("Please enter strong password!!");
    } else {
      setErrorMessage("Strong password!!!");
    }
  };

  return (
    <div className="loginBody">
      <div className="auth-form-container register">
        <form className="register-form form" onSubmit={handleSubmit}>
          <div className="separateL">
            <img
              className="auth-img"
              src="https://www.globalsign.com/application/files/4616/2199/5695/ManagedPKI_Strong_Authentication_Cover_1_APAC_2021_05_19.jpg"
              alt="authentication "
            />
            <div className="passwordCheckList">
              <PasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                  "lowercase",
                ]}
                minLength={8}
                value={inputs.password}
                valueAgain={inputs.confirmPassword}
              />
            </div>
          </div>
          <div className="separateR not">
            <p className="change">
              Already have an account
              <button className="link-btn" onClick={() => navigate("/login")}>
                Login{" "}
              </button>
            </p>
            <h3>Weclome to BooKraze</h3>
            <p className="tagline">Dicover a world of stories </p>
            <h1>Register</h1>

            <div className="inputContainer">
              <label className="label" htmlFor="name">
                Full name
              </label>
              <input
                className="input"
                onChange={handleChange}
                value={inputs.name}
                name="name"
                id="name"
                placeholder="Enter Your Name"
                required
              />

              <label className="label" htmlFor="email">
                E-mail
              </label>
              <input
                className="input"
                onChange={handleChange}
                value={inputs.email}
                type="email"
                placeholder="your-email@gmail.com"
                id="email"
                name="email"
                required
              />

              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                onChange={validatePassword}
                value={inputs.password}
                type={passwordShown ? "text" : "password"}
                placeholder="********"
                id="password"
                name="password"
                required
                minLength={8}
              />
              <div style={{ color: "red" }}> {errorMessage} </div>

              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="input"
                onChange={handleChange}
                value={inputs.confirmPassword}
                type={passwordShown ? "text" : "password"}
                placeholder="********"
                id="confirmPassword"
                name="confirmPassword"
                required
              />

              <div className="passwordShow">
                <FormControlLabel
                  control={<Checkbox name="checkedB" color="primary" />}
                  onClick={togglePassword}
                />
                <p className="pStyle">Show Password</p>
              </div>

              <button className="btn" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
