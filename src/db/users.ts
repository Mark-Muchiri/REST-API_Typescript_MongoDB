import mongoose from "mongoose";
import z from "zod";

const UserSchema = new mongoose.Schema({
    username: { type: z.string(), required: true },
    email: { type: z.string(), required: true },
    authentication: {
        password: { type: z.string(), required: true, select: false },
        salt: { type: z.string(), select: false },
        sessionToken: { type: z.string(), select: false }
    },
});

export const UserModel = mongoose.model('User', UserSchema);