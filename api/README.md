# NUSMentors API

## Setup

### Database setup

1. Ensure that you have postgresql 12 installed on your system

2. Run `sudo service postgresql start` to start postgresql 

3. Run `psql --user postgres -h localhost` to start psql 

4. Connect to nusmentors database using `\c nusmentors`

5. Initialize the necessary tables, e.g. `\i setup.sql` for actual use. Or `\i test.sql` for testing.

You may want to set aliases for `sudo service postgresql start` and `psql --user postgres -h localhost`. These are frequently used commands.

### Start the API server on localhost

1. Ensure that you have `yarn` installed on your system

2. In this folder, run `yarn install` followed by `yarn start`.
