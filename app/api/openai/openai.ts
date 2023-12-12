import { Readable } from 'stream';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const fetchData = async (content:string) => {
  const responseStream = new Readable({
    encoding: 'utf-8',
    read() {},
  });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content }],
      stream: true,
    });

    for await (const chunk of response) {
      responseStream.push(chunk.choices[0].delta.content);
      console.log(`api: ${chunk.choices[0].delta.content}`)
    }

    responseStream.push(null);
  } catch (error) {
    console.error('Error:', error);
    responseStream.push(null);
  }

  return responseStream;
};