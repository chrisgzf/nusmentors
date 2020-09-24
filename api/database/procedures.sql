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
        INSERT INTO Notifies(notif_type, from_id, to_id, date_created, is_from_mentor) VALUES('accept', _mentor_uid, mentee_id, NOW(), TRUE);
    END;
$$ LANGUAGE plpgsql;