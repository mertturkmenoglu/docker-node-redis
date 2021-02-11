import { NextFunction, Request, Response } from "express";
import { redisClient } from "../app";

export const checkUserCache = (_req: Request, res: Response, next: NextFunction) => {
	redisClient.get("user_data", (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).json(err);
		}

		if (data != null) {
			return res.status(200).json(JSON.parse(data));
		} else {
			next();
		}
	});
};