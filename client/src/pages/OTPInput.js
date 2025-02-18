import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/OTPInput.css";

function OTPInput() {
  const [timerCount, setTimer] = React.useState(60);
  const [otp, setotp] = useState(new Array(4).fill(""));
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  // Fetching the user mailid and otp from login page
  const { state } = useLocation();
  const recp_email = state.recp_email;
  const Otp = state.Otp;

  // function handling resend mail
  const resendOTP = async () => {
    if (disable) return;
    const OTP = Math.floor(Math.random() * 9000 + 1000); // resend otp generation
    const { data } = await axios.post(
      "https://e-book-store-ten.vercel.app/api/v1/user/send_recovery_email",
      {
        //Sending the details to backend to send mail to user
        email: recp_email,
        OTP: OTP,
        procedure: "Password Recovery",
      }
    );
    setDisable(true); //Disabling the resend button
    setTimer(60); //Setting the timer again
    const da = {
      recp_email: recp_email,
      Otp: OTP, //Storing the updated otp for matching
    };
    //  Mail sent
    if (data.success) {
      toast.success(data.message);
      navigate("/OTPInput", { state: da });
    }
    // Mail send error
    else {
      toast.error(data.message);
    }
  };

  //Verifying the otp
  const verfiyOTP = () => {
    const da = {
      //creating constant to store user details
      recp_email: recp_email,
    };
    if (parseInt(otp.join("")) === Otp) {
      navigate("/reset", { state: da }); //passing the mail to the reset route
      return;
    }
    toast.error("OOPS!! incorrect OTP, try again");
    return;
  };

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

  const handleotp = (e, index, key) => {
    if (isNaN(e.target.value)) return false;
    setotp([
      ...otp.map((data, indx) => (indx === index ? e.target.value : data)),
    ]);
    console.log(e);
    if (e.target.value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  return (
    <div className="main-container">
      <div className="box-container">
        <div className="heading">
          <h1 style={{ fontSize: "2rem", lineHeight: "1rem" }}>
            Email Verification
          </h1>
          <h4 style={{ color: "gray", fontSize: "14px", lineHeight: "4rem" }}>
            We have sent a code to your email {recp_email}
          </h4>
        </div>

        <div>
          <form>
            <div className="otp-container">
              {/* <div className="inp-container">
                                <input maxLength="1" className="inpBox" type="text" name="" id="B1" length="1" autoFocus onkeyup={() => moveToNext('B-2')}
                                    onChange={(e) => {
                                        setOTPinput([e.target.value, OTPinput[1], OTPinput[2], OTPinput[3]])
                                        moveToNext('B-2')
                                        // setCursor('B2')
                                    }}>
                                </input>
                                <input maxLength="1" className="inpBox" type="text" name="" id="B2" length="1" onKeyUp={() => moveToNext('B-3')}
                                    onChange={(e) => setOTPinput([OTPinput[0], e.target.value, OTPinput[2], OTPinput[3]])}>
                                </input>
                                <input maxLength="1" className="inpBox" type="text" name="" id="B3" length="1" onkeyup={() => moveToNext('B-4')}
                                    onChange={(e) => setOTPinput([OTPinput[0], OTPinput[1], e.target.value, OTPinput[3]])}>
                                </input>
                                <input maxLength="1" className="inpBox" type="text" name="" id="B4" length="1"
                                    onChange={(e) => setOTPinput([OTPinput[0], OTPinput[1], OTPinput[2], e.target.value,])}
                                ></input>
                            </div> */}
              <div className="inp-container">
                {otp.map((data, i) => {
                  return (
                    <input
                      type="text"
                      maxLength={1}
                      className="inpBox"
                      value={data}
                      onChange={(e) => handleotp(e, i)}
                    />
                  );
                })}
              </div>

              <div className="btm-container">
                <button onClick={() => verfiyOTP()} className="btn">
                  {" "}
                  Verify Account{" "}
                </button>

                <div className="resend-container">
                  <p>Didn't recieve code?</p>{" "}
                  <p
                    className="resend-btn"
                    style={{
                      color: disable ? "gray" : "blue",
                      cursor: disable ? "none" : "pointer",
                      textDecorationLine: disable ? "none" : "underline",
                    }}
                    onClick={() => resendOTP()}
                  >
                    {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTPInput;
