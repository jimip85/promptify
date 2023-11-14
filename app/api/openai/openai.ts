import OpenAI from "openai";

const openai = new OpenAI({apiKey:process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true,});

export const fetchData = async ({ content, setCompletion }: {
  content: string;
  setCompletion: (response: string) => void;
}) => {
  let finalResponse = "";

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: content },
    ],
    stream: true,
  });

  for await (const chunk of response) {
    finalResponse += chunk.choices[0].delta.content;
    console.log(finalResponse);
    setCompletion(finalResponse);
  }
}


