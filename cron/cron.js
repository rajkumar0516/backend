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
exports.sendingEmail = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const user_model_1 = require("../models/user.model");
const emailService_1 = require("../mailer/emailService");
const sendingEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.User.find({}).select('email');
        console.log(users, 'users');
        for (const user of users) {
            yield (0, emailService_1.sendMail)({
                to: user.email,
                subject: 'Scheduled Email',
                template: 'welcome',
            });
        }
        console.log('Emails sent successfully!');
    }
    catch (error) {
        console.log('Error sending emails:', error);
    }
});
exports.sendingEmail = sendingEmail;
node_cron_1.default.schedule('0 22 * * *', () => {
    (0, exports.sendingEmail)();
});
