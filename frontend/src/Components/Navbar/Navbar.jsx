import React from 'react'
import './Navbar.css';
// Import Logo
import logo from '../../Logo/logo.png';

// Menu Icon
import MenuIcon from '@mui/icons-material/Menu';

// Import UseNavigate
import { useNavigate } from 'react-router-dom';
// Import NavLink
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    // Navigate
    const navigate = useNavigate();

    // NavLink Active Style
    const navLinkStyle = ({ isActive }) => {
        return {
            background: isActive ? "linear-gradient(to right,#9e0bac, #1c0d9e" : "",
            color: isActive ? "white" : ""
        }
    }

    return (
        <>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <div className="container-fluid">
                        {/* Logo  */}
                        <NavLink className="navbar-brand" to='/'><img
                            src={logo}
                            alt="BS5 Logo" />
                            <span className="navbar-text m-2">NOTEmonk</span>
                        </NavLink>

                        {/* Collapsiable  */}
                        <p className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" style={{ borderStyle: 'none' }}>
                            <MenuIcon />
                        </p>
                        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <NavLink className="nav-item" style={navLinkStyle} to='/'>
                                    Home
                                </NavLink>
                                <NavLink className="nav-item" style={navLinkStyle} to='/about'>
                                    About
                                </NavLink>
                                <NavLink className="nav-item" style={navLinkStyle} to='/signup'>
                                    SignUp
                                </NavLink>
                                <NavLink className="nav-item" style={navLinkStyle} to='/signin'>
                                    SignIn
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                </nav>
        </>
    )
}

export default Navbar
