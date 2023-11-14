/* export const fetchData = async (content: string) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  if (!apiKey) {
    console.error("OpenAI API key is missing.");
    return;
  }

  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: content,
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let resultText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value);
      const lines = decodedChunk.split("\n");
      const parsedLines = lines.map(line => line.replace(/^data: /, "").trim()).filter(line => line !== "" && line !== "[DONE]").map(line => JSON.parse(line));

      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        if (content) {
          resultText += content;
          console.log(content);
        }
      }
    }
    return resultText;

  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}; */

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


