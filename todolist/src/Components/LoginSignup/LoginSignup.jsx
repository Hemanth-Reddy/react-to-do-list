import React, { useState } from 'react';
import './LoginSignup.css'
import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'
import email_icon from '../Assets/email.png'

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authSuccessMessage, setAuthSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLoginSubmit = async () => {

        if (!email || !password) {
            setErrorMessage("Please enter both email and password");
            return;
        }

        try {

            // Your API endpoint URL for authentication
            const API_URL = 'http://127.0.0.1:8080/user/login';

            // Make a POST request to your Java API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Pass user credentials here
                    email,
                    password
                })
            });
            

            // Check if the response is successful (status code 200-299)
            if (response.ok) {
                // Authentication successful, set success message
                setAuthSuccessMessage("Authentication successful");
                setErrorMessage("");
            } else {
                setAuthSuccessMessage("");
                setErrorMessage("Login failed!");
                // Authentication failed, handle the error
                console.error('Authentication failed');
            }
        } catch (error) {
            setAuthSuccessMessage("");
            setErrorMessage("Login failed!");
            // Handle network errors or other exceptions
            console.error('Error occurred while authenticating user:', error);
        }
    };

    const handleSignUpSubmit = async () => {

        if (!email || !password) {
            setErrorMessage("Please enter both email and password");
            return;
        }

        try {

            // Your API endpoint URL for authentication
            const API_URL = 'http://127.0.0.1:8080/user/register';

            // Make a POST request to your Java API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Pass user credentials here
                    name,
                    email,
                    password
                })
            });
            

            // Check if the response is successful (status code 200-299)
            if (response.ok) {
                // Authentication successful, set success message
                setAuthSuccessMessage("Registration successful!");
                setErrorMessage("");
            } else {
                setAuthSuccessMessage("");
                setErrorMessage("");
                // Authentication failed, handle the error
                console.error('Authentication failed');
            }
        } catch (error) {
            setAuthSuccessMessage("");
            setErrorMessage("Registration failed!");
            // Handle network errors or other exceptions
            console.error('Error occurred while authenticating user:', error);
        }
    };

    const handleLoginClick = () => {
        // Clear error message when login button is clicked
        setErrorMessage("");
        setAuthSuccessMessage("");
        // Set action to "Login"
        setAction("Login");
        // Make API call
        handleLoginSubmit();
    };

    const handleSignUpClick = () => {
        // Clear error message when login button is clicked
        setErrorMessage("");
        setAuthSuccessMessage("");
        // Set action to "Login"
        setName('');
        setEmail('');
        setPassword('');
        setAction("Sign Up");
        handleSignUpSubmit();
        
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div> :
                    <div className="input">
                        <img src={user_icon} alt=""></img>
                        <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>}
                <div className="input">
                    <img src={email_icon} alt=""></img>
                    <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_icon} alt=""></img>
                    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password <span>Click here!</span></div>}
            <div className="submit-container">
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={handleLoginClick}>
                    Login
                </div>
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignUpClick} >
                    Sign Up
                </div>
            </div>
            {/* Display authentication success message */}
            {authSuccessMessage && <div>{authSuccessMessage}</div>}
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
}

export default LoginSignup;
