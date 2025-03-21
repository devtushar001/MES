import React, { useContext, useState, useRef } from "react";
import "./LoginSignUp.css";
import { MesContext } from "../../Context/MesContextProvider";

const LoginSignUp = () => {
    const [otp, setOtp] = useState(false);
    const [otpValues, setOtpValues] = useState(Array(4).fill(""));
    const { setLoginSignup, backend_url } = useContext(MesContext);
    const [data, setData] = useState({ email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const otpInputs = useRef([]);

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return; // Allow only single-digit numbers
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        // Move to the next input automatically
        if (value && index < otpValues.length - 1) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index, e) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const CreateUser = async () => {
        if (!data.email.trim()) {
            setError("Please enter a valid email.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`${backend_url}/api/user/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email })
            });

            const result = await res.json();
            if (res.ok) {
                setOtp(true);
                localStorage.setItem("token", result.token);
                setSuccess("OTP sent successfully. Check your email.");
            } else {
                setError(result.message || "Something went wrong. Try again.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const VerifyUserOTP = async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setError("Authorization failed. Try again.");
            return;
        }

        const otpCode = otpValues.join(""); // Convert array to a single OTP string
        if (otpCode.length !== 4) {
            setError("Please enter the complete 4-digit OTP.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`${backend_url}/api/user/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
                },
                body: JSON.stringify({ otp: otpCode }),
            });

            const result = await res.json();
            if (res.ok) {
                setSuccess("OTP verified successfully!");
                setTimeout(() => {
                    setLoginSignup(false); // Close login/signup modal
                }, 1500);
            } else {
                setError(result.message || "Invalid OTP. Try again.");
            }
        } catch (error) {
            console.log(error.name+":"+error.message)
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-signup">
            <div className="box-container">
                <h2>{otp ? "Verify Account" : "Login / Sign Up"}</h2>

                {!otp ? (
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            disabled={loading}
                        />
                        <button onClick={CreateUser} disabled={loading}>
                            {loading ? "Processing..." : "Send OTP"}
                        </button>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                    </div>
                ) : (
                    <div className="otp-container">
                        <p>Enter the 4-digit OTP sent to your email</p>
                        <div className="otp-inputs">
                            {otpValues.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={value}
                                    maxLength={1}
                                    ref={(el) => (otpInputs.current[index] = el)}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleBackspace(index, e)}
                                />
                            ))}
                        </div>
                        <button onClick={VerifyUserOTP} disabled={loading}>
                            {loading ? "Verifying..." : "Verify"}
                        </button>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;
