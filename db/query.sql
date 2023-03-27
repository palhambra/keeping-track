-- INSERT INTO department (name)
--   VALUES ("Payroll");

-- SELECT * FROM department;

-- SELECT * FROM role;

-- SELECT * FROM employee;


-- SELECT role.title, department.name AS department_name, role.salary
-- FROM role
-- JOIN department ON role.department_id = department.id;

SELECT employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON employee.manager_id = manager.id;

-- JOIN department ON role.department_id = department.id;