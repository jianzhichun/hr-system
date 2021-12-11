create table if not exists  application
(
    id         bigint primary key auto_increment not null,
    date       date,
    resume_url varchar(255),
    status     varchar(32)
);

create table if not exists  attendance
(
    id          bigint primary key auto_increment not null,
    type        varchar(32),
    start_date  date,
    end_date    date,
    status      varchar(32),
    employee_id bigint
);

create table if not exists  department
(
    id   bigint primary key auto_increment not null,
    name varchar(128)
);

create table if not exists  job_offer
(
    id            bigint primary key auto_increment not null,
    title         varchar(128),
    department_id bigint,
    number        bigint,
    due_date      date,
    status        varchar(128),
    position_id   bigint
);

create table if not exists  position
(
    id    bigint primary key auto_increment not null,
    name  varchar(128),
    level varchar(32)
);

create table if not exists  salary
(
    id            bigint primary key auto_increment not null,
    employee_id   bigint,
    department_id bigint,
    amount        decimal(26, 6)
);

create table if not exists  employee
(
    id           bigint primary key auto_increment not null,
    email        varchar(128),
    password     varchar(128),
    type         varchar(32),
    resign_time  date,
    enrol_time   date,
    name         varchar(32),
    gender       varchar(16),
    address      varchar(128),
    phone_number varchar(64),
    position_id  bigint
)