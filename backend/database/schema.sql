-- Drop existing tables
DROP TABLE IF EXISTS time_entries;
DROP TABLE IF EXISTS users;

-- Create the users table with a pin code instead of email and password
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,  -- Keep email for registration
  pin_hash TEXT NOT NULL, -- Store the hashed pin code here
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the time_entries table
CREATE TABLE time_entries (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  clock_in TIMESTAMP NOT NULL,
  clock_out TIMESTAMP,
  total_hours INTERVAL GENERATED ALWAYS AS (clock_out - clock_in) STORED
);
