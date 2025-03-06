import transporter from './mailer';
import fs from 'fs';
import path from 'path';

interface SendMailOptions {
  to: string;
  subject: string;
  template: string;
  attachmentPath?: Express.Multer.File;
}

export const sendMail = async ({
  to,
  subject,
  template,
  attachmentPath,
}: SendMailOptions): Promise<void> => {
  try {
    const emailTemplate = fs.readFileSync(
      path.join(__dirname, '../templates', `${template}.html`),
      'utf-8'
    );
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
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
