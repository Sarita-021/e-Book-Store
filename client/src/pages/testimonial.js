import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/testimonial.css";

const testimonialsData = [
    {
        id: 1,
        name: "John Doe",
        feedback: "This platform is amazing! It has helped me improve my productivity significantly.",
        designation: "Software Engineer",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: 2,
        name: "Jane Smith",
        feedback: "I love the user experience. The features are well thought out and easy to use.",
        designation: "Product Manager",
        image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        id: 3,
        name: "Alice Johnson",
        feedback: "Highly recommend this to anyone looking for an intuitive solution.",
        designation: "UX Designer",
        image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
];

const Testimonials = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="testimonials-container">
            <h2 className="testimonials-heading">Testimonials</h2>
            <p className="testimonials-subheading">Hear from our users! Real experiences, honest feedback, and success stories that showcase the impact of our platform.</p>
            <div data-aos="fade-up" className="testimonials-list">
                {testimonialsData.map(({ id, name, feedback, designation, image }) => (
                    <div key={id} className="testimonial-card" data-aos="fade-up">
                        <img src={image} alt={name} className="testimonial-image" />
                        <p className="testimonial-feedback">"{feedback}"</p>
                        <h4 className="testimonial-name">{name}</h4>
                        <p className="testimonial-designation">{designation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
