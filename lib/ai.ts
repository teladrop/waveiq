import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateContent(keyword: string, tone: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate YouTube content for the keyword "${keyword}" with a ${tone} tone:
    1. Generate 5 catchy titles
    2. Write a compelling description
    3. Suggest 10 relevant SEO tags
    
    Format the response as JSON with the following structure:
    {
      "titles": string[],
      "description": string,
      "tags": string[]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    
    // Fallback to OpenAI if Gemini fails
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a YouTube content optimization expert.',
          },
          {
            role: 'user',
            content: `Generate YouTube content for the keyword "${keyword}" with a ${tone} tone:
            1. Generate 5 catchy titles
            2. Write a compelling description
            3. Suggest 10 relevant SEO tags
            
            Format the response as JSON with the following structure:
            {
              "titles": string[],
              "description": string,
              "tags": string[]
            }`,
          },
        ],
      });

      return JSON.parse(completion.choices[0].message.content || '{}');
    } catch (fallbackError) {
      console.error('Error generating content with OpenAI:', fallbackError);
      throw fallbackError;
    }
  }
}

export async function generateShortsContent(videoLink: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    // Note: In a real implementation, you would need to:
    // 1. Download the video
    // 2. Extract frames
    // 3. Send frames to Gemini Vision
    // This is a simplified version that assumes we have the video content

    const prompt = `Analyze this YouTube video and suggest:
    1. Best hook points (timestamps)
    2. Engaging subtitles
    3. Relevant hashtags
    
    Format the response as JSON with the following structure:
    {
      "hooks": string[],
      "subtitles": string,
      "hashtags": string[]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating shorts content:', error);
    throw error;
  }
} 