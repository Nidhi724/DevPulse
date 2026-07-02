import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("Verifying your email...");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/auth/verify/${token}`
                );

                setSuccess(true);
                setMessage(res.data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 3000);

            } catch (error) {
                setSuccess(false);
                setMessage(
                    error.response?.data?.message || "Verification failed."
                );
            }
        };

        verifyUser();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="bg-slate-900 p-8 rounded-xl shadow-lg text-center w-[400px]">

                <h1 className="text-3xl font-bold text-white mb-4">
                    Email Verification
                </h1>

                <p
                    className={`text-lg ${success ? "text-green-400" : "text-red-400"
                        }`}
                >
                    {message}
                </p>

                {success && (
                    <p className="text-slate-400 mt-4">
                        Redirecting to Login...
                    </p>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;