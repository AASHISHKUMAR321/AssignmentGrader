const problemStatement = `Design a system that efficiently manages the processing of files within a specified folder structure, ensuring robust logging and real-time updates on a UI dashboard.`;
const learningObjectives = `
1. Folder Management (Total: 0.5 Marks)
   - Have created and managed the Processing, In-progress, Completed, and Crashed folders. (0.5 Marks)
2. File Processing Logic (Total: 2 Marks)
   - Implementing file processing logic without using setInterval. (0.5 Marks)
   - Files move from folder to folder based on specified conditions. (0.5 Marks)
   - Proper handling of files that fail processing within the specified timeframe and moving them to the Crashed folder. (0.5 Marks)
   - Properly handling errors that occur during file processing. (0.5 Marks)
3. Random Timers (Total: 1 Mark)
   - Implementing random timers for files in the In-progress folder without using Math.random(). (1 Mark)
4. Logging and Notifications (Total: 0.75 Marks)
   - Logging different events such as warnings for processing delays and errors for processing failures. (0.5 Marks)
   - Implementing toast notifications for error logs to alert users of critical issues. (0.25 Marks)
5. Real-time Information and Visualization (Total: 2.25 Marks)
   - Displaying real-time information about files in each folder. (0.25 Marks)
   - Visualizing movements between folders to reflect file status changes. (0.25 Marks)
   - Displaying the latest logging activities to provide system insights. (0.25 Marks)
   - Implementing a real-time graph on the UI dashboard: (1.5 Marks)
     - Dynamically updating the graph to visualize the processing time of each file. (0.5 Marks)
     - Transmitting file details, including processing time, to the frontend via socket communication. (0.5 Marks)
     - Ensuring the graph reflects changes in processing time as they occur. (0.5 Marks)
6. Socket Communication (Total: 1 Mark)
   - Implementing socket communication for transmitting real-time data to the UI dashboard (server side). (0.5 Marks)
   - Ensuring data is updated on the UI in real-time (client side). (0.5 Marks)
7. Efficient Processing Management (Total: 1.5 Marks)
   - Utilizing an efficient approach such as an event-driven architecture, cron jobs, or recursive setTimeout for managing file processing and timers. (1.5 Marks)
8. Code Quality (Total: 1.5 Marks)
   - Code Quality (1 Mark)
   - No reliance on setInterval (0.25 Marks)
   - No reliance on Math.random() (0.25 Marks)
`;

const gradingPrompt = `
{
  "role": "Your role is to grade the assignment and evaluations of students based on the problem statement and Learning Objectives (LO).",
  "problem_statement": "${problemStatement}",
  "learning_objectives": "${learningObjectives}",
  "format": "You have to give the result in the form of JSON."
}
`;

export default gradingPrompt;
