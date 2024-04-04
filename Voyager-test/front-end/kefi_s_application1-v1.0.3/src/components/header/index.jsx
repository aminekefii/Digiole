import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <nav style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', width: '100%', zIndex: '20', position: 'fixed', top: '0', left: '0', height: '3rem', borderBottom: '1px solid #cbd5e0', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7fafc' }}>
            {userLoggedIn ? (
                <button
                    onClick={() => { doSignOut().then(() => { navigate('/login') }) }}
                    style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    Logout
                </button>
            ) : (
                <>
                    <Link
                        to={'/login'}
                        style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'underline' }}
                    >
                        Login
                    </Link>
                    <Link
                        to={'/register'}
                        style={{ fontSize: '0.875rem', color: '#3b82f6', textDecoration: 'underline' }}
                    >
                        Register New Account
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Header;
