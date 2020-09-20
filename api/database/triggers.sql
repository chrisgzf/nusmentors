CREATE OR REPLACE FUNCTION checkCareerTypeValid() 
    RETURNS TRIGGER AS $$
    BEGIN
        IF NOT NEW.career_type <@ ARRAY(SELECT career_type FROM CareerTypes) THEN
            RAISE EXCEPTION 'Career type does not exist in database.';
        END IF;

        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS careerTypeInRequestMustExist ON Requests;
CREATE TRIGGER careerTypeInRequestsMustExist
    BEFORE INSERT OR UPDATE ON Requests
    FOR EACH ROW
        EXECUTE PROCEDURE checkCareerTypeValid();

