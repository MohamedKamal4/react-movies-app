import { RiWhatsappFill } from "react-icons/ri";
import { AiFillLinkedin } from "react-icons/ai";
import { CgFacebook, CgInstagram } from "react-icons/cg";
import { Link } from "react-router-dom";
import './footer.css';
export default function Footer() {




    return (
        <footer>
            <div className="content py-5 mt-5 container">
                <h1 className="text-center text-white fs-5">The final project for <span className="fs-4 fw-bold text-danger">IT SHARKS ACADEMY</span> BY / MOHAMED KAMAL</h1>
                <ul className="d-flex justify-content-center align-items-center gap-4 p-0">
                    <li><Link to="https://www.facebook.com/profile.php?id=100086395095483" style={{ color: '#1877F2' }}><CgFacebook /></Link></li>
                    <li><Link to="https://www.instagram.com/madamedo344/" ><CgInstagram style={{ color: '#E1306C' }} /></Link> </li>
                    <li><Link to="https://www.linkedin.com/in/mohamed-kamal-954aa0346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" style={{ color: '#0A66C2' }}><AiFillLinkedin /></Link> </li>
                    <li><Link to="https://wa.me/201009491669" style={{ color: '#25D366' }}><RiWhatsappFill /></Link></li>
                </ul>
            </div>
        </footer>
    )
}