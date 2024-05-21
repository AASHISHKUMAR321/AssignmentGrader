const problemStatement = `
Objective
Develop a backend infrastructure for an Expense Claim Management System to streamline submitting, approving, and managing expense claims within an organization. The system will use role-based access control (RBAC) to provide specific functionalities for Employees, Managers, and Finance Team Members, focusing on the organizational process for claim submissions and approvals.

Key Features Breakdown
Unified User Schema with Role Differentiation:

Task 1.1: Design a single User schema to categorize users into Employees, Managers, or Finance Team Members.
Task 1.2: Implement the schema to support the assignment of employees to managers.
Finance Team-Assigned Manager Relationships:

Task 2.1: Create functionality for the Finance Team to assign a manager to each new employee account upon creation.
Task 2.2: Store manager assignments in the database to define the approval workflow for expense claims.
Directed Expense Claim Submission:

Task 3.1: Enable employees to submit expense claims with necessary documentation.
Task 3.2: Use Multer for file uploads, validating only PDF, JPEG, and PNG formats.
Task 3.3: Automatically direct submitted claims to the assigned managers for review.
Manager-Specific Approval Workflow:

Task 4.1: Implement functionality for managers to review and approve or reject expense claims submitted by their direct reports.
Task 4.2: Ensure that approved claims are advanced to the Finance Team for final processing.
Role-Based CRUD Operations:

Task 5.1: Facilitate CRUD operations for user management.
Task 5.2: Facilitate CRUD operations for expense claim management.
Task 5.3: Govern CRUD operations by the user’s role within the organization.
Implementation of Role-Based Access Control (RBAC):

Task 6.1: Enforce access permissions based on user roles to ensure appropriate access to functionalities.
Task 6.2: Maintain system security and streamline the operation of the expense claim process.
Additional Considerations
Dynamic Manager Assignment by Finance Team:

Task 7.1: Implement the ability for the Finance Team to dynamically reassign managers to employees post-account creation.
Task 7.2: Update the system to reflect changes in manager assignments accurately.
Strategy and Schema Design:

Task 8.1: Emphasize secure, role-specific access to functionalities.
Task 8.2: Design the schema to accommodate user roles, manager assignments, and claim details.
Task 8.3: Allow flexibility and adaptability in the schema design to meet organizational needs.
Good Practices
Code Quality:

Write clean, maintainable, and well-documented code.
Follow proper naming conventions for functions, APIs, variables, etc. (Camel Case, Snake Case).
Structure:

Follow the MVC (Model-View-Controller) architecture.
Use environment variables (.env) to store sensitive information.
Documentation and Comments:

Add comments to explain complex logic and functions.
Ensure all API responses are in JSON format and include appropriate status codes.
`;

export default problemStatement;
