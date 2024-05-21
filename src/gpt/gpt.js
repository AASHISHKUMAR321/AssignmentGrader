import openai from "openai";
import { config } from "dotenv";
config();
import fs from "fs/promises";
import gradingPrompt from "./prompts/gradingPrompt.js";

// Initialize OpenAI API client with your API key
const client = new openai.OpenAI({ apiKey: process.env.API_KEY });

// Function to grade the compiled data using ChatGPT-4
async function gradeCompiledData(compiledData) {
  try {
    // Call the OpenAI API to complete the prompt
    const completion = await client.chat.completions.create({
      model: "gpt-4o", // Choose the appropriate engine
      messages: [
        { role: "system", content: gradingPrompt },
        { role: "user", content: compiledData },
      ],
      temperature: 0,
      // Stop the completion at double newline

      response_format: { type: "json_object" },
    });
    // console.log(completion.choices[0].message.content)
    // Process the response
    const gradedAssignment = completion.choices[0].message.content;
    console.log("Graded Assignment:", JSON.parse(gradedAssignment));
    // You can further process the graded assignment here
  } catch (error) {
    console.error("Error grading assignment:", error);
  }
}

async function readFromFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

const filePath = "compiled_data.txt"; // Path to your compiled data file
readFromFile(filePath).then((compiledData) => {
  if (compiledData) {
    gradeCompiledData(compiledData);
  } else {
    console.log("Failed to read compiled data from file.");
  }
});
