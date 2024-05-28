import fs from 'fs/promises';
import path from 'path';
import pkg from 'json2csv';
const { parse, parseAsync, stringify } = pkg;

async function processCSV(filePath) {
  try {
    // Read the CSV file
    const csvContent = await fs.readFile(filePath, 'utf-8');

    // Parse the CSV content
    const rows = await parseAsync(JSON.parse(csvContent), { header: true });

    // Process each row to modify the "file" field
    rows.forEach(row => {
      // Extract the student code from the file name
      const fileName = row.file;
      const studentCode = path.basename(fileName, '.txt').split('_').slice(-2).join('_');
      row['student code'] = studentCode;
      delete row.file;
    });

    // Define new CSV fields
    const fields = ['student code', 'results', 'total_score', 'feedback', 'is_generated_by_ai', 'flag', 'genrative_ai_used', 'grade', 'isGeneratedByAI', 'improvement_suggestions', 'flag_gen_ai', 'generative_ai_used'];

    // Convert JSON back to CSV
    const updatedCSV = stringify(rows, { fields });

    // Write the updated CSV content to a new file
    await fs.writeFile('updated_grading_results.csv', updatedCSV);

    console.log('Updated CSV saved to updated_grading_results.csv');
  } catch (error) {
    console.error('Error processing CSV:', error);
  }
}

// Path to the original CSV file
const csvFilePath = 'grading_results.csv';
processCSV(csvFilePath);