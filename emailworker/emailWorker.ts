import { Worker } from 'bullmq';
import { sendMail } from '../mailer/emailService';
export const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    const { email } = job.data;

    try {
      const res = await sendMail({
        to: email,
        subject: 'Scheduled Email',
        template: 'orderplaced',
      });
      console.log(res, 'res');
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.log(error, 'email error');
    }
  },
  {
    connection: {
      host: 'redis-11983.c10.us-east-1-2.ec2.redns.redis-cloud.com',
      port: 11983,
      password: 'hoT83sJQCVlrZzvGzOJJNukbKMWvTSpp',
    },
  }
);
