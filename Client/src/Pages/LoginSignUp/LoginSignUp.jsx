import React, { useContext, useState } from "react";
import "./LoginSignUp.css";
import { MesContext } from "../../Context/MesContextProvider";

const LoginSignUp = () => {
    const [otp, setOtp] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [otpValues, setOtpValues] = useState(Array(4).fill(""));
    const { loginSignUp, setLoginSignup } = useContext(MesContext);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
    };

    

    return (
        <div className="login-signup">
            <div className="box-container">
                <h2>{otp ? "Verify Account" : "Login"}</h2>
                {!otp ? (
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Enter your email / phone"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button onClick={() => setOtp(true)}>Submit</button>
                    </div>
                ) : (
                    <div className="otp-container">
                        {otpValues.map((value, index) => (
                            <input
                                style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}
                                key={index}
                                type="text"
                                value={value}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                            />
                        ))}
                        <button onClick={() => { setOtp(false); setLoginSignup(false) }}>Verify</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;