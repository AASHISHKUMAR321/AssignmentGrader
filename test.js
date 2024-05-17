// // const fs = require("fs");

// const axios = require("axios");
// const path = require("path");
// const fs = require("fs").promises; // Using fs.promises for asynchronous file operations

// // Function to check if a file is binary based on its extension
// function isBinaryFile(filename) {
//   const binaryExtensions = [
//     ".jpg",
//     ".jpeg",
//     ".png",
//     ".gif",
//     ".pdf",
//     ".exe",
//     ".bin",
//     ".dll",
//     ".zip",
//     ".tar",
//     ".gz",
//     ".rar",
//     ".7z",
//     ".mp3",
//     ".mp4",
//     ".mov",
//     ".avi",
//     ".mkv",
//   ];
//   const ext = path.extname(filename).toLowerCase();
//   return binaryExtensions.includes(ext);
// }

// // Function to fetch data from GitHub repository recursively
// async function fetchDataFromGitHub(owner, repo, currentPath, token, outputDir) {
//   try {
//     // Construct URL for GitHub API endpoint
//     const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${currentPath}`;

//     // Send GET request to GitHub API with authentication
//     const response = await axios.get(githubUrl, {
//       headers: {
//         Authorization: `token ${token}`,
//       },
//     });

//     // Check if request was successful
//     if (response.status === 200) {
//       // Iterate through the contents
//       for (const item of response.data) {
//         // Skip the 'cypress' folder
//         if (item.type === "dir" && item.name === "cypress") {
//           console.log(`Skipping folder: ${item.name}`);
//           continue;
//         }

//         if (item.type === "file") {
//           // Skip binary files
//           if (isBinaryFile(item.name)) {
//             console.log(`Skipping binary file: ${item.name}`);
//             continue;
//           }

//           // Fetch content of file
//           const fileContentResponse = await axios.get(item.download_url, {
//             responseType: "text", // Ensure response is treated as text
//           });

//           // Determine file path
//           const filePath = path.join(outputDir, currentPath, item.name);

//           // Ensure directory structure exists
//           await fs.mkdir(path.dirname(filePath), { recursive: true });

//           // Write file content to file
//           await fs.writeFile(filePath, fileContentResponse.data);

//           console.log(`File ${item.name} written to ${filePath}`);
//         } else if (item.type === "dir") {
//           // Recursively fetch contents of subdirectory
//           await fetchDataFromGitHub(
//             owner,
//             repo,
//             `${currentPath}/${item.name}`,
//             token,
//             outputDir
//           );
//         }
//       }

//       return true;
//     } else {
//       console.error("Failed to fetch data:", response.statusText);
//       return false;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//     return false;
//   }
// }



// let repository;
// let subdirectory;
// process.stdin.setEncoding("utf8");

// console.log("give me the repo link: ");

// process.stdin.on("data", function (data) {
//   console.log("You entered: " + data.trim());

//   const githubUrl = data.trim();

//   // Split the URL by '/'
//   const urlParts = githubUrl.split("/");

//   // Find the index of 'masai-course'
//   const masaiCourseIndex = urlParts.indexOf("masai-course");

//   // Extract repository name
//   repository = urlParts[masaiCourseIndex + 1];

//   // Find the index of 'tree'
//   const treeIndex = urlParts.indexOf("tree");

//   // Extract subdirectory
//   subdirectory = urlParts.slice(treeIndex + 2).join("/");

//   // Optional: Exit the process after receiving input
//   const outputFile = "output"; // Output file to save the aggregated content

//   // Call the function to fetch data from GitHub repository
//   const owner = "masai-course"; // Owner of the repository
//   // const repo = "sagar_fw11_034"; // Name of the repository
//   // const path = "Assignment_01_WEB-Grid-Responsive-Layout"; // Path to the directory in the repository
//   const token = "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";
//   // Replace with your GitHub personal access token
//   fetchDataFromGitHub(owner, repository, subdirectory, token, outputFile).then(
//     (d) =>{
//       console.log('data is added successfully to output folder')
    
//     }
   
//   );
// });






const axios = require("axios");
const path = require("path");
const fs = require("fs").promises; // Using fs.promises for asynchronous file operations

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
async function fetchDataFromGitHub(owner, repo, currentPath, token, outputFilePath) {
  try {
    // Initialize output content
    let outputContent = '';

    // Recursive function to traverse directory
    async function traverseDirectory(currentPath, token, indent = '') {
      const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${currentPath}`;

      const response = await axios.get(githubUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      for (const item of response.data) {
        if (item.type === 'dir') {
          // Add folder to output content
          outputContent += `${indent}Folder: ${path.relative(currentPath, item.path)}\n`;
          // Recursively traverse subdirectory
          await traverseDirectory(item.path, token, `${indent}  `);
        } else {
          if (isBinaryFile(item.name)) {
            console.log(`Skipping binary file: ${item.name}`);
            continue;
          }
          // Fetch content of file
          const fileContentResponse = await axios.get(item.download_url, {
            responseType: "text", // Ensure response is treated as text
          });
          // Add file content to output content
          outputContent += `${indent}File: ${path.relative(currentPath, item.path)}\n`;
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
    console.error("Error fetching data:", error.message);
  }
}

let repository;
let subdirectory;
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
  repository = urlParts[masaiCourseIndex + 1];

  // Find the index of 'tree'
  const treeIndex = urlParts.indexOf("tree");

  // Extract subdirectory
  subdirectory = urlParts.slice(treeIndex + 2).join("/");

  // Optional: Exit the process after receiving input
  const outputFile = "compiled_data.txt"; // Output file to save the aggregated content

  // Call the function to fetch data from GitHub repository
  const owner = "masai-course"; // Owner of the repository
  const token = "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"; // Replace with your GitHub personal access token
  fetchDataFromGitHub(owner, repository, subdirectory, token, outputFile);
});
