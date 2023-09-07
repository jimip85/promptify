 export const fetchData = async (content:string) => {
    const apiKey = process.env.OPENAI_API_KEY;
    console.log(apiKey);
  
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
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`);
      }
      
  
      const data = await response.json();
      console.log(data.choices[0].message.content);
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  