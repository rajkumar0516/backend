import express, { Request, Response } from 'express';
import { sendMail } from '../mailer/emailService';
import { uploadSingle } from '../middlewares/upload';

const router = express.Router();

router.post('/send', uploadSingle, async (req: Request, res: Response) => {
  try {
    const { to, subject, template } = req.body;
    const attachmentPath = req.file;
    console.log(to, subject, template, attachmentPath);
    await sendMail({ to, subject, template, attachmentPath });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
