import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getChatGPTStream = async (content:string, onDataReceived:(data: string) => void) => {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'system', content: content }],
    stream: true,
  });

  for await (const chunk of stream) {
    onDataReceived(chunk.choices[0]?.delta?.content || '');
  }
};
