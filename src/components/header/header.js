import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => (
    <header className="header">
        <Link to={'/'} className="nav-link">
            <img 
            src="./assets/party-games-logo.png" 
            className="logo-header"
            height="40" />
            <h2>Party Games</h2>
        </Link>
    </header>
);

export default Header;