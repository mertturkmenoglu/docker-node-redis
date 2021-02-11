import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import redis from "redis";
import { infoRouter } from "./routes/infoRoute";

const PORT = process.env.PORT || 4000;
const redisPort = 6379;
const app = express();

const redisClient = redis.createClient({
	host: process.env.REDIS_HOST || "redis",
	port: 6379
});

app.use(express.json());
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'));
app.use(cors());
app.use(helmet());

app.use('/api/v1', infoRouter);

app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT}`);
});

redisClient.on("connect", () => {
	console.log(`Redis client started listening on port ${redisPort}`);
});

redisClient.on("error", (err) => {
	console.error("Redis error", err);
});

export {
	redisClient,
};
