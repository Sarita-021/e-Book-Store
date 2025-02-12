import React from "react";
import "../CSS/about.css";

function About() {
    return (<div class="about-us-section">
        <div className="container _1" >      
            <div className="detail">
            <div data-aos="fade-down">
                <h1 className="title" style={{textAlign: "left"}}>ABOUT US</h1>
            </div>
                <h2 className="heading"> Welcome to BookRaze,</h2>
                <p className="content">
                    A flourishing book store founded by passionate bibliophiles Suniti, Sarita, Arjun, and Prisha. Our journey began in June with an ardent desire to create a haven for all book lovers. Committed to our vision, we have been diligently working to curate an extensive collection of literary gems and provide an immersive reading experience to our customers. As we continue to expand our offerings and foster a vibrant community, we aim to be the ultimate destination for literary enthusiasts. Join us on this captivating literary adventure as we write new chapters in the world of books. Stay tuned for exciting updates!
                </p>
            </div>
            <img src="./images/ac1.png" alt="ac1" width={250} />
            <div className="overlay-1">
                <div className="text">Welcome to BookRaze</div>
            </div>
        </div>
        <div className="container _2" data-aos="fade-right">
            <div className="detail">
                <h2 className="heading headD"> Join Us on this Literary Adventure: </h2>
                <p className="content">
                    As BookRaze continues to evolve and flourish, we invite all book lovers to join us on this magical literary adventure. Whether you're an avid reader seeking your next escapade or a curious soul exploring the wonders of literature, BookRaze welcomes you with open arms.
                </p>
            </div>
            <div className="offer">
                <div className="features">
                <img src="./images/classic.png" alt="classic" />
                    <h4>What We Offer:</h4>
                    <div className="feature">
                        <p>A vast collection of eBooks across all genres</p>
                        <p>Personalized recommendations tailored to your taste</p>
                    </div>
                </div>
                <div className="features">
                    <div className="feature">
            <img src="./images/ac2.png" alt="ac2" width={250} />
                    <h4>Why Choose BookRaze?</h4>
                        <p>At BookRaze, we believe that every book has a story to tell and every reader deserves a place to discover, discuss, and share their love for literature.</p>
                    </div>
                </div>
                <div className="features">
                <img src="./images/Hystorical-Fiction.png" alt="H-Fiction" />
                    <h4> Get Started Today!</h4>
                    <div className="feature">
                        <p>Explore thousands of books, and ignite your passion for reading. Sign up today and let’s embark on this incredible literary adventure together!</p>
                    </div>
                </div>
            </div>
            <div className="overlay">
                <div className="text">Join Us</div>
            </div>
        </div>
        <div className="container _3" data-aos="fade-left">
            <img src="./images/ac3.png" alt="ac3" width={250} />
            <div className="detail">
                <h2 className="heading"> BookRaze: Your Literary Haven </h2>
                <p className="content">
                    BookRaze is a book store with a curated collection, where you can add books to your personal collection and find purchase links. Filter books by genre, author, and more. Create an account to join our reading community, leave book reviews, and engage in book clubs. Discover new reads with personalized recommendations and connect with authors through virtual events. BookRaze: Your gateway to the magic of reading. Join us now!
                </p>
            </div>
            <div className="overlay-1">
                <div className="text">Your Literary Haven</div>
            </div>
        </div>
        <div className="container  _4" data-aos="fade-right">
            <div className="detail">
                <h2 className="heading headD">Evolution of the name "BookRaze" </h2>
                <p className="content">
                    The name "BookRaze" combines "Book" representing literature and "Raze" symbolizing transformative power, implying a platform where readers can explore and have their minds opened to new worlds of knowledge and imagination.
                </p>
            </div>
            <img src="./images/ac4.png" alt="ac4" width={250} />
            <div className="overlay">
                <div className="text">Evolution</div>
            </div>
        </div>
        <div className="container _5" data-aos="fade-left">
            <img src="./images/ac5.png" alt="ac5" width={250} />
            <div className="detail">
                <h2 className="heading"> Our Mission </h2>
                <p className="content">
                    BookRaze's name reflects its mission - a platform dedicated to literature where readers can explore the magic of books and experience the transformative power of reading. It symbolizes a place where minds are opened, perspectives are challenged, and new horizons are discovered through the written word. BookRaze goes beyond being a mere book store, fostering a community of passionate readers who come together to celebrate the joy of reading.
                </p>
            </div>
            <div className="overlay-1">
                <div className="text">Our Mission</div>
            </div>
        </div>
        {/* <div class="ball"></div> */}
        {/* </div> */}

    </div>



    )
}

export default About