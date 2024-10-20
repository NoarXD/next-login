"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { data: session } = useSession()

    const router = useRouter()

    if (session) router.replace('/welcome')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await signIn("credentials", {
                email, password, redirect: false
            })
            if (res.error) {
                setError("Invalid credentials")
                return
            }

            router.replace("welcome")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-5">
                <div className="mx-auto w-80">
                    <h3>Login Page</h3>
                    <hr className="my-3" />
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-rose-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )}
                        <input
                            className="block bg-gray-300 p-2 my-2 rounded-md"
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="block bg-gray-300 p-2 my-2 rounded-md"
                            type="password"
                            placeholder="Enter your pasword"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-green-400 p-2 rounded-md text-white"
                        >
                            Sign In
                        </button>
                        <hr className="my-3" />
                        <p className="">
                            Do not have an accout? go to{" "}
                            <Link
                                className="text-blue-500 hover:underline"
                                href="/register"
                            >
                                Register Page
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
