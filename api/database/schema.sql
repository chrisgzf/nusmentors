DROP TABLE IF EXISTS UsersInfo CASCADE;
DROP TABLE IF EXISTS CareerTypes CASCADE;
DROP TABLE IF EXISTS Requests CASCADE;
DROP TABLE IF EXISTS Mentorship CASCADE;

CREATE TABLE UsersInfo (
	user_id				TEXT PRIMARY KEY,
        name                            TEXT NOT NULL,
        photo_url                       TEXT,
	nus_email			TEXT UNIQUE,
	matric_date			TIMESTAMP,
	grad_date			TIMESTAMP,
	major				TEXT,
	telegram			TEXT,
	is_verified_email	        BOOLEAN DEFAULT FALSE,
);

CREATE TABLE CareerTypes (
	career_type			TEXT PRIMARY KEY
);

CREATE TABLE Requests (
	req_id				TEXT PRIMARY KEY,
	mentee_id			TEXT,
	problem_type		        TEXT[]
		CHECK (problem_type in ('resume','interviews','general')),
	title				TEXT,
	description			TEXT,
	career_type			TEXT[],
	date_created		TIMESTAMP,
	FOREIGN_KEY (mentee_id) REFERENCES Users(user_id),
	FOREIGN KEY (career_type) REFERENCES CareerTypes ON DELETE SET DEFAULT
);

CREATE TABLE Mentorship (
	req_id				TEXT PRIMARY KEY,
	mentor_id			TEXT,
	date_formed			TIMESTAMP NOT NULL,
	date_completed		TIMESTAMP,
	is_dropped			BOOLEAN DEFAULT FALSE,
	FOREIGN_KEY (req_id) REFERENCES Requests,
	FOREIGN_KEY (mentor_id) REFERENCES Users(user_id),
	CHECK ((date_completed IS NOT NULL AND is_dropped IS FALSE) OR date_completed IS NULL)
);
