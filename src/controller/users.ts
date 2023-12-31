import express from "express";

import { getUsers } from "./UserController";

export const getAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
    try {
        const users = await getUsers()

        return res.status(200).json(users)
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
