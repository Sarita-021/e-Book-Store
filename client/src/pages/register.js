import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Reg&Log.css";

function Register(props) {

    const handleSubmit = async (e) => {
        e.preventDefault();
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

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
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

            <div className="auth-form-container register">
                <form className="register-form form" onSubmit={handleSubmit}>
                    <div className="separateL">
                        <img className="auth-img" src="https://www.globalsign.com/application/files/4616/2199/5695/ManagedPKI_Strong_Authentication_Cover_1_APAC_2021_05_19.jpg" alt="authentication " />
                    </div>
                    <div className="separateR">
                        <p className="change">Already have an account
                            <button className="link-btn" onClick={() => navigate('/login')}>Login </button></p>
                        <h3>Weclome to BooKraze</h3>
                        <p className="tagline">Dicover a world of stories </p>
                        <h1>Register</h1>
                        <label className="label" htmlFor="name">Full name</label>
                        <input className="input" onChange={handleChange} value={inputs.name} name="name" id="name" placeholder="full Name" />

                        <label className="label" htmlFor="email">E-mail</label>
                        <input className="input" onChange={handleChange} value={inputs.email} type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                        <label className="label" htmlFor="password">Password</label>
                        <input className="input" onChange={handleChange} value={inputs.password} type="password" placeholder="********" id="password" name="password" />
                        <button className="btn" type="submit">Register</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Register;