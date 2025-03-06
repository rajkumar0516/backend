import { Queue } from 'bullmq';
import { connectRedis } from '../utils/redisClient';

async function startRedis() {
  try {
    await connectRedis();
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
}

startRedis();

const emailQueue = new Queue('emailQueue', {
  connection: {
    host: 'redis-11983.c10.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 11983,
    password: 'hoT83sJQCVlrZzvGzOJJNukbKMWvTSpp',
  },
});

export default emailQueue;
