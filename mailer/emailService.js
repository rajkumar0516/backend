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
exports.sendMail = void 0;
const mailer_1 = __importDefault(require("./mailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, template, attachmentPath, }) {
    try {
        const emailTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname, '../templates', `${template}.html`), 'utf-8');
        console.log(to, subject, template, 'received');
        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to,
            subject,
            html: emailTemplate,
            attachments: attachmentPath
                ? [
                    {
                        filename: attachmentPath.originalname,
                        path: attachmentPath.path,
                    },
                ]
                : [],
        };
        yield mailer_1.default.sendMail(mailOptions);
        console.log('Email sent successfully!');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.sendMail = sendMail;
