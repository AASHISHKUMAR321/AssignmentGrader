// const axios = require('axios');

// // Function to fetch data from GitHub repository
// async function fetchDataFromGitHub() {
//     try {
//         const owner = 'masai-course'; // Owner of the repository
//         const repo = 'Rini-Debnath_pw2_048'; // Name of the repository
//         const path = 'Assignment_01_WEB-Grid-Responsive-Layout'; // Path to the directory in the repository

//         // Construct URL for GitHub API endpoint
//         const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

//         // Set your GitHub personal access token here
//         const token = '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';

//         // Send GET request to GitHub API with authentication
//         const response = await axios.get(githubUrl, {
//             headers: {
//                 Authorization: `token ${token}`
//             }
//         });

//         // Check if request was successful
//         if (response.status === 200) {
//             // Log data from GitHub response
//             console.log(response.data);
//         } else {
//             console.error('Failed to fetch data:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//     }
// }

// // Call the function to fetch data
// fetchDataFromGitHub();

// const axios = require('axios');

// Function to fetch data from GitHub repository recursively
async function fetchDataFromGitHub(owner, repo, path, token) {
    try {
        // Construct URL for GitHub API endpoint
        const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

        // Send GET request to GitHub API with authentication
        const response = await axios.get(githubUrl, {
            headers: {
                Authorization: `token ${token}`
            }
        });

        // Check if request was successful
        if (response.status === 200) {
            // Iterate through the contents
            for (const item of response.data) {
                if (item.type === 'file' ) {
                    // Check if the file is binary
                    if (item.encoding !== 'base64') {
                        // Fetch content of file
                        const fileContentResponse = await axios.get(item.download_url, {
                            responseType: 'text' // Ensure response is treated as text
                        });
                        // Log or process file content
                        console.log(fileContentResponse.data);
                    } else {
                        console.log(`Skipping binary file: ${item.path}`);
                    }
                // } else if (item.type === 'dir' &&  item.name !== 'cypress') {
                //     // Recursively fetch contents of subdirectory
                //     await fetchDataFromGitHub(owner, repo, `${path}/${item.name}`, token);
                 }
            }
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// const axios = require("axios");

// const path = require("path");

// // Function to check if a file is binary based on its extension
// function isBinaryFile(filename) {
//   const binaryExtensions = [
//     ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".exe", ".bin", ".dll", ".zip",
//     ".tar", ".gz", ".rar", ".7z", ".mp3", ".mp4", ".mov", ".avi", ".mkv"
//   ];
//   const ext = path.extname(filename).toLowerCase();
//   return binaryExtensions.includes(ext);
// }

// // Function to fetch data from GitHub repository recursively
// async function fetchDataFromGitHub(owner, repo, currentPath, token, outputFile) {
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
//       // Initialize content string
//       let content = "";

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
//           // Append file content to content string
//           content += `File: ${item.name}\n${fileContentResponse.data}\n\n`;
//         } else if (item.type === "dir") {
//           // Append folder name to content string
//           content += `Folder: ${item.name}\n`;
//           // Recursively fetch contents of subdirectory and append to content string
//           content += await fetchDataFromGitHub(
//             owner,
//             repo,
//             `${currentPath}/${item.name}`,
//             token,
//             outputFile
//           );
//         }
//       }

//       // Write content to output file
//       if (outputFile) {
//         fs.appendFileSync(outputFile, content);
//       } else {
//         console.log(content);
//       }

//       return content;
//     } else {
//       console.error("Failed to fetch data:", response.statusText);
//       return "";
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//     return "";
//   }
// }

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

// // Function to check if a file is binary based on its extension

// // Call the function to fetch data from GitHub repository

// // Replace with your GitHub personal access token
// // const outputFile = "output"; // Output file to save the aggregated content

// // // Call the function to fetch data from GitHub repository
// // const owner = "masai-course"; // Owner of the repository
// // const repo = "sagar_fw11_034"; // Name of the repository
// // // const path = "Assignment_01_WEB-Grid-Responsive-Layout"; // Path to the directory in the repository
// // const token = "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";
// //  // Replace with your GitHub personal access token
// // // fetchDataFromGitHub(owner, repo, "Backend_Assignment/authentication", token, outputFile);

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
//   const token = "";
//   // Replace with your GitHub personal access token
//   fetchDataFromGitHub(owner, repository, subdirectory, token, outputFile).then(
//     (d) =>{
//       console.log('data is added successfully to output folder')
    
//     }
   
//   );
// });
