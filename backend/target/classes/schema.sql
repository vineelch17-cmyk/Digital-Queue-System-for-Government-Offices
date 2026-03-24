CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    preferred_language VARCHAR(20),
    enabled BIT,
    role VARCHAR(50) NOT NULL,
    created_at DATETIME
);

CREATE TABLE office (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    contact_number VARCHAR(50),
    active BIT
);

CREATE TABLE department (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    office_id BIGINT NOT NULL
);

CREATE TABLE services (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    avg_service_time_minutes INT,
    priority_supported BIT,
    fee_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    department_id BIGINT NOT NULL
);

CREATE TABLE counter (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50),
    office_id BIGINT NOT NULL,
    department_id BIGINT NOT NULL,
    staff_user_id BIGINT
);

CREATE TABLE queues (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    queue_date DATE,
    active BIT,
    office_id BIGINT NOT NULL,
    department_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL
);

CREATE TABLE token (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    token_number VARCHAR(255) NOT NULL UNIQUE,
    queue_sequence INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    priority_type VARCHAR(50) NOT NULL,
    created_at DATETIME,
    called_at DATETIME,
    completed_at DATETIME,
    expires_at DATETIME,
    user_id BIGINT NOT NULL,
    queue_id BIGINT NOT NULL,
    counter_id BIGINT
);

CREATE TABLE feedback (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    rating INT,
    comments VARCHAR(1000),
    created_at DATETIME,
    user_id BIGINT NOT NULL,
    token_id BIGINT NOT NULL
);

CREATE TABLE notification (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    message VARCHAR(1000),
    read_flag BIT,
    type VARCHAR(100),
    created_at DATETIME,
    user_id BIGINT NOT NULL
);

CREATE TABLE payment (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    reference_number VARCHAR(255) NOT NULL UNIQUE,
    paid_at DATETIME,
    token_id BIGINT NOT NULL UNIQUE,
    user_id BIGINT NOT NULL
);
