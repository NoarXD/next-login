"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { data: session } = useSession()
    const router = useRouter()

    if (session) router.replace('/welcome')


    const handdleSubmit = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setError("Password do not match!");
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            setError("Please complete all inputs!");
            return;
        }

        try {
            const resCheckUser = await fetch(
                "http://localhost:3000/api/checkUser",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const { user } = await resCheckUser.json();
            if (user) {
                setError("User already exist!");
                return;
            }

            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (res.ok) {
                const form = e.target;
                setError("");
                setSuccess("User registration successfully!");
                form.reset();
            } else {
                console.log("User registration failed");
            }
        } catch (error) {
            console.log("Error during registratio: ", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-5">
                <div className="mx-auto w-80">
                    <h3>Register Page</h3>
                    <hr className="my-3" />
                    <form onSubmit={handdleSubmit}>
                        {error && (
                            <div className="bg-rose-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                                {success}
                            </div>
                        )}

                        <input
                            className="block bg-gray-300 p-2 my-2 rounded-md"
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <input
                            className="block bg-gray-300 p-2 my-2 rounded-md"
                            type="password"
                            placeholder="Confirm your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-green-400 p-2 rounded-md text-white"
                        >
                            Sign Up
                        </button>
                        <hr className="my-3" />
                        <p className="">
                            Aleady have an accout? go to{" "}
                            <Link
                                className="text-blue-500 hover:underline"
                                href="/login"
                            >
                                Login Page
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
