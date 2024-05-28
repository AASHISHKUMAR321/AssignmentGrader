// import openai from "openai";
// import { config } from "dotenv";
// config();
// import fs from "fs/promises";
// import gradingPrompt from "./prompts/gradingPrompt.js";
// import learningObjectives from "./prompts/Lo's.js";

// // Initialize OpenAI API client with your API key
// const client = new openai.OpenAI({ apiKey: process.env.API_KEY });

// // Function to grade the compiled data using ChatGPT-4
// async function gradeCompiledData(compiledData) {
//   try {
//     // Call the OpenAI API to complete the prompt
//     const completion = await client.chat.completions.create({
//       model: "gpt-4-turbo", // Choose the appropriate engine
//       messages: [
//         { role: "system", content: gradingPrompt },
//         {
//           role: "user",
//           content: `
//         Grade the following assignment based on these LO's: ${learningObjectives}
//         I am providing the student submission of files & folders  into single txt. so you have to find the solution for the particular LO from this submission  :${compiledData}
      
//         `,
//         },
//       ],
//       temperature: 0,
//       top_p: 1,
//       // Stop the completion at double newline

//       response_format: { type: "json_object" },
//     });
//     // console.log(completion.choices[0].message.content)
//     // Process the response
//     const gradedAssignment = completion.choices[0].message.content;
//     console.log("Graded Assignment:", JSON.parse(gradedAssignment));
//     // You can further process the graded assignment here
//   } catch (error) {
//     console.error("Error grading assignment:", error);
//   }
// }

// async function readFromFile(filePath) {
//   try {
//     const content = await fs.readFile(filePath, "utf-8");
//     return content;
//   } catch (error) {
//     console.error("Error reading file:", error);
//     throw error;
//   }
// }

// const filePath = "compiled_data.txt"; // Path to your compiled data file
// readFromFile(filePath).then((compiledData) => {
//   if (compiledData) {
//     gradeCompiledData(compiledData);
//   } else {
//     console.log("Failed to read compiled data from file.");
//   }
// });

import openai from "openai";
import { config } from "dotenv";
config();
import fs from "fs/promises";
import path from "path";
import gradingPrompt from "./prompts/gradingPrompt.js";
import learningObjectives from "./prompts/Lo's.js";
import { parse } from 'json2csv';

// Initialize OpenAI API client with your API key
const client = new openai.OpenAI({ apiKey: process.env.API_KEY });

// Function to grade the compiled data using ChatGPT-4
async function gradeCompiledData(compiledData) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: gradingPrompt },
        {
          role: "user",
          content: `
        Grade the following assignment based on these LO's: ${learningObjectives}
        I am providing the student submission of files & folders into a single txt. So you have to find the solution for the particular LO from this submission: ${compiledData}
        `,
        },
      ],
      temperature: 0,
      top_p: 1,
      response_format: { type: "json_object" },
    });

    const gradedAssignment = completion.choices[0].message.content;
    
    return JSON.parse(gradedAssignment);
  } catch (error) {
    console.error("Error grading assignment:", error);
    throw error;
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

async function gradeSubmission(filePath) {
  const compiledData = await readFromFile(filePath);
  const gradedAssignment = await gradeCompiledData(compiledData);
  const studentCode = path.basename(filePath, '.txt').split('_').slice(-2).join('_');
  return { 'student code': studentCode, ...gradedAssignment };
}

async function gradeAllSubmissions(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);
    const filePaths = files.map(file => path.join(directoryPath, file));

    const gradingPromises = filePaths.map(filePath => gradeSubmission(filePath));
    const gradingResults = await Promise.all(gradingPromises);

    const csv = parse(gradingResults);
    await fs.writeFile("grading_results.csv", csv);
    console.log("Grading results saved to grading_results.csv");
  } catch (error) {
    console.error("Error processing submissions:", error);
  }
}

// Path to the directory containing submission files
const directoryPath = "submissions/b36_c2/nem";
gradeAllSubmissions(directoryPath);