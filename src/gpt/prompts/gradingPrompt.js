import learningObjectives from "./Lo's.js";
import problemStatement from "./problemStatement.js";
import role from "./role.js";
import solution from "./solution.js";

const gradingPrompt = `
{
  "role": "${role}"
  "problem_statement": "${problemStatement}",
  "learning_objectives": "${learningObjectives}",
  "solution":"${solution}"
  "format": "You have to give the result in the form of JSON and give me total score as well & min-1 and max-10 marks & must check if this code is written using the genrative ai make flag  true if you found."
}
`;

export default gradingPrompt;
