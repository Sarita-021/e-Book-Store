import react, { useEffect, useState } from "react";
import "../CSS/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {

    let isLogin = localStorage.getItem('islogin');
    const navigate = useNavigate();

    console.log(localStorage.getItem('islogin'))

    const handleLogout = () => {
        try {
            localStorage.setItem("islogin", false)
            toast.success("Logout Successfully");
            navigate("/login");
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    };


    const [Mobile, setMobile] = useState(false)


    return (
        <header>
            <div id="navbar">
                <div className="left-navigation">
                    <i className="ri-store-2-line"></i>
                    BookRaze
                </div>
                {isLogin &&
                    <>
                        <div className={Mobile ? "show middle-navigation" : "hide middle-navigation"} onClick={() => setMobile(false)} >
                            <ul>
                                <li><NavLink exact activeClassName="active" className="link" to="/">Home</NavLink></li>
                                <li><NavLink activeClassName="active" className="link" to="/about">About</NavLink></li>
                                <li><NavLink activeClassName="active" className="link" to="/allbooks">All Books</NavLink></li>
                            </ul>
                        </div>

                        <div className="right-navigation">
                            <div className="cart"><NavLink id="cart-btn" activeClassName="active" className="link" to="/collection"><ShoppingCartIcon /></NavLink></div>
                            <div><NavLink activeClassName="active" onClick={handleLogout} className="link" to="/" >Logout </NavLink></div>
                            <div id="menu-btn" onClick={() => setMobile(!Mobile)} class="menu-btn hide">{Mobile ? <CloseIcon /> : <MenuIcon />}</div>
                        </div>
                    </>
                }

                {!isLogin &&
                    <>
                        <div className={Mobile ? "hide middle-navigation" : "show middle-navigation"} onClick={() => setMobile(false)}>
                            <ul>
                                <li><NavLink exact activeClassName="active" className="link" to="/">Home</NavLink></li>
                                <li><NavLink activeClassName="active" className="link" to="/about">About</NavLink></li>
                                <li><NavLink activeClassName="active" className="link" to="/allbooks">All Books</NavLink></li>
                            </ul>
                        </div>
                        <div className="right-navigation">
                            <div><NavLink id="login-btn" activeClassName="active" className="link" to="/login">Login</NavLink></div>
                            <div><NavLink activeClassName="active" className="link" to="/register">Register</NavLink></div>
                            <div id="menu-btn" onClick={() => setMobile(!Mobile)} className="menu-btn hide">{Mobile ? <MenuIcon /> : <CloseIcon />}</div>
                        </div>
                    </>}

            </div>
        </header>
    );
}

export default Navbar;

