import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Reg&Log.css";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import PasswordChecklist from "react-password-checklist";

function Register(props) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [pmatch, setpmatch] = useState(false);

    //Handle Password
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    //Handle Confirm Password
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };


    // Password Show
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    //Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputs.password === inputs.confirmPassword) {
            try {
                console.log("hello", inputs.name)
                const { data } = await axios.post('https://e-book-store-ten.vercel.app/api/v1/user/register', {
                    username: inputs.name,
                    email: inputs.email,
                    password: inputs.password
                });
                if (data.success) {
                    alert("user registered successfully");
                    navigate("/login");
                }
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
        else {
            alert("Password does not match!!!");
        }
    }

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>

            <div className="auth-form-container register">
                <form className="register-form form" onSubmit={handleSubmit}>
                    <div className="separateL">
                        <img className="auth-img" src="https://www.globalsign.com/application/files/4616/2199/5695/ManagedPKI_Strong_Authentication_Cover_1_APAC_2021_05_19.jpg" alt="authentication " />
                        <div className="passwordCheckList">
                            <PasswordChecklist
                                rules={["minLength", "specialChar", "number", "capital", "match", "lowercase"]}
                                minLength={8}
                                value={inputs.password}
                                valueAgain={inputs.confirmPassword}
                            />
                        </div>
                    </div>
                    <div className="separateR">
                        <p className="change">Already have an account
                            <button className="link-btn" onClick={() => navigate('/login')}>Login </button></p>
                        <h3>Weclome to BooKraze</h3>
                        <p className="tagline">Dicover a world of stories </p>
                        <h1>Register</h1>

                        <div className="inputContainer">
                            <label className="label" htmlFor="name">Full name</label>
                            <input className="input" onChange={handleChange} value={inputs.name} name="name" id="name" placeholder="Enter Your Name" />

                            <label className="label" htmlFor="email">E-mail</label>
                            <input className="input" onChange={handleChange} value={inputs.email} type="email" placeholder="your-email@gmail.com" id="email" name="email" />

                            <label className="label" htmlFor="password">Password</label>
                            <input className="input" onChange={handlePassword} value={inputs.password} type={passwordShown ? "text" : "password"} placeholder="********" id="password" name="password" />

                            <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                            <input className="input" onChange={handleConfirmPassword} value={inputs.confirmPassword} type={passwordShown ? "text" : "password"} placeholder="********" id="confirmPassword" name="confirmPassword" />

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

                            <button className="btn" type="submit">Register</button>

                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Register;