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

