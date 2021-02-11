import axios from "axios";
import { redisClient } from "../app";

export const getUserInfo = async (_req, res) => {
	try {
		const URL = "https://user-info-service.herokuapp.com/user/username/adminmert";
		const resp = await axios.get(URL);
		redisClient.setex("user_data", 20, JSON.stringify(resp.data));
		return res.status(200).json(resp.data);
	} catch (e) {
		console.error(e);
		return res.status(500).json(e);
	}
}