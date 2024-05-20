import axios from "axios";
import path from "path";
import fs from "fs/promises"; // Using fs.promises for asynchronous file operations
import { config } from "dotenv";
config();

// Function to check if a file is binary based on its extension
function isBinaryFile(filename) {
  const binaryExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".pdf",
    ".exe",
    ".bin",
    ".dll",
    ".zip",
    ".tar",
    ".gz",
    ".rar",
    ".7z",
    ".mp3",
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
  ];
  const ext = path.extname(filename).toLowerCase();
  return binaryExtensions.includes(ext);
}

// Function to fetch data from GitHub repository recursively
async function fetchDataFromGitHub(
  owner,
  repo,
  currentPath,
  token,
  outputFilePath
) {
  try {
    // Initialize output content
    let outputContent = "";

    // Recursive function to traverse directory
    async function traverseDirectory(currentPath, token, indent = "") {
      const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${currentPath}`;

      const response = await axios.get(githubUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      for (const item of response.data) {
        if (item.type === "dir") {
          // Add folder to output content
          outputContent += `${indent}Folder: ${path.relative(
            currentPath,
            item.path
          )}\n`;
          // Recursively traverse subdirectory
          await traverseDirectory(item.path, token, `${indent}  `);
        } else {
          if (isBinaryFile(item.name) || item.name=="package-lock.json") {
            console.log(`Skipping binary file: ${item.name}`);
            continue;
          }
          // Fetch content of file
          const fileContentResponse = await axios.get(item.download_url, {
            responseType: "text", // Ensure response is treated as text
          });
          // Add file content to output content
          outputContent += `${indent}File: ${path.relative(
            currentPath,
            item.path
          )}\n`;
          outputContent += `${fileContentResponse.data}\n\n`;
        }
      }
    }

    // Start traversing the repository directory
    await traverseDirectory(currentPath, token);

    // Write output content to file
    await fs.writeFile(outputFilePath, outputContent);
    console.log(`Output file created: ${outputFilePath}`);
  } catch (error) {
    console.log(error);
    console.error("Error fetching data:", error.message);
  }
}

process.stdin.setEncoding("utf8");

console.log("Enter the GitHub repository URL: ");

process.stdin.on("data", function (data) {
  console.log("You entered: " + data.trim());

  const githubUrl = data.trim();

  // Split the URL by '/'
  const urlParts = githubUrl.split("/");

  // Find the index of 'masai-course'
  const masaiCourseIndex = urlParts.indexOf("masai-course");

  // Extract repository name
  let repository = urlParts[masaiCourseIndex + 1];

  // Find the index of 'tree'
  const treeIndex = urlParts.indexOf("tree");

  // Extract subdirectory
  let subdirectory = urlParts.slice(treeIndex + 2).join("/");

  // Optional: Exit the process after receiving input
  const outputFile = "compiled_data.txt"; // Output file to save the aggregated content

  // Call the function to fetch data from GitHub repository
  const owner = "masai-course"; // Owner of the repository
  const token = process.env.TOKEN; // Replace with your GitHub personal access token
  fetchDataFromGitHub(owner, repository, subdirectory, token, outputFile).then(
    () => {
      console.log("Data is added successfully to output folder");
      process.stdin.pause(); // End the process.stdin stream
    }
  );
});
