CREATE DATABASE IF NOT EXISTS test_database;
USE test_database ;

CREATE TABLE IF NOT EXISTS USER_INFO (
	first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    user_password VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone_number VARCHAR(13) NOT NULL,
    address VARCHAR(50) NOT NULL,
	PRIMARY KEY (email, phone_number), 
    unique(email, phone_number)
);

select * from USER_INFO;

























