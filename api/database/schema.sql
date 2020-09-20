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
        CHECK (matric_date IS NULL OR grad_date IS NULL OR matric_date < grad_date)
);

CREATE TABLE CareerTypes (
	career_type			TEXT PRIMARY KEY
);

CREATE TABLE Requests (
	req_id				TEXT PRIMARY KEY,
	mentee_id			TEXT REFERENCES UsersInfo(user_id),
	problem_type		        TEXT[]
		CHECK (problem_type <@ ARRAY['resume','interviews','general']),
	title				TEXT,
	description			TEXT,
	career_type			TEXT[],
	date_created	    TIMESTAMP,
	should_display		BOOLEAN DEFAULT TRUE
);

CREATE TABLE Mentorship (
	req_id				TEXT PRIMARY KEY REFERENCES Requests(req_id),
	mentor_id			TEXT REFERENCES UsersInfo(user_id),
	date_formed			TIMESTAMP NOT NULL,
	date_completed  		TIMESTAMP,
	date_dropped			TIMESTAMP,
	CHECK ((date_completed IS NOT NULL AND date_dropped IS NULL) OR date_completed IS NULL)
);
