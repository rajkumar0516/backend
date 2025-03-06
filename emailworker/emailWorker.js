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
exports.emailWorker = void 0;
const bullmq_1 = require("bullmq");
const emailService_1 = require("../mailer/emailService");
exports.emailWorker = new bullmq_1.Worker('emailQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = job.data;
    try {
        const res = yield (0, emailService_1.sendMail)({
            to: email,
            subject: 'Scheduled Email',
            template: 'orderplaced',
        });
        console.log(res, 'res');
        console.log(`Email sent to ${email}`);
    }
    catch (error) {
        console.log(error, 'email error');
    }
}), {
    connection: {
        host: 'redis-11983.c10.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11983,
        password: 'hoT83sJQCVlrZzvGzOJJNukbKMWvTSpp',
    },
});
