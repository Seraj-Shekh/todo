import { Link, useNavigate } from 'react-router-dom';
import './Authentication.css';
import React from 'react';
import { useUser } from '../context/useUser';

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
});

export default function Authentication({ authenticationMode }) {
    const { user, setUser, signUp, signIn } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (authenticationMode === AuthenticationMode.Register) {
                await signUp();
                navigate('/signin');
            } else {
                await signIn();
                navigate('/');
            }
        } catch (error) {
            console.error("Authentication Error:", error); 
            alert(error.message || "An unknown error occurred.");
        }
    };
    
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h3 className="auth-title">{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={user.password}
                            onChange={e => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <button className="auth-button">
                            {authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}
                        </button>
                    </div>
                    <div className="auth-footer">
                        <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'} className="auth-link">
                            {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already have an account? Sign in'}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
