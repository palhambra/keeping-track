-- INSERT INTO department (name)
--   VALUES ("Payroll");

-- SELECT * FROM department;

-- SELECT * FROM role;

-- SELECT * FROM employee;


SELECT role.title, department.name AS department_name, role.salary
FROM role
JOIN department ON role.department_id = department.id;