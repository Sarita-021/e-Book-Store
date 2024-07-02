import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import "../CSS/App.css"
import Navbar from "../pages/navbar";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Footer from "../components/footer";
import AllBooks from "../pages/allbooks";
import Collection from "../pages/collection";
import About from "../pages/about";
import AddBooks from "../pages/addBooks";

import { useState, createContext } from "react";
import OTPInput from "../pages/OTPInput";
import Recovered from "../pages/recovered";
import Reset from "../pages/reset";

export const RecoveryContext = createContext();
function App() {

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/allBooks" element={<AllBooks />} />
                    <Route exact path="/collection" element={<Collection />} />
                    <Route exact path="/OTPInput" element={<OTPInput />} />
                    <Route exact path="/reset" element={<Reset />} />
                    <Route exact path="/recovered" element={<Recovered />} />
                    <Route exact path="/addBooks" element={<AddBooks />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;



