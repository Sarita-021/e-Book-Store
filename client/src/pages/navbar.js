import react, { useEffect, useState } from "react";
import "../CSS/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./redux/features/themeSlice";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Sun, Moon } from "lucide-react";

const Navbar = () => {

    let isLogin = sessionStorage.getItem('islogin');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    console.log(sessionStorage.getItem('islogin'))

    const handleLogout = () => {
        try {
            // Clear sessionStorage (and any other necessary data)
            sessionStorage.clear();
            toast.success("Logout Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark"); 
        } else {
            document.body.classList.remove("dark"); 
        }
    }, [darkMode]);
    


    const [Mobile, setMobile] = useState(false)


    return (
        <header>
            <div id="navbar">
                <div className="left-navigation dark:text-sky-400">
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
                        <div onClick={() => dispatch(toggleDarkMode())} className="cursor-pointer">
                        {darkMode ? <Sun className="text-white" /> : <Moon className="text-black transition-none" />}
                                        </div>
                            <div className="cart"><NavLink id="cart-btn" activeClassName="active" className="link" to="/collection"><ShoppingCartIcon /></NavLink></div>
                            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <NavLink activeClassName="active" className="profile" to="/profile">
                                    <img className="pimg" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="profile" />
                                </NavLink>
                                {isHovered && (
                                    <div className="phover">
                                        <NavLink activeClassName="active" to="/profile" className="link" > Profile </NavLink>
                                        <NavLink activeClassName="active" onClick={handleLogout} className="link" to="/" > Logout </NavLink>
                                    </div>
                                )}
                            </div>
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
                        <div onClick={() => dispatch(toggleDarkMode())} className="cursor-pointer">
                        {darkMode ? <Sun className="text-white" /> : <Moon className="text-black" />}
                                        </div>
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

