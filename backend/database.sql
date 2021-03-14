CREATE DATABASE CloudPhone;

CREATE TABLE PhoneLog(
    PhoneLogId uuid PRIMARY KEY,
    Name varchar(255),
    "From" varchar(255),
    "To" varchar(255),
    TimeLimit varchar(255)
);