import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
    {
        chat: {
            type: String,
            required: true,
        },
        from: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
export default Chat;
