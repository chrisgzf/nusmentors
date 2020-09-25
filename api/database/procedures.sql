CREATE OR REPLACE PROCEDURE
    verifyEmail(
        _uid    TEXT,
        _email  TEXT
    ) AS $$

    BEGIN
        IF (_uid, _email) NOT IN (SELECT user_id, nus_email FROM UsersInfo) THEN
            RAISE EXCEPTION 'email does not match user.';
        END IF;

        UPDATE UsersInfo
        SET is_verified_email = TRUE
        WHERE user_id = _uid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    acceptRequest(
        _req_id     TEXT,
        _mentor_uid TEXT
    ) AS $$
    DECLARE 
        mentee_id TEXT;
    BEGIN 
        mentee_id := (SELECT DISTINCT R.mentee_id
            FROM Requests R
            WHERE req_id = _req_id::INTEGER);
        
        UPDATE Requests
        SET should_display=FALSE
        WHERE req_id=_req_id::INTEGER;
        
        INSERT INTO Mentorship(req_id, mentor_id, date_formed) VALUES (_req_id::INTEGER, _mentor_uid, NOW());
        INSERT INTO Notifies(notif_type, req_id, date_created) VALUES('accept', _req_id::INTEGER, NOW());
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    dropMentee(
        _req_id     TEXT,
        _mentor_uid TEXT
    ) AS $$
    DECLARE 
        mentee_id TEXT;
    BEGIN 
        mentee_id := (SELECT DISTINCT R.mentee_id
            FROM Requests R
            WHERE req_id = _req_id::INTEGER);
        
        UPDATE Mentorship SET date_dropped = NOW() WHERE req_id = _req_id::INTEGER AND mentor_id = _mentor_uid;
        INSERT INTO Notifies(notif_type, req_id, date_created) VALUES('dropped', _req_id::INTEGER, NOW());
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    markAsComplete(
        _req_id     TEXT,
        _mentor_uid TEXT
    ) AS $$
    DECLARE 
        _mentee_id TEXT;
    BEGIN 
        _mentee_id := (SELECT DISTINCT R.mentee_id
            FROM Requests R
            WHERE req_id = _req_id::INTEGER);     

        UPDATE Mentorship SET date_completed = NOW() WHERE req_id = _req_id::INTEGER AND (mentor_id = _mentor_uid OR (_req_id::INTEGER, _mentor_uid) IN (SELECT req_id, mentee_id FROM Requests));
        INSERT INTO Notifies(notif_type, req_id, date_created) VALUES('complete', _req_id::INTEGER, NOW());
    END;
$$ LANGUAGE plpgsql;

