import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  socket: {
    host: 'redis-11983.c10.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 11983,
  },
  password: 'hoT83sJQCVlrZzvGzOJJNukbKMWvTSpp',
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('Connected to Redis');
  }
}

export default redisClient;
