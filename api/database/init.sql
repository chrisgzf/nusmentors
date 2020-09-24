INSERT INTO UsersInfo(user_id, name, nus_email, email, matric_date, major) VALUES ('1', 'Alice', 'alice@u.nus.edu', 'alice@gmail.com', NOW(), 'CS');
INSERT INTO UsersInfo(user_id, name, nus_email, matric_date, major, is_verified_email) VALUES ('2', 'Bob', 'bob@u.nus.edu', NOW(), 'CS', TRUE);
INSERT INTO UsersInfo(user_id, name, nus_email, matric_date, major, is_verified_email) VALUES ('3', 'Charlie', 'charlie@u.nus.edu', NOW(), 'CS', TRUE);
INSERT INTO UsersInfo(user_id, name, nus_email, matric_date, major, is_verified_email) VALUES ('4', 'Dan', 'dan@u.nus.edu', NOW(), 'CS', TRUE);
INSERT INTO UsersInfo(user_id, name, nus_email, matric_date, major, is_verified_email) VALUES ('5', 'Ethan', 'ethan@u.nus.edu', NOW(), 'CS', TRUE);


INSERT INTO CareerTypes(career_type) VALUES ('webdev');
INSERT INTO CareerTypes(career_type) VALUES ('native dev');
INSERT INTO CareerTypes(career_type) VALUES ('data science');

INSERT INTO Requests(mentee_id, problem_type, title, description, career_type, date_created, should_display) VALUES ('1', ARRAY['resume', 'interviews', 'general'], 'This is my title', 'This is my description. Thanks for reading.', ARRAY['data science'], NOW(), FALSE);
INSERT INTO Requests(mentee_id, problem_type, title, description, career_type, date_created, should_display) VALUES ('3', ARRAY['resume'], 'Improving resume', 'Please help me to look through my resume and suggest improvements!', ARRAY['native dev'], NOW(), FALSE);
INSERT INTO Requests(mentee_id, problem_type, title, description, career_type, date_created) VALUES ('4', ARRAY['interviews'], 'Mock interviews', 'I am trying to apply for a web developer job. I need some help with mock interviews.', ARRAY['webdev'], NOW());
INSERT INTO Requests(mentee_id, problem_type, title, description, career_type, date_created, should_display) VALUES ('5', ARRAY['resume', 'interviews'], 'Mock interviews', 'This is a long message requesting for help. Please send help as I am writing a long message requesting for help. Please send help as I am writing a long message requesting for help. Please send help as I am writing a long message requesting for help. Please send help as I am writing a long message requesting for help. Please send help as I am writing a long message requesting for help. Please send help as I am writing a long message requesting for help. Please send help as I am writing a long message requesting for help. Please send help as I am writing a long message requesting for help. Please send help as I am writing a long message requesting for help.', ARRAY['webdev'], '2020-08-21T09:43:47.477Z', FALSE);

INSERT INTO Mentorship(req_id, mentor_id, date_formed) VALUES (1,'2',NOW());
INSERT INTO Mentorship(req_id, mentor_id, date_formed) VALUES (2,'2',NOW());
INSERT INTO Mentorship(req_id, mentor_id, date_formed) VALUES (4,'3',NOW());

INSERT INTO Notifies(notif_type, from_id, to_id, date_created, is_from_mentor) VALUES ('accept', '2', '1', NOW(), TRUE);
