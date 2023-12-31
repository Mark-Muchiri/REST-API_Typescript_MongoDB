import express from "express";

import { createUser, getUserByEmail } from "../controller/UserController";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Check your inputs" });
        }

        const user = await getUserByEmail(email).select(
            "+authentication.salt +authentication.password"
        );

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const expectedHash = authentication(user.authentication?.salt || '', password);


        if (user?.authentication?.password !== expectedHash) {
            return res
                .status(403)
                .json({ message: "Ensure your password is correct" });
        }

        // if both are ✅, update user session token
        const salt = random();
        user.authentication.sessionToken = authentication(
            salt,
            user._id.toString()
        );

        await user.save();

        res.cookie("MARK-AUTH", user.authentication?.sessionToken, {
            domain: "localhost",
            path: "/",
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res
                .status(400)
                .json({ message: "Recheck the registration inputs" });
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
