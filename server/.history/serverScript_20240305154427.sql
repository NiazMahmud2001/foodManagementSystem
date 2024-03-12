#drop database if exists test_database;
CREATE DATABASE IF NOT EXISTS test_database;

USE test_database;

CREATE TABLE IF NOT EXISTS USER_INFO (
    first_name VARCHAR(20) NOT NULL, last_name VARCHAR(20) NOT NULL, user_name VARCHAR(20) NOT NULL, user_password VARCHAR(10) NOT NULL, email VARCHAR(50) NOT NULL, phone_number VARCHAR(13) NOT NULL, address VARCHAR(50) NOT NULL, PRIMARY KEY (email, phone_number), unique (email, phone_number)
);

CREATE TABLE IF NOT EXISTS VOLUNTEER_INFO (
    first_name VARCHAR(20) NOT NULL, last_name VARCHAR(20) NOT NULL, vol_user_name VARCHAR(20) NOT NULL, vol_password VARCHAR(10) NOT NULL, vol_email VARCHAR(50) NOT NULL, vol_phone_number VARCHAR(13) NOT NULL, vol_uid VARCHAR(20) NOT NULL, vol_position VARCHAR(50) NOT NULL, PRIMARY KEY (
        vol_email, vol_phone_number, vol_uid
    ), unique (
        vol_email, vol_phone_number, vol_uid
    )
);

select * from USER_INFO;
#drop table USER_INFO;