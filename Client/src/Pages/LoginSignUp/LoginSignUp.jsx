import React, { useContext, useState, useEffect } from "react";
import "./LoginSignUp.css";
import { MesContext } from "../../Context/MesContextProvider";
import { toast } from "react-toastify";

const LoginSignUp = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { backend_url } = useContext(MesContext);
    const [otp, setOtp] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [otpCode, setOtpCode] = useState("");

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    // User Registration
    const userRegistration = async () => {
        if (!userData.name || !userData.email || !userData.password) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            toast.success(data.message);
            setOtp(true);
            localStorage.setItem("authToken", data.token);
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(`Registration failed: ${error.message}`);
        }
    };

    // User Login
    const userLogin = async () => {
        if (!userData.email || !userData.password) {
            toast.error("Email and password are required!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password
                })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            toast.success("Login successful!");
            localStorage.setItem("authToken", data.token);
        } catch (error) {
            console.error("Error during login:", error);
            toast.error(`Login failed: ${error.message}`);
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
        if (!otpCode) {
            toast.error("Please enter the OTP!");
            return;
        }

        try {
            const res = await fetch(`${backend_url}/api/user/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: userData.email, otp: otpCode })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "OTP verification failed");
            }

            toast.success("OTP Verified Successfully!");
            setOtp(false);
        } catch (error) {
            console.error("Error during OTP verification:", error);
            toast.error(`OTP verification failed: ${error.message}`);
        }
    };

    return (
        <div className="login-signup">
            <div className="auth-container">
                <div className="auth-box">
                    <div className="auth-left">
                        <h2>Welcome</h2>
                        <p>Dochaki Designs MES (Manufacturing Execution System) Page.</p>
                    </div>

                    <div className="auth-right">
                        <h2>{isLogin ? "LOGIN" : "SIGN UP"}</h2>

                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="auth-input"
                                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email"
                            className="auth-input"
                            onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="auth-input"
                            onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
                        />

                        {isLogin ? (
                            <button className="auth-button" onClick={userLogin}>Login</button>
                        ) : (
                            <button className="auth-button" onClick={userRegistration}>Send OTP</button>
                        )}

                        <div className="auth-toggle">
                            <button onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Create an account?" : "Already have an account?"}
                            </button>
                        </div>
                    </div>
                </div>

                {otp && (
                    <div className="otp">
                        <div className="otp-box">
                            <input
                                type="text"
                                placeholder="Enter OTP sent to your email"
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                            />
                            <button onClick={verifyOtp}>Verify OTP</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;
