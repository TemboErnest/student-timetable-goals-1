-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS campus_crud;
USE campus_crud;

-- Create the timetable table based on assignment specifications
CREATE TABLE IF NOT EXISTS timetable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(20) NOT NULL,
  course_name VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert at least 10 sample records[cite: 2]
INSERT INTO timetable (course_code, course_name) VALUES
('ICT251', 'Web Technologies and Node.js'),
('CS101', 'Introduction to Computer Science'),
('MATH201', 'Linear Algebra and Calculus'),
('DB301', 'Advanced Database Management Systems'),
('NET202', 'Computer Networks and Security'),
('SE401', 'Software Engineering Principles'),
('AI305', 'Artificial Intelligence Basics'),
('OS210', 'Operating Systems Design'),
('CYB100', 'Cybersecurity Fundamentals'),
('PROJ499', 'Final Year Capstone Project');