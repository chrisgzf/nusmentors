/* Initializes a test db, used for debug mode */

DROP TABLE IF EXISTS test CASCADE;

Create TABLE test 
(
    tid INTEGER
);

INSERT INTO test (tid) 
VALUES (1), (2), (3);

