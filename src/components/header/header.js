import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => (
    <header className="header">
        <Link to={'/'} className="nav-link">
            <h2>Party Games</h2>
        </Link>

        <nav>
            <Link to={'/dontDoItGame'} className="nav-link">ActionGame</Link>
            <Link to={'/guessMeGame'} className="nav-link">GuessGame</Link>
        </nav>
    </header>
);

export default Header;