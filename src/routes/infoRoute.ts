import express from "express";

import { getUserInfo } from '../controllers/infoController';
import { checkUserCache } from "../middlewares/CacheCheck";

const router = express.Router();

router.get('/', checkUserCache, getUserInfo);

export {
	router as infoRouter,
};