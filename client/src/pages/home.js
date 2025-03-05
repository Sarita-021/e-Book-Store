import React, { useState, useEffect } from "react";
import Book from "./book";
import "../CSS/home.css";
import AOS from "aos";
import 'aos/dist/aos.css';
import axios from 'axios';
import Testimonials from "./testimonial";

AOS.init({
    duration: 1200,
});

function Home() {

    const [item, setItem] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('https://e-book-store-ten.vercel.app/api/v1/user/all-books');
                setItem(data);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    const categories = [
        { img: "./images/science-fiction.png", title: "Science Fiction" },
        { img: "./images/horror.png", title: "Horror" },
        { img: "./images/romance.png", title: "Romance" },
        { img: "./images/classic.png", title: "Classic" },
        { img: "./images/Fantasy.png", title: "Fantasy" },
        { img: "./images/mystery.png", title: "Mystery" },
        { img: "./images/Hystorical-Fiction.png", title: "Historical Fiction" },
        { img: "./images/adventure.png", title: "Adventure" },
        { img: "./images/drama.png", title: "Drama" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCategory((prev) => (prev + 1) % categories.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [categories.length]);

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

            <div id="category-container" className="category-row" style={{ display: 'flex', overflow: 'hidden' }}>
                {categories.map((category, index) => (
                    <div
                        className="category-container-box"
                        key={index}
                        data-aos="fade-up"
                        style={{ transform: `translateX(-${currentCategory * 100}%)`, transition: 'transform 0.5s ease-in-out', minWidth: '100%' }}
                    >
                        <img src={category.img} alt={category.title} />
                        <h3>{category.title}</h3>
                    </div>
                ))}
            </div>

            {/* About container */}

            <div id="about-container">
                <div className="left-about-container" data-aos="fade-right">
                    <img src="./images/aboutMain.png" alt="About" />
                </div>

                <div className="right-about-container" data-aos="fade-left">
                    <span>What sets us apart from the rest?</span>
                    <h3 className="title">The Elements that Spice up our Reading Journey??</h3>
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
                    <Book item={item.slice(2, 6)} />
                </div>
            </div>

            <div id="testimonial">
              <Testimonials />
            </div>
        </div>

    );
}


export default Home;
