CREATE DATABASE skills_kanban;
CREATE USER 'skills'@'localhost' IDENTIFIED BY 'triszalizirni';
GRANT ALL PRIVILEGES ON skills_kanban.* TO 'skills'@'localhost';
FLUSH PRIVILEGES;