import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../CSS/Reg&Log.css";
import toast from "react-hot-toast";

function Login(props) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            /*const { data } = await axios.post('https://book-store-one-smoky.vercel.app/api/v1/user/login', {
                email: inputs.email,
                password: inputs.password
            });*/
            console.log(data);
            window.sessionStorage.setItem("userdetails", JSON.stringify(data));
            window.localStorage.setItem("islogin", true);
            // login credentials found 
            if (data.success) {
                alert(data.message);
                toast.success("User login Successfully");
                navigate("/");
                alert(localStorage.getItem('islogin'));
            }
            // if user data not found or incorrect 
            else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);

        }
    }

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
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
                        <label className="label" htmlFor="email">Username</label>
                        <input className="input" onChange={handleChange} value={inputs.email} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label className="label" htmlFor="password">Password</label>
                        <input className="input" onChange={handleChange} value={inputs.password} type="password" placeholder="********" id="password" name="password" />
                        <button className="btn" type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;