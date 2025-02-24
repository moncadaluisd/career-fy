import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

/**
 * OpenAI configuration
 * @returns {OpenAI}
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
