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
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const redisClient_1 = require("../utils/redisClient");
function startRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, redisClient_1.connectRedis)();
        }
        catch (error) {
            console.error('Error connecting to Redis:', error);
        }
    });
}
startRedis();
const emailQueue = new bullmq_1.Queue('emailQueue', {
    connection: {
        host: 'redis-11983.c10.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11983,
        password: 'hoT83sJQCVlrZzvGzOJJNukbKMWvTSpp',
    },
});
exports.default = emailQueue;
