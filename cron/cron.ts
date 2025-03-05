import cron from 'node-cron';
import { User } from '../models/user.model';
import { sendMail } from '../mailer/emailService';

export const sendingEmail = async () => {
  try {
    const users = await User.find({}).select('email');
    console.log(users, 'users');

    for (const user of users) {
      await sendMail({
        to: user.email,
        subject: 'Scheduled Email',
        template: 'schedule',
      });
    }
    console.log('Emails sent successfully!');
  } catch (error) {
    console.log('Error sending emails:', error);
  }
};
cron.schedule('* * * * *', () => {
  sendingEmail();
});
