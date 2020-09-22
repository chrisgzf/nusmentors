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

    BEGIN 
        UPDATE Requests
        SET should_display=FALSE
        WHERE req_id=_req_id::INTEGER;
        INSERT INTO Mentorship(req_id, mentor_id, date_formed) VALUES (_req_id::INTEGER, _mentor_uid, NOW());
    END;
$$ LANGUAGE plpgsql;