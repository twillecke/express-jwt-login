-- File: create.sql

-- Create the user_account table
CREATE TABLE IF NOT EXISTS thiago.user_account
(
    user_id SERIAL PRIMARY KEY,
    name TEXT,
    lastname TEXT,
    email TEXT,
    signup_date TIMESTAMPTZ
);

-- Create the user_login_data table
CREATE TABLE IF NOT EXISTS thiago.user_login_data
(
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    hashpassword TEXT,
    FOREIGN KEY (user_id) REFERENCES thiago.user_account (user_id) ON DELETE CASCADE
);

-- Optionally, add an index on the username for faster lookups
CREATE INDEX IF NOT EXISTS idx_username ON thiago.user_login_data (username);
