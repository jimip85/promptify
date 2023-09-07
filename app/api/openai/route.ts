 export const fetchData = async (content:string) => {
    const apiKey = process.env.OPENAI_API_KEY;
  
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
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: content //this should be dynamic 
            },
          ],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  