CREATE TABLE job_title (
    position TEXT PRIMARY KEY,
    salary INT,
    bonus BOOLEAN
);
CREATE TABLE employee (
    passport_number TEXT PRIMARY KEY,
    full_name TEXT,
    experience INT,
    position TEXT REFERENCES job_title(position)
);

CREATE TABLE client (
    passport_number TEXT PRIMARY KEY,
    full_name TEXT,
    medical_certificate BOOLEAN,
    employee_passport_number TEXT REFERENCES employee(passport_number),
    subscription_id INT REFERENCES pool_subscription (id)
);

CREATE TABLE pool_subscription (
    id INT PRIMARY KEY,
    type TEXT,
    cost DATE,
    end_date DATE,
    swgroup_id INT REFERENCES swgroup(id)
);

CREATE TABLE swgroup (
    id INT PRIMARY KEY,
    level INT,
    member_count INT,
    age_category TEXT
);

CREATE TABLE lesson (
    id INT PRIMARY KEY,
    category TEXT,
    duration INT,
    employee_passport_number TEXT REFERENCES employee(passport_number)
);

CREATE TABLE visit (
    id INT PRIMARY KEY,
    datetime TIMESTAMP,
    attended BOOLEAN,
    client_passport_number TEXT REFERENCES client(passport_number),
    employee_passport_number TEXT REFERENCES employee(passport_number),
    lesson_id INT REFERENCES lesson(id)
);

CREATE TABLE schedule (
    id INT PRIMARY KEY,
    day_of_week TEXT,
    time TIME,
    track INT,
    lesson_id INT REFERENCES lesson(id),
    swgroup_id INT REFERENCES swgroup(id)
);