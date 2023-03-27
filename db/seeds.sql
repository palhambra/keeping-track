INSERT INTO department (name)-- Need to fill in
VALUES ("Sales"),
       ("Service"),
       ("Parts");
      

INSERT INTO role (title, salary, department_id)-- Need to fill in
VALUES ("Sales Advisor", 80000, 1),
       ("Service Technician", 50000, 2),
       ("Service Advisor", 60000, 2),
       ("Service Supervisor", 100000, 2),
       ("Parts Advisor", 55000, 3),
       ("Lead Sales Advisor", 110000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)-- Need to fill in
VALUES ("Yimmy", "Jin", 2, 7),
       ("Yeremy", "Jeeks", 2, 7),
       ("Yordan", "Jelsey", 5, NULL),
       ("Yesse", "Jryder", 5, NULL),
       ("Yosef", "Jantos", 2, 7),
       ("Yose", "Jomez", 2, 7),
       ("Yerome", "Jamirez", 4, NULL),
       ("Yacob", "Jela Cruz", 1, 9),
       ("Yaggie", "Jarrezi", 6, NULL),
       ("Yicky", "Jomanenko", 3, 9);