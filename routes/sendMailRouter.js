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
const express_1 = __importDefault(require("express"));
const emailService_1 = require("../mailer/emailService");
const upload_1 = require("../middlewares/upload");
const router = express_1.default.Router();
class MailController {
    sendMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { to, subject, template } = req.body;
                const attachmentPath = req.file;
                console.log(to, subject, template, attachmentPath);
                yield (0, emailService_1.sendMail)({ to, subject, template, attachmentPath });
                res.status(200).json({ message: 'Email sent successfully' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
const sendMailObj = new MailController();
router.post('/send', upload_1.uploadSingle, sendMailObj.sendMail.bind(MailController));
exports.default = router;
