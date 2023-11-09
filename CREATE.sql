-- Drop user_login_data table if it exists
DROP TABLE IF EXISTS thiago.user_login_data;

-- Drop user_account table if it exists
DROP TABLE IF EXISTS thiago.user_account;

-- Create user_account table
CREATE TABLE IF NOT EXISTS thiago.user_account
(
    user_id serial PRIMARY KEY,
    name text,
    lastname text,
    email text,
    signup_date timestamp with time zone
);

-- Create user_login_data table
CREATE TABLE IF NOT EXISTS thiago.user_login_data
(
    user_id serial PRIMARY KEY,
    username text UNIQUE,
    hashpassword text,
    FOREIGN KEY (user_id) REFERENCES thiago.user_account (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
