import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast";

function Login(props) {

    const navigate = useNavigate();

    //Handling Submit Button
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const { data } = await axios.post('https://e-book-store-ten.vercel.app/api/v1/user/login', {
            const { data } = await axios.post('/login', {    //Calling Login Controller
                email: inputs.email,                    //Sending email and password to backend to perform relevant actions
                password: inputs.password
            });
            console.log(data);
            window.sessionStorage.setItem("userdetails", JSON.stringify(data));    //Storing temporary data 
            window.localStorage.setItem("islogin", true);                           // storing if login status is true or false
            // login credentials found 
            if (data.success) {
                alert(data.message);
                toast.success("User login Successfully");
                navigate("/");              //After successfull login navigate to home screen
            }
            // if user data not found or incorrect 
            else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Constants for storig input variables
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    //Handling Change while inputing data
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // Navigate to OTP Function

    const nagigateToOtp = async (e) => {
        //e.preventDefault();
        try {
            const OTP = Math.floor(Math.random() * 9000 + 1000);  //Generating OTP
            console.log(OTP);
            // const { data } = await axios.post('https://e-book-store-ten.vercel.app/api/v1/user/OTPController', {
            const { data } = await axios.post('/send_recovery_email', {         //Calling OTP Controller (Mailsender)
                email: inputs.email,
                OTP: OTP,
                procedure: "Password Recovery"
            });
            console.log(data);
            const da = {                    //Storing user email and otp generated
                recp_email: inputs.email, Otp: OTP
            };
            //  Mail sent 
            if (data.success) {
                alert(data.message);
                toast.success("Mail Sent Successfully");
                navigate("/OTPInput", { state: da });  //Navigating to otpinput and sending email and otp to otpinput page
            }
            // Mail send error
            else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div>
            <div className="auth-form-container">
                <form className="login-form form" onSubmit={handleSubmit}>
                    <div className="separateL">
                        <img className="auth-img" src="https://www.globalsign.com/application/files/4616/2199/5695/ManagedPKI_Strong_Authentication_Cover_1_APAC_2021_05_19.jpg" alt="authentication " />
                    </div>
                    <div className="separateR">
                        <p className="change">
                            Don't have an account <button className="link-btn" onClick={() => navigate('/register')}>Register</button>
                        </p>
                        <h3>Weclome to BooKraze</h3>
                        <p className="tagline">Dicover a world of stories </p>
                        <h1>Login</h1>
                        <label className="label" htmlFor="email">User Email</label>
                        <input className="input" onChange={handleChange} value={inputs.email} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label className="label" htmlFor="password">Password</label>
                        <input className="input" onChange={handleChange} value={inputs.password} type="password" placeholder="********" id="password" name="password" />
                        <p className="forgotPwd"><a href="#" onClick={() => nagigateToOtp()} > Forgot password?</a></p>
                        <button className="btn" type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;