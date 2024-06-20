import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function OTPInput() {

    const [timerCount, setTimer] = React.useState(60);
    const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
    const [disable, setDisable] = useState(true);
    const navigate = useNavigate();

    // Fetching the user mailid and otp from login page
    const { state } = useLocation();
    const recp_email = state.recp_email;
    const Otp = state.Otp;

    // function handling resend mail
    const resendOTP = async () => {
        if (disable) return;
        const OTP = Math.floor(Math.random() * 9000 + 1000);    // resend otp generation
        const { data } = await axios.post('/send_recovery_email', {   //Sending the details to backend to send mail to user
            email: recp_email,
            OTP: OTP,
            procedure: "Password Recovery"
        });
        setDisable(true);   //Disabling the resend button
        alert("A new OTP has succesfully been sent to your email.");
        setTimer(60);  //Setting the timer again
        const da = {
            recp_email: recp_email, Otp: OTP  //Storing the updated otp for matching
        };
        //  Mail sent 
        if (data.success) {
            alert(data.message);
            toast.success("Mail Sent Successfully");
            navigate("/OTPInput", { state: da });
        }
        // Mail send error
        else {
            alert(data.message);
        }
    }

    //Verifying the otp
    const verfiyOTP = () => {
        const da = {       //creating constant to store user details
            recp_email: recp_email,
        };
        if (parseInt(OTPinput.join("")) === Otp) {
            navigate("/reset", { state: da });   //passing the mail to the reset route
            return;
        }
        alert("The OTP is incorrect. Please enter the correct otp or try again!!!");
        return;
    }


    // Timer for resend otp mail
    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((lastTimerCount) => {
                lastTimerCount <= 1 && clearInterval(interval);
                if (lastTimerCount <= 1) setDisable(false);
                if (lastTimerCount <= 0) return lastTimerCount;
                return lastTimerCount - 1;
            });
        }, 1000); //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval);
    }, [disable]);

    return (
        <div className="">
            <div className="">
                <div className="">
                    <p>Email Verification</p>
                </div>
                <div className="">
                    <p>We have sent a code to your email {recp_email}</p>
                </div>
            </div>

            <div>
                <form>
                    <div className="">
                        <div className="">
                            <div className="">
                                <input maxLength="1" className="" type="text" name="" id="" onChange={(e) => setOTPinput([e.target.value, OTPinput[1], OTPinput[2], OTPinput[3]])}></input>
                            </div>
                            <div className=" ">
                                <input maxLength="1" className="" type="text" name="" id="" onChange={(e) => setOTPinput([OTPinput[0], e.target.value, OTPinput[2], OTPinput[3]])}></input>
                            </div>
                            <div className="">
                                <input maxLength="1" className="" type="text" name="" id="" onChange={(e) => setOTPinput([OTPinput[0], OTPinput[1], e.target.value, OTPinput[3]])}></input>
                            </div>
                            <div className=" ">
                                <input maxLength="1" className="" type="text" name="" id="" onChange={(e) => setOTPinput([OTPinput[0], OTPinput[1], OTPinput[2], e.target.value,])}></input>
                            </div>
                        </div>

                        <div className="">
                            <div>
                                <a onClick={() => verfiyOTP()} className=""> Verify Account </a>
                            </div>

                            <div className="">
                                <p>Didn't recieve code?</p>{" "}
                                <a className=""
                                    style={{
                                        color: disable ? "gray" : "blue",
                                        cursor: disable ? "none" : "pointer",
                                        textDecorationLine: disable ? "none" : "underline",
                                    }}
                                    onClick={() => resendOTP()}
                                >
                                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OTPInput;