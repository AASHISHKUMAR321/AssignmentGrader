const problemStatement = `
these are the questions 

question 1 - 
Simple Array Sum
You are given an array of numbers. Your task is to write a function named calculateSum that calculates the sum of all the numbers in the array using the forEach method.

Write a function calculateSum that performs the following tasks:

Accepts an array of numbers as input.
Iterates over each element in the array using the forEach method.
Adds each element to a running total to calculate the sum.
Returns the total sum.
Example Invocation :

const numbers = [1, 2, 3, 4, 5];
console.log(calculateSum(numbers)); // Output: 15

question 2- 
Higher-Order Function Challenge: Grouping and Sorting Students
You have been provided with an array of student objects. Each student object contains the following properties: name, age, gender, and grade. Your task is to create a function groupAndSortStudents using only Higher-Order Functions that takes this array of students as input and returns an object where students are grouped by their grades. Additionally, within each grade, the students should be sorted in ascending order based on their ages.

Write a function groupAndSortStudents that performs the following tasks using only Higher-Order Functions:

Group the students by their grades.
Sort the students within each grade based on their ages in ascending order.
Return an object where keys are grade names and values are arrays containing students sorted by age.
Ensure that the function handles the case where there are no students in a particular grade.

const students = [
  { name: "Alice", age: 18, gender: "Female", grade: 10 },
  { name: "Bob", age: 17, gender: "Male", grade: 11 },
  { name: "Charlie", age: 16, gender: "Male", grade: 10 },
  { name: "David", age: 17, gender: "Male", grade: 9 },
  { name: "Emma", age: 18, gender: "Female", grade: 11 },
  { name: "Frank", age: 16, gender: "Male", grade: 9 },
  { name: "Grace", age: 17, gender: "Female", grade: 10 }
];
Example Invocation :

const groupedAndSortedStudents = groupAndSortStudents(students);
console.log(groupedAndSortedStudents);
Expected Output


{
  9: [
    { name: "Frank", age: 16, gender: "Male", grade: 9 },
    { name: "David", age: 17, gender: "Male", grade: 9 }
  ],
  10: [
    { name: "Charlie", age: 16, gender: "Male", grade: 10 },
    { name: "Grace", age: 17, gender: "Female", grade: 10 },
    { name: "Alice", age: 18, gender: "Female", grade: 10 }
  ],
  11: [
    { name: "Bob", age: 17, gender: "Male", grade: 11 },
    { name: "Emma", age: 18, gender: "Female", grade: 11 }
  ]
}
question 3- 
Product Inventory Analysis
You have been provided with data representing the inventory and sales of a store. The data structure is as follows:

const storeData = {
  storeName: "TechWorld",
  location: "Metropolis",
  products: {
    electronicsSection: {
      inventory: {
        laptop: { available: 20, price: 800 },
        smartphone: { available: 30, price: 500 },
        tablet: { available: 15, price: 300 },
      },
      sales: [
        { id: 1, items: ["laptop", "tablet"], total: 1100 },
        { id: 2, items: ["smartphone", "tablet"], total: 800 },
        { id: 3, items: ["laptop", "smartphone"], total: 1300 },
      ],
    },
    clothingSection: {
      inventory: {
        shirt: { available: 50, price: 25 },
        jeans: { available: 40, price: 40 },
        dress: { available: 30, price: 60 },
      },
      sales: [
        { id: 1, items: ["shirt", "jeans"], total: 60 },
        { id: 2, items: ["dress", "shirt"], total: 85 },
        { id: 3, items: ["jeans", "dress"], total: 100 },
      ],
    },
  },
  sectionNames: ["electronicsSection", "clothingSection"],
};
You are required to extract the available quantity and price for laptops and shirts using multilevel destructuring.

Create a function named findProductDetails which takes the storeData object as input and returns an object containing the following details:

{
  laptopAvailable: // Number of laptops available,
  shirtAvailable: // Number of shirts available,
  laptopPrice: // Price of a laptop,
  shirtPrice: // Price of a shirt,
}


question 4 - 
Filtering and Mapping
You have been provided with data representing a list of employees in a company. Each employee object contains the following properties: id, name, department, salary, and age. Your task is to create a function named filterAndMapEmployees that takes this array of employees as input and performs the following operations:

Filter the employees based on the following conditions:
Employees with a salary greater than or equal to $50000.
Employees who belong to the "Engineering" department.
Employees who are younger than 35 years old.
Map the filtered employees to a new array of objects containing only the id, name, and department properties.
Spread the mapped employee objects into a final array.
Write a function filterAndMapEmployees that performs the above tasks and returns the final array of mapped employee objects.

const employees = [
  { id: 1, name: 'Alice', department: 'Engineering', salary: 60000, age: 28 },
  { id: 2, name: 'Bob', department: 'HR', salary: 45000, age: 32 },
  { id: 3, name: 'Charlie', department: 'Engineering', salary: 55000, age: 40 },
  { id: 4, name: 'David', department: 'Marketing', salary: 48000, age: 33 },
  { id: 5, name: 'Emma', department: 'Engineering', salary: 70000, age: 29 },
];

console.log(filterAndMapEmployees(employees));
Expected Output :

[
  { id: 1, name: 'Alice', department: 'Engineering' },
  { id: 5, name: 'Emma', department: 'Engineering' }
]

question 5- 
Array Transformation: Custom Slice
In this problem, you're tasked with implementing a custom version of the splice method for arrays. Let's call it customSplice. This function will take an array and at least two parameters: start and deleteCount. It will remove elements from the array starting at the start index and delete the specified number of elements according to deleteCount. Additionally, this function can accept additional parameters that represent elements to be inserted into the array at the start index. The function should return an array containing the removed elements.

**Example **

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
customSplice(arr, 3, 3, 0, 0);
console.log(arr);
Expected Output :

[1, 2, 3, 0, 0, 7, 8, 9]

question 6 -
File Segregation
You need to write a function countFileExtensions that takes an array of file names as input and returns an object. This object should count the number of files for each unique file extension.

Example Given the following array of filenames:

const files = [
  "document1.pdf",
  "document2.pdf",
  "image1.png",
  "text1.txt",
  "photo1.jpg",
  "program1.exe",
  "data1.csv",
  "report1.pdf"
];
The function call countFileExtensions(files) should return the following object:

{
  pdf: 3,
  png: 1,
  txt: 1,
  jpg: 1,
  exe: 1,
  csv: 1
}

question 7 - 
Multi-level Destructuring and Spreading Problem
You are working on a project that manages information about employees in a company. Your task is to write a function named updateEmployee that takes two parameters: originalData and updateInfo.

const originalData = {
  id: 101,
  name: 'John Doe',
  department: 'Engineering',
  address: {
    city: 'New York',
    country: 'USA'
  },
  salary: 50000
};

const updateInfo = {
  name: 'Jane Smith',
  address: {
    city: 'Los Angeles',
    country: 'USA'
  },
  salary: 60000
};
Your task is to write the updateEmployee function that updates the employee's information based on the updateInfo provided. The function should perform the following steps:
Destructure the originalData object to extract name, address, and salary.
Destructure the address object further to extract city and country.
Spread the updateInfo object to override the corresponding values in the destructured variables.
Return an object containing the updated employee information.
Output

{
  id: 101,
  name: 'Jane Smith',
  department: 'Engineering',
  address: {
    city: 'Los Angeles',
    country: 'USA'
  },
  salary: 60000
}

question 8 -

Array Rearrangement
Note : Use of splice method is must .

splice documentation
You have an array of numbers with 8 elements. Your task is to rearrange the array in the following manner:

Remove the first 3 numbers from the array.
Add the removed numbers to the end of the array in the same order they were removed.
Write a JavaScript function named rearrangeArray that takes an array of numbers as input and performs the specified rearrangement. The function should return the modified array of numbers.

For example:

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(rearrangeArray(numbers));
//Output
[4, 5, 6, 7, 8, 1, 2, 3]

`;

export default problemStatement;
