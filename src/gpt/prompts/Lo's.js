const learningObjectives = `
Learning Objectives:
Comprehensive implementation of CRUD operations for managing users, expense claims, and approval statuses (1 Point)
Proper implementation of the unified User schema with role differentiation (1 Point)
Correctly enabling the Finance Team to assign managers to employees (1 Point)
Implementation of secure authentication and authorization mechanisms (1 Point)
Correct setup and use of Multer for file uploads with validation for PDF, JPEG, and PNG formats (1 Point)
Successful submission of expense claims by employees, ensuring claims are directed to their assigned manager (1 Point)
Accurate manager-specific approval workflow, allowing managers to review and approve/reject submissions (1 Point)
Proper routing of approved claims to the Finance Team for final processing, with the ability to approve/reject (1 Point)
Effective implementation of RBAC, ensuring users can only access and perform functions relevant to their roles (1 Point)
Task List:
CRUD Operations for Managing Users, Expense Claims, and Approval Statuses (1 Point)
Implement Create, Read, Update, and Delete operations for users.
Implement Create, Read, Update, and Delete operations for expense claims.
Implement Create, Read, Update, and Delete operations for approval statuses.
Unified User Schema with Role Differentiation (1 Point)
Design and implement a unified User schema.
Include role differentiation in the schema (e.g., employee, manager, finance team).
Assigning Managers to Employees (1 Point)
Enable the Finance Team to assign managers to employees.
Secure Authentication and Authorization Mechanisms (1 Point)
Implement secure authentication (e.g., JWT, OAuth).
Implement role-based authorization.
File Uploads with Multer and Validation (1 Point)
Set up Multer for file uploads.
Validate file types for uploads (PDF, JPEG, PNG).
Submission of Expense Claims (1 Point)
Allow employees to submit expense claims.
Ensure claims are directed to the assigned manager.
Manager-Specific Approval Workflow (1 Point)
Implement a workflow for managers to review submissions.
Allow managers to approve or reject expense claims.
Routing Approved Claims to the Finance Team (1 Point)
Route approved claims to the Finance Team.
Allow the Finance Team to approve or reject claims.
Role-Based Access Control (RBAC) (1 Point)
Implement RBAC.
Ensure users can only access and perform functions relevant to their roles.
Scoring Summary:
CRUD Operations: 1 Point
Unified User Schema: 1 Point
Assigning Managers: 1 Point
Authentication and Authorization: 1 Point
File Uploads and Validation: 1 Point
Submission of Expense Claims: 1 Point
Manager Approval Workflow: 1 Point
Routing to Finance Team: 1 Point
Role-Based Access Control: 1 Point
`;

export default learningObjectives;
