import { Link, useLocation } from 'react-router-dom';
import Mainlogo from '../assets/Frame 3.png';
import './NavBar.css';
import jobs from '../pages/JobsListing';

const Navbar = () => {
    const { pathname } = useLocation();

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <img src={Mainlogo} alt="Logo" />
                <h2 className="company-name">QuickHire</h2>
            </div>

            {/* Nav Links */}
            <div className="jobs-class">
                <Link to="/jobs" element={jobs} className={`nav-link ${pathname === '/jobs' ? 'active' : ''}`}>
                    Find Jobs
                </Link>
                <Link to="/companies" className={`nav-link ${pathname === '/companies' ? 'active' : ''}`}>
                    Browse Companies
                </Link>
            </div>

            {/* Auth Buttons */}
            <div className="navbar-actions">
                <Link to="/login" className="navbar-login">Login</Link>
                <div className="navbar-divider" />
                <Link to="/signup" className="navbar-signup">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;