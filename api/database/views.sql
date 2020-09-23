DROP VIEW IF EXISTS MentorContact CASCADE;
DROP VIEW IF EXISTS MenteeContact CASCADE;
DROP VIEW IF EXISTS MentorshipMetadata CASCADE;

CREATE VIEW MentorContact(req_id, mentor_uid, mentor_name, mentor_photo, mentor_email, mentor_major, mentor_tg) AS (
    SELECT req_id, mentor_id, name, photo_url, nus_email, major, telegram
    FROM UsersInfo INNER JOIN Mentorship ON (UsersInfo.user_id = Mentorship.mentor_id)
);

CREATE VIEW MenteeContact(req_id, mentee_uid, mentee_name, mentee_photo, mentee_email, mentee_major, mentee_tg) as (
    SELECT req_id, mentee_id, name, photo_url, nus_email, major, telegram
    FROM UsersInfo INNER JOIN Requests ON (UsersInfo.user_id = Requests.mentee_id)
);

CREATE VIEW MentorshipMetadata(req_id, mentor_id, mentee_id, status) AS (
    SELECT req_id, mentor_id, mentee_id, CASE
        WHEN date_completed IS NOT NULL THEN 'completed'
        WHEN date_dropped IS NOT NULL THEN 'dropped'
        ELSE 'current'
        END 
    FROM Mentorship NATURAL JOIN Requests
);

