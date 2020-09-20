INSERT INTO UsersInfo(user_id, name, nus_email, matric_date, major) VALUES ('1', 'Alice', 'alice@u.nus.edu', NOW(), 'CS');
INSERT INTO UsersInfo(user_id, name, nus_email, matric_date, major, is_verified_email) VALUES ('2', 'Bob', 'bob@u.nus.edu', NOW(), 'CS', TRUE);

INSERT INTO CareerTypes(career_type) VALUES ('webdev');
INSERT INTO CareerTypes(career_type) VALUES ('native dev');
INSERT INTO CareerTypes(career_type) VALUES ('data science');

INSERT INTO Requests(req_id, mentee_id, problem_type, title, description, career_type, date_created) VALUES ('r1', '1', ARRAY['resume', 'interviews'], 'title', 'descr', ARRAY['webdev'], NOW());

INSERT INTO Mentorship(req_id, mentor_id, date_formed) VALUES ('r1','2',NOW());

