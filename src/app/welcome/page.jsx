"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

function WellcomePage() {
    const { data: session } = useSession();
    const [chat, setChat] = useState("");
    const from = session?.user?.name;
    const [getChat, setGetChat] = useState([]);

    if (!session) {
        redirect("/login");
    }

    const fetchChats = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/getChat");
            const data = await res.json();
            console.log(data);
            if (data.result) {
                setGetChat(data.result);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/api/sendChat", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    chat,
                    from,
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                fetchChats();
            } else {
                console.log("Sending failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar session={session} />
            <div className="container mx-auto py-5">
                <div className="mx-auto w-80">
                    <h3 className="text-3xl mt-3">
                        Wellcome {session?.user?.name}
                    </h3>
                    <hr className="my-3" />
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="ຂຽນຫຍັງກາໄດ້"
                            className="block bg-gray-300 p-2 my-2 rounded-md"
                            onChange={(e) => setChat(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-green-400 p-2 rounded-md text-white"
                        >
                            ສົ່ງ
                        </button>
                    </form>
                    <div>
                        <h1>Chat List</h1>
                        <ul>
                            {getChat.slice().reverse().map((chat) => (
                                <li key={chat._id}>
                                    <strong>{chat.from}:</strong> {chat.chat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WellcomePage;
