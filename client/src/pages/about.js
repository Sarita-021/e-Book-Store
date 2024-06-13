import React from "react";
import "../CSS/about.css"

function About() {
    return (<div class="about-us-section">
        <div>
            <h1 className="title">KNOW US</h1>
        </div>

        <div className="container _1" data-aos="fade-left">
            <img src="./images/ac1.png" alt="ac1" width={250} />
            <div>
                <h2 className="heading"> Welcome to BookRaze,</h2>
                <p className="content">
                    A flourishing book store founded by passionate bibliophiles Suniti, Sarita, Arjun, and Prisha. Our journey began in June with an ardent desire to create a haven for all book lovers. Committed to our vision, we have been diligently working to curate an extensive collection of literary gems and provide an immersive reading experience to our customers. As we continue to expand our offerings and foster a vibrant community, we aim to be the ultimate destination for literary enthusiasts. Join us on this captivating literary adventure as we write new chapters in the world of books. Stay tuned for exciting updates!
                </p>
            </div>
        </div>
        <div className="container _2" data-aos="fade-right"> 
            <div>
                <h2 className="heading"> Join Us on this Literary Adventure: </h2>
                <p className="content">
                    As BookRaze continues to evolve and flourish, we invite all book lovers to join us on this magical literary adventure. Whether you're an avid reader seeking your next escapade or a curious soul exploring the wonders of literature, BookRaze welcomes you with open arms.
                </p>
            </div>
            <img src="./images/ac2.png" alt="ac2" width={250} />
        </div>
        <div className="container _3" data-aos="fade-left">
            <img src="./images/ac3.png" alt="ac3" width={250} />
            <div>
                <h2 className="heading"> BookRaze: Your Literary Haven </h2>
                <p className="content">
                    BookRaze is a book store with a curated collection, where you can add books to your personal collection and find purchase links. Filter books by genre, author, and more. Create an account to join our reading community, leave book reviews, and engage in book clubs. Discover new reads with personalized recommendations and connect with authors through virtual events. BookRaze: Your gateway to the magic of reading. Join us now!
                </p>
            </div>
        </div>
        <div className="container  _4" data-aos="fade-right">
            <div>
                <h2 className="heading">Evolution of the name "BookRaze" </h2>
                <p className="content">
                    The name "BookRaze" combines "Book" representing literature and "Raze" symbolizing transformative power, implying a platform where readers can explore and have their minds opened to new worlds of knowledge and imagination.
                </p>
            </div>
            <img src="./images/ac4.png" alt="ac4" width={250} />
        </div>
        <div className="container _5" data-aos="fade-left">
            <img src="./images/ac5.png" alt="ac5" width={250} />
            <div>
                <h2 className="heading"> Our Mission </h2>
                <p className="content">
                    BookRaze's name reflects its mission - a platform dedicated to literature where readers can explore the magic of books and experience the transformative power of reading. It symbolizes a place where minds are opened, perspectives are challenged, and new horizons are discovered through the written word. BookRaze goes beyond being a mere book store, fostering a community of passionate readers who come together to celebrate the joy of reading.
                </p>
            </div>
        </div>

    </div>



    )
}

export default About