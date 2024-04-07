import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav style={{ backgroundColor: '#ffc107', padding: '20px', fontSize: '24px', fontFamily: 'Roboto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={toggleMenu}
                        style={{
                            color: '#333',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '24px',
                        }}
                    >
                        &#9776;
                    </button>
                    {isMenuOpen && (
                        <ul
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                backgroundColor: '#181717',
                                padding: '10px',
                                listStyleType: 'none',
                                margin: 0,
                                zIndex: 1,
                            }}
                        >
                            <li>
                                <Link
                                    to="/job-title"
                                    style={{
                                        color: location.pathname === '/job-title' ? '#ffc107' : '#ccc',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Job Titles
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/client"
                                    style={{
                                        color: location.pathname === '/client' ? '#ffc107' : '#ccc',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Clients
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/employee"
                                    style={{
                                        color: location.pathname === '/employee' ? '#ffc107' : '#ccc',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Employee
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/lesson"
                                    style={{
                                        color: location.pathname === '/lesson' ? '#ffc107' : '#ccc',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Lessons
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/subs"
                                    style={{
                                        color: location.pathname === '/subs' ? '#ffc107' : '#ccc',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Subscriptions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/schedule"
                                    style={{
                                        color: location.pathname === '/schedule' ? '#ffc107' : '#ccc',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Schedules
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/swgroup"
                                    style={{
                                        color: location.pathname === '/swgroup' ? '#ffc107' : '#ccc',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Groups
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/visit"
                                    style={{
                                        color: location.pathname === '/visit' ? '#ffc107' : '#ccc',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    Visits
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                <div>
                    <Link to="/" style={{color: '#333', textDecoration: 'none'}}>
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;