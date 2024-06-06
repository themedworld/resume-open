"use client";
import { useState, useEffect } from "react";
import { authService } from "./authService";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from 'react-icons/fa';
import  './Signin.module.css'
import Image from "next/image";
import image from "./OpenResume.png";
const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userData = { username, password };
        try {
            const response = await authService.login(userData);
            if (response?.data?.accessToken) {
                authService.setToken(response.data.accessToken);
                const role = authService.getUserRole();
                if (role === "demandeur") {
                    router.push('/Demandeur');
                } else if (role === "recruteur") {
                    router.push('/Recruteur');
                }
            }
        } catch (error) {
            setError("Invalid username or password");
        }
    }

    useEffect(() => {
        const role = authService.getUserRole();
        if (role === "demandeur") {
            router.push('/Demandeur');
        } else if (role === "recruteur") {
            router.push('/Recruteur');
        }
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: 'rgba(240, 240, 255, 0.9)' }}>
            <div className="card shadow-lg p-4" style={{ width: '50%', maxWidth: '500px', height: 'auto', backgroundColor: 'rgba(200, 200, 255, 0.5)', color: '#fff', borderRadius: '1rem' }}>
                <div className="p-4">
                    <div className="text-center mb-4">
                        <Image src={image} style={{ maxWidth: '150px', width: '100%', height: 'auto' }} />
                    </div>
                    <form onSubmit={submitForm}>
                    <h2 className="text-center text-blue-500 mb-4" style={{ fontFamily: 'Arial, sans-serif', fontSize :43 }}>
  Sign in to Your Account
</h2>


                        <div className="mb-3 text-start">
                            <label htmlFor="username" className="form-label text-black">
                                <FaUser className="me-2" /> Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Email/Mobile Number"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-control custom-input"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label text-black">
                                <FaLock className="me-2" /> Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control custom-input"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">Sign In</button>
                        <div className="d-flex justify-content-between text-back">
                            <Link href="/Choice" className="text-decoration-none text-black">Don't have an account? Sign Up</Link>
                        </div>
                        {error && <div className="text-danger text-center mt-3">{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;




