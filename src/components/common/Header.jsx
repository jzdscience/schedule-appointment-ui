import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/professor">Professor Dashboard</Link></li>
                    <li><Link to="/student">Student Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
