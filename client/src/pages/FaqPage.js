
import { useState } from "react";
import "../CSS/faqpage.css";

const FaqPage = () => {
    
    const [openQuestion, setOpenQuestion] = useState(null);
   
    const toggleAnswer = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    return (
        <container className="container" data-aos="zoom-in-up">
            <description className="box-container-faq">
                <h2 style={{color:'#a79ec5'}}>FAQ's</h2>
                <h2 style={{ color: "purple" }}>Let's Make Something Awesome Together</h2>
                <p>Here, you'll find answers to the most common questions about our E-Book Store and services. Whether you need help with browsing our catalog, making a purchase, or troubleshooting your account, we’ve got you covered.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                    <div className="checks">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                        </svg>
                        <p>Top Quality Services</p>
                    </div>
                    <div className="checks">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" className="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                        </svg>
                        <p>User Experience</p>
                    </div>
                </div>
            </description>

            <questions className="box-container-faq">
                {/* Question 1 */}
                <div className="faq-item">
                    <div className="faq-header" 
                        onClick={() => toggleAnswer(0)} 
                        style={{ color: openQuestion === 0 ? "purple" : "rgb(81, 67, 87)" }}
                    >
                        <h4>How do I browse your E-book catalog?</h4>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="purple"
                            className={`bi bi-chevron-down arrow ${openQuestion === 0 ? "rotate" : ""}`}
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 12.5l4-4H4z" />
                        </svg>
                    </div>
                    {openQuestion === 0 && <p>You can browse our catalog by using the search bar or by exploring our categories. Simply click on a category or type a title or author into the search bar to find the E-books you're looking for.</p>}
                </div>

                {/* Question 2 */}
                <div className="faq-item">
                    <div className="faq-header" 
                        onClick={() => toggleAnswer(1)} 
                        style={{ color: openQuestion === 1 ? "purple" : "rgb(81, 67, 87)" }}
                    >
                        <h4>How do I purchase an E-book?</h4>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="purple"
                            className={`bi bi-chevron-down arrow ${openQuestion === 1 ? "rotate" : ""}`}
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 12.5l4-4H4z" />
                        </svg>
                    </div>
                    {openQuestion === 1 && <p>Once you've found the E-book you want, click on the 'Add to Cart' button. You can then proceed to checkout, where you’ll enter your payment information to complete your purchase.</p>}
                </div>

                {/* Question 3 */}
                <div className="faq-item">
                    <div className="faq-header" 
                        onClick={() => toggleAnswer(2)} 
                        style={{ color: openQuestion === 2 ? "purple" : "rgb(81, 67, 87)" }}
                    >
                        <h4>What payment methods do you accept?</h4>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="purple"
                            className={`bi bi-chevron-down arrow ${openQuestion === 2 ? "rotate" : ""}`}
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 12.5l4-4H4z" />
                        </svg>
                    </div>
                    {openQuestion === 2 && <p>We accept all major credit cards, PayPal, and other secure payment methods. During checkout, you'll be able to choose your preferred payment option.</p>}
                </div>

                {/* Question 4 */}
                <div className="faq-item">
                    <div className="faq-header" 
                        onClick={() => toggleAnswer(3)} 
                        style={{ color: openQuestion === 3 ? "purple" : "rgb(81, 67, 87)" }}
                    >
                        <h4>How do I access my purchased E-books?</h4>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="purple"
                            className={`bi bi-chevron-down arrow ${openQuestion === 3 ? "rotate" : ""}`}
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 12.5l4-4H4z" />
                        </svg>
                    </div>
                    {openQuestion === 3 && <p>Once your purchase is complete, you can access your E-books in your account's library. Simply log in, go to 'My Library,' and you'll find all your purchased titles there.</p>}
                </div>

                {/* Question 5 */}
                <div className="faq-item">
                    <div className="faq-header" 
                        onClick={() => toggleAnswer(4)} 
                        style={{ color: openQuestion === 4 ? "purple" : "rgb(81, 67, 87)" }}
                    >
                        <h4>I forgot my account password. What should I do?</h4>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="purple"
                            className={`bi bi-chevron-down arrow ${openQuestion === 4 ? "rotate" : ""}`}
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 12.5l4-4H4z" />
                        </svg>
                    </div>
                    {openQuestion === 4 && <p>If you've forgotten your password, click on the 'Forgot Password?' link on the login page. You’ll be sent an email with instructions on how to reset your password.</p>}
                </div>
            </questions>
        </container>
    );
};

export default FaqPage;
