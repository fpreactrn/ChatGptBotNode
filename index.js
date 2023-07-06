const axios = require('axios');

async function chatGPT(message) {
  const prompt = `ChatGPT: ${message}`;
  const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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',
    // 'Authorization': 'Bearer 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',
    // 'Authorization': 'Bearer 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' // Replace with your OpenAI API key
  };

  try {
    const response = await axios.post(url, {
      'prompt': prompt,
      'max_tokens': 50, // Adjust to control response length
      'temperature': 0.6, // Adjust for diversity of responses (0.0 to 1.0)
      'n': 1 // Number of responses to generate
    }, { headers });

    const chatGPTResponse = response.data.choices[0].text.trim().replace(/ChatGPT:/g, '');
    return chatGPTResponse;
  } catch (error) {
    console.error('Error:', error);
    return 'An error occurred while communicating with ChatGPT.';
  }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('User: ', async (message) => {
  const response = await chatGPT(message);
  console.log(response);

  // Continue the conversation
  rl.question('User: ', async (message) => {
    const response = await chatGPT(message);
    console.log(response);

    // Close the readline interface when done
    rl.close();
  });
});