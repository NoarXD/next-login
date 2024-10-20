import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Chat from "../../../../models/chat";

export async function POST(req) {
    try {
        const { chat, from } = await req.json()
        await connectMongoDB()
        await Chat.create({ chat, from })
        return NextResponse.json({ message: "Send chat", chat, from})
    } catch (error) {
        return NextResponse.json({ message: "Error sending chat", error }, { status: 500 });
    }
}