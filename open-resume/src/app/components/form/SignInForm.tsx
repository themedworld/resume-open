"use client";
import { useState, useEffect } from "react";
import { authService } from "./authService";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className="flex  justify-center items-center min-h-screen bg-black">
        <div className="flex bg-white shadow-md rounded p-8 max-w-3xl w-full">
            <div className="w-1/2 p-4">
                <form onSubmit={submitForm} className='text-center'>
                    <div className='mb-4'>
                        <h2 className="text-center text-3xl font-semibold mb-4">Sign in to Your Account</h2>
                        <label htmlFor='username' className='block text-gray-700 font-medium mb-2'>
                            Email/Mobile Number
                        </label>
                        <input
                            id='username'
                            type='text'
                            placeholder='Email/Mobile Number'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='mb-6'>
                        <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button type='submit' className='bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md w-full mb-2'>
                        LOG IN
                    </button>
                    <p className='text-center text-sm text-gray-600'>
                        Don't have an account?&nbsp;
                        <Link href='/Choice'>
                            <button type='button' className='bg-white border border-black text-black font-semibold py-2 px-4 rounded-md w-full'>
                                SIGN UP
                            </button>
                        </Link>
                    </p>
                    {error && <div className='text-red-500 mt-4 text-center'>{error}</div>}
                </form>
            </div>
            <div className="flex items-center justify-center w-1/2 bg-gray-100 p-4">
                <img src="https://tse4.mm.bing.net/th?id=OIP.B67-wRFE8No08qKgpc-TYgHaH4&pid=Api&P=0&h=180" alt="Login Logo" className="w-full h-auto" />
            </div>
        </div>
    </div>
    );
};

export default SignInForm;


