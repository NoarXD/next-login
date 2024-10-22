import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Chat from "../../../../models/chat";

export async function GET(req, res) {
    try {
        await connectMongoDB()
        const result = await Chat.find({})
        return NextResponse.json({ message: "Getting chat successfully", "result": result})
    } catch (error) {
        return NextResponse.json({ message: "Error getting chat", error }, { status: 500 });
    }
}