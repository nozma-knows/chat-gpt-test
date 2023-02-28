import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type ResponseError = {
  message: string;
};

type ResponseData = {
  result: string | null;
  error: ResponseError | null;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

// Configuration for OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initalize configuration
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // If API key is missing, return error
  if (!configuration.apiKey) {
    res.status(500).json({
      result: null,
      error: {
        message: "OpenAI API key not configured.",
      },
    });
  }

  // Grab prompt from request body
  const prompt = req.body.prompt;

  // If prompt is missing or empty string, return error
  if (!prompt || prompt === "") {
    res.status(400).json({
      result: null,
      error: {
        message: "No prompt given",
      },
    });
  }

  // Call openai API with prompt
  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2048,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    const response = result.data.choices[0].text;
    res.status(200).json({
      result: response || null,
      error: null,
    });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        result: null,
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
