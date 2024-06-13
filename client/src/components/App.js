import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import "../CSS/App.css"
import Navbar from "../pages/navbar";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Footer from "../components/footer";
import AllBooks from "../pages/allbooks";
import Collection from "../pages/collection"
import About from "../pages/about"


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
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;



