import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => (
    <header className="header">
        <Link to={'/'} className="nav-link">
            <div className="header-logo">
                <img
                    src="./assets/party-games-logo.png"
                    className="logo-header"
                    height="40" />
                <span>
                    <h2>Party Games</h2>
                </span>
            </div>
        </Link>
    </header>
);

export default Header;