const openai = require("openai");
require("dotenv").config();
const fs = require("fs").promises;
// Initialize OpenAI API client with your API key
const client = new openai.OpenAI({ apiKey: process.env.API_KEY });

// Define the grading prompt
const gradingPrompt = `
Given the compiled data from the GitHub repository, please provide a grading for the assignments based on the following criteria:
1. Evaluate the folder structure and organization.
2. Assess the code quality and readability.
3. Check for proper error handling.
4. Any additional comments or suggestions for improvement.
`;

// Function to grade the compiled data using ChatGPT-4
async function gradeCompiledData(compiledData) {
  try {
    // Call the OpenAI API to complete the prompt
    const completion = await client.chat.completions.create({
      model: "gpt-4-0125-preview", // Choose the appropriate engine
      messages: [
        { role: "system", content: gradingPrompt },
        { role: "user", content: compiledData },
      ],
     // Stop the completion at double newline
      response_format: { type: "text" },
    });
    // console.log(completion.choices[0].message.content)
    // Process the response
    const gradedAssignment = completion.choices[0].message.content
    console.log("Graded Assignment:", gradedAssignment);
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
