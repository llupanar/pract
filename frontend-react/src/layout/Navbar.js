import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={{ backgroundColor: '#ffc107', padding: '20px', fontSize: '24px' }}>
            <ul style={{display: 'flex', listStyleType: 'none'}}>
                <li style={{marginRight: '10px'}}>
                    <Link to="/job-title" style={{color: '#4b4444'}}>
                        Job Title
                    </Link>
                </li>
                <li style={{marginRight: '10px'}}>
                    <Link to="/client" style={{color: '#4b4444'}}>
                        Client
                    </Link>
                </li>
                <li style={{marginRight: '10px'}}>
                    <Link to="/employee" style={{color: '#4b4444'}}>
                        Employee
                    </Link>
                </li>
                <li style={{marginRight: '10px'}}>
                    <Link to="/lesson" style={{color: '#4b4444'}}>
                        Lesson
                    </Link>

                </li>
                <li style={{marginRight: '10px'}}>
                    <Link to="/visit" style={{color: '#4b4444'}}>
                        Visit
                    </Link>
                </li>
                <li style={{marginRight: '10px'}}>
                    <Link to="/swgroup" style={{color: '#4b4444'}}>
                        Group
                    </Link>
                </li>
                <li style={{marginRight: '10px'}}>
                    <Link to="/schedule" style={{color: '#4b4444'}}>
                        Schedule
                    </Link>
                </li>
                <li style={{marginRight: '10px'}}>
                    <Link to="/subs" style={{color: '#4b4444'}}>
                        Subscriptions
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;