CREATE DATABASE `social`;
CREATE USER 'admin'@'%' IDENTIFIED BY 'admin';
GRANT ALL privileges ON `social`.* TO 'admin'@'%' IDENTIFIED BY 'admin';
FLUSH PRIVILEGES;