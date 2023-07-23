import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../controller/UserController";

export const isAuthenticated = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const sessionToken = req.cookies["MARK-AUTH"];

		// if token expires
		if (!sessionToken) {
			return res.sendStatus(403).json({ message: "please login again" });
		}

		const existingUser = await getUserBySessionToken(sessionToken);

		if (!existingUser) {
			return res
				.sendStatus(403)
				.json({ message: "there's an existing user already" });
		}

		merge(req, { identity: existingUser });

		return next();
	} catch (error) {
		console.error(error);
		return res.sendStatus(403);
	}
};
