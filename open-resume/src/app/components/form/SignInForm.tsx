"use client";
import { useState } from "react";
import { authService } from "./authService";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useEffect } from "react";
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
                const username = authService.getUserName();
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
<div className="flex justify-center items-center h-screen bg-gray-100">
    <form onSubmit={submitForm} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md'>
        <div className='mb-4'>
            <h2 className="text-center text-3xl font-semibold mb-4">Sign in to Your Account</h2>
            <label htmlFor='username' className='block text-gray-700 font-medium mb-2'>
                Username
            </label>
            <input
                id='username'
                type='text'
                placeholder='Enter your username'
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
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500'
            />
        </div>
        <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full'>
            Sign in
        </button>
        {error && <div className='text-red-500 mt-4 text-center'>{error}</div>}
        <p className='text-center text-sm text-gray-600 mt-2'>
            Don&apos;t have an account?&nbsp;
            <Link href='/Choice' className='text-blue-500 hover:underline'>
                Sign up here
            </Link>
        </p>
    </form>
</div>

    );
};

export default SignInForm;


