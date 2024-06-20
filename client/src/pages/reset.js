import React from "react";
import { useState } from "react";
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, useLocation } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Reset() {

    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    //getting mail id of the user who want to reset the password
    const { state } = useLocation();
    const recp_email = state.recp_email;

    //Handle Change while inputing data
    const handleChaange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    // Password Show
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    //storing the value of variable
    const [inputs, setInputs] = useState({
        email: recp_email,
        password: '',
        confirmPassword: ''
    })

    //Handling Submit Action
    const handleSubmit = async (e) => {

        if (inputs.password === inputs.confirmPassword) {  //matching if both passwords are same
            try {
                console.log("hello", inputs.name)
                const { data } = await axios.post('/updatePassword', {   // calling updatePassword Route
                    email: recp_email,
                    password: inputs.password
                });
                if (data.success) {
                    alert("Password Updated Successfully!!! \n Go to Login page to Login.");
                    navigate("/recovered");
                }
            } catch (error) {   //Handling the error
                alert(error);
                console.log(error);
            }
        }
        else {
            alert("Password does not match!!!");
        }
    }


    return (
        <div>
            <section className="">
                <div className="">
                    <div className="">
                        <h2 className=""> Change Password </h2>
                        <form className="">
                            <div>
                                <label className="label" htmlFor="password">Password</label>
                                <input className="input" onChange={handleChaange} value={inputs.password} type={passwordShown ? "text" : "password"} placeholder="********" id="password" name="password" />

                                <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                                <input className="input" onChange={handleChaange} value={inputs.confirmPassword} type={passwordShown ? "text" : "password"} placeholder="********" id="confirmPassword" name="confirmPassword" />

                            </div>
                            <div className="passwordShow">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    onClick={togglePassword}
                                />
                                <p className="pStyle">Show Password</p>
                            </div>
                        </form>
                        <button onClick={() => handleSubmit()} className="" > Reset passwod </button>
                    </div>
                </div>
            </section>
        </div>
    );
}