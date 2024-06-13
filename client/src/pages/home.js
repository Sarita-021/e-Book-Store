import React, { useState } from "react";
import Book from "./book"
import bookspedia from "../bookspedia";
import "../CSS/home.css"
import AOS from "aos";
import 'aos/dist/aos.css';

AOS.init({
    duration: 1200,
});

function Home() {


    const [item, setItem] = useState(bookspedia);

    return (

        <div className="ctr">
            {/* Header section */}

            <div id="header">
                <div className="left-header aos-animate" data-aos="fade-right">
                    <span>Step into a realm of captivating stories and endless adventures</span>
                    <h3>Welcome to BookRaze!!!</h3>
                    <p>Join BookRaze and immerse yourself in the enchanting universe of books, where each page holds the promise of discovery.</p>
                    <button className="ordbtn btn" href=""><a href="">Order Now</a></button>
                </div>

                <div className="right-header aos-init aos-animate" data-aos="fade-left">
                    <img src="./images/bFace.png" alt="Header" />

                </div>
            </div>

            {/* Category section */}

            <div id="category-container">
                <div className="category-container-box" data-aos="fade-up">
                    <img src="./images/science-fiction.png" alt="Science fiction" />
                    <h3>Science Fiction</h3>
                </div>

                <div className="category-container-box" data-aos="fade-down">
                    <img src="./images/horror.png" alt="horror" />
                    <h3>Horror</h3>
                </div>

                <div className="category-container-box" data-aos="fade-up">
                    <img src="./images/romance.png" alt="romance" />
                    <h3>Romance</h3>
                </div>

                <div className="category-container-box" data-aos="fade-down">
                    <img src="./images/classic.png" alt="classic" />
                    <h3>Classic</h3>
                </div>

                <div className="category-container-box" data-aos="fade-up">
                    <img src="./images/Fantasy.png" alt="Fantasy" />
                    <h3>Fantasy</h3>
                </div>

                <div className="category-container-box" data-aos="fade-down">
                    <img src="./images/mystery.png" alt="mystery" />
                    <h3>Mystery</h3>
                </div>

                <div className="category-container-box" data-aos="fade-up">
                    <img src="./images/Hystorical-Fiction.png" alt="H-Fiction" />
                    <h3>Historical Fiction</h3>
                </div>

                <div className="category-container-box" data-aos="fade-down">
                    <img src="./images/adventure.png" alt="adventure" />
                    <h3>Adventure</h3>
                </div>

                <div className="category-container-box" data-aos="fade-up">
                    <img src="./images/drama.png" alt="drama" />
                    <h3>Drama</h3>
                </div>
            </div>

            {/* About container */}

            <div id="about-container">
                <div className="left-about-container" data-aos="fade-right">
                    <img src="./images/aboutMain.png" alt="About" />
                </div>

                <div className="right-about-container" data-aos="fade-left">
                    <span>What sets us apart from the rest?</span>
                    <h3 className="title">The Elements that Spice up our Seading Journey??</h3>
                    <p>Exceptional Book selection, Leave your Mark with Book Reviews, Easy Purchase Links, Create Your Personal Book Collection,
                        Advanced Book Filtering, Exclusive Titles available, Seamless browsing, User-friendly interface.
                        <br />Choose us for an Unforgettable Reading Experience.
                    </p>

                    <div className="right-about-container-icons">
                        <div className="right-about-container-icons-box">
                            <img src="./images/newArrival.png" alt="Fresh-Arrivals" />
                            <h3>Fresh Arrivals</h3>
                        </div>

                        <div className="right-about-container-icons-box">
                            <img src="./images/wideSelection.webp" alt="Wide-Selection" />
                            <h3>Wide Selection</h3>
                        </div>

                        <div className="right-about-container-icons-box">
                            <img src="./images/bestQ.png" alt="Best-Quality" />
                            <h3>Best Quality</h3>
                        </div>

                        <div className="right-about-container-icons-box">
                            <img src="./images/customerR.png" alt="Customer-Reviews" />
                            <h3>Customer Reviews</h3>
                        </div>

                        <div className="right-about-container-icons-box">
                            <img src="./images/userFriendly.png" alt="User-Friendly" />
                            <h3>User-Friendly Interface</h3>
                        </div>

                    </div>
                </div>
            </div>

            <div id="popular-container">
                <div className="popular-container-heading">
                    <span>Featured Books</span>
                    <h3>Bookworm's Delight, Handpicked Gems </h3>
                </div>

                <div className="featured">
                    <Book item={item.slice(2, 10)} />
                </div>
            </div>
        </div>

    );
}


export default Home;

