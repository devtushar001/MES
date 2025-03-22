import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import "./LoginSignUp.css";
import { MesContext } from "../../Context/MesContextProvider";
import { toast } from "react-toastify";

const LoginSignUp = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [otp, setOtp] = useState(false);
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
                        {!isLogin && <input type="text" placeholder="Full Name" className="auth-input" />}
                        <input type="emai" placeholder="Email" className="auth-input" />
                        <input type="password" placeholder="Password" className="auth-input" />
                        {!isLogin ? <button className="auth-button" onClick={() => setOtp(true)}>Send OTP</button> : <button className="auth-button">Login</button>}
                        <div className="auth-toggle">
                            <button onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? "Create an account?" : "Already have an account?"}
                            </button>
                        </div>
                    </div>
                </div>
                {otp ? <div className="otp">
                    <div className="otp-box">
                        <input placeholder="Enter 4 digit otp sent to your email" type="text" />
                        <button>Sign UP</button>
                    </div>
                </div> : <></>}
            </div>
        </div>
    );
};

export default LoginSignUp;
