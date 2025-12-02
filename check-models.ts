
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is not set');
  process.exit(1);
}

const client = new GoogleGenAI({ apiKey });

async function listModels() {
  try {
    const response = await client.models.list();
    console.log('Response keys:', Object.keys(response));
    console.log('Response:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
