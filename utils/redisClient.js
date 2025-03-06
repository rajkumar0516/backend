"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = connectRedis;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: 'redis-11983.c10.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11983,
    },
    password: 'hoT83sJQCVlrZzvGzOJJNukbKMWvTSpp',
});
redisClient.on('error', (err) => console.error('Redis Error:', err));
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!redisClient.isOpen) {
            yield redisClient.connect();
            console.log('Connected to Redis');
        }
    });
}
exports.default = redisClient;
