import React, { useState } from "react";
import './LoginSignUp.css';

const LoginSignUp = () => {
    const [otp, setOtp] = useState(false);

    return (
        <>
            <div className="login-signup">
                <div className="box-container">
                    {!otp ? <h2>Login</h2> : <h2>Verify account</h2>}
                    {!otp ?
                        <div className="input-container">
                            <input type="text" placeholder="Enter your email / phone" /><button onClick={(e) => setOtp(true)}>Submit</button>
                        </div>
                        :
                        <div className="otp-container">
                            <input type="number" />
                            <input type="number" />
                            <input type="number" />
                            <input type="number" />
                            <input type="number" />
                            <input type="number" />
                            <button onClick={(e) => setOtp(false)}>Verify</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default LoginSignUp;