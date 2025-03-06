import express, { Request, Response } from 'express';
import { sendMail } from '../mailer/emailService';
import { uploadSingle } from '../middlewares/upload';

const router = express.Router();
class MailController {
  async sendMail(req: Request, res: Response): Promise<void> {
    try {
      const { to, subject, template } = req.body;
      const attachmentPath = req.file;
      console.log(to, subject, template, attachmentPath);
      await sendMail({ to, subject, template, attachmentPath });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
const sendMailObj = new MailController();

router.post('/send', uploadSingle, sendMailObj.sendMail.bind(MailController));

export default router;
