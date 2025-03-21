import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import "./LoginSignUp.css";
import { MesContext } from "../../Context/MesContextProvider";
import { toast } from "react-toastify";

const LoginSignUp = () => {
    const { setLoginSignup, backend_url, storedToken } = useContext(MesContext);
    const [otp, setOtp] = useState(false);
    const [otpValues, setOtpValues] = useState(Array(4).fill(""));
    const [data, setData] = useState({ email: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ error: null, success: null });
    const otpInputs = useRef([]);

    const handleOtpChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);
        if (value && index < otpValues.length - 1) otpInputs.current[index + 1]?.focus();
    };

    const handleBackspace = (index, e) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const CreateUser = async () => {
        if (!data.email.trim()) return setMessage({ error: "Please enter a valid email.", success: null });
        setLoading(true);
        setMessage({ error: null, success: null });

        try {
            const res = await fetch(`${backend_url}/api/user/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email })
            });

            const result = await res.json();
            if (res.ok) {
                setOtp(true);
                localStorage.setItem("token", JSON.stringify(result.token));
                setMessage({ success: "OTP sent successfully. Check your email.", error: null });
            } else {
                setMessage({ error: result.message || "Something went wrong. Try again.", success: null });
            }
        } catch (err) {
            setMessage({ error: "Network error. Please try again.", success: null });
        } finally {
            setLoading(false);
        }
    };

    const GetUserDetails = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No token found. Please log in.");

            const res = await fetch(`${backend_url}/api/user/get-user`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${JSON.parse(storedToken)}` }
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to fetch user details.");
            if (!result.success) toast.error(result.message);

            setLoginSignup(false);
            return result.data;
        } catch (error) {
            console.error("Error fetching user details:", error.message);
            return null;
        }
    }, [backend_url, setLoginSignup]);

    useEffect(() => {
        GetUserDetails();
    }, []);

   

    const VerifyUserOTP = async () => {
        const otpCode = otpValues.join(""); 
        if (otpCode.length !== 4) return setMessage({ error: "Please enter the complete 4-digit OTP.", success: null });

        setLoading(true);
        setMessage({ error: null, success: null });

        try {
            const res = await fetch(`${backend_url}/api/user/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                },
                body: JSON.stringify({ otp: otpCode }),
            });

            const result = await res.json();
            if (res.ok) {
                setMessage({ success: "OTP verified successfully!", error: null });
                GetUserDetails();
                setTimeout(() => setLoginSignup(false), 1500);
            } else {
                setMessage({ error: result.message || "Invalid OTP. Try again.", success: null });
            }
        } catch (error) {
            setMessage({ error: "Something went wrong. Please try again.", success: null });
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
                        {message.error && <p className="error">{message.error}</p>}
                        {message.success && <p className="success">{message.success}</p>}
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
                        {message.error && <p className="error">{message.error}</p>}
                        {message.success && <p className="success">{message.success}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignUp;
