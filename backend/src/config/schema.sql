CREATE DATABASE IF NOT EXISTS quickhire;
USE quickhire;

CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  resume_link VARCHAR(500) NOT NULL,
  cover_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- Sample seed data
INSERT INTO jobs (title, company, location, category, description) VALUES
('Frontend Developer', 'TechCorp BD', 'Dhaka', 'Engineering', 'We are looking for a skilled Frontend Developer with React.js experience. You will work on building modern, responsive web interfaces for our SaaS platform.\n\nRequirements:\n- 2+ years React.js experience\n- Proficient in Tailwind CSS\n- Strong problem-solving skills'),
('Backend Engineer', 'StartupXYZ', 'Remote', 'Engineering', 'Join our growing team as a Backend Engineer. You will design and build scalable REST APIs using Node.js and MySQL.\n\nRequirements:\n- 3+ years Node.js experience\n- Experience with MySQL/PostgreSQL\n- Familiarity with Docker'),
('UI/UX Designer', 'Creative Studio', 'Chittagong', 'Design', 'We need a talented UI/UX Designer to craft beautiful user experiences for our mobile and web products.\n\nRequirements:\n- Proficient in Figma\n- Portfolio showcasing web/mobile designs\n- Understanding of accessibility standards'),
('Product Manager', 'FinTech Co', 'Dhaka', 'Management', 'Lead product strategy and roadmap for our fintech platform. Work closely with engineering and design teams.\n\nRequirements:\n- 3+ years product management experience\n- Strong analytical skills\n- Excellent communication'),
('DevOps Engineer', 'CloudNet', 'Remote', 'Engineering', 'Manage and scale our cloud infrastructure on AWS. Implement CI/CD pipelines and ensure high availability.\n\nRequirements:\n- Experience with AWS/GCP\n- Kubernetes knowledge\n- Scripting skills (Bash, Python)');