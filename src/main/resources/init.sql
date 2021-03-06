create table if not exists application (
    id bigint primary key auto_increment not null,
    date timestamp,
    resume_url varchar(255),
    job_offer_id bigint,
    status varchar(32)
);

create table if not exists attendance (
    id bigint primary key auto_increment not null,
    type varchar(32),
    start_date timestamp,
    end_date timestamp,
    status varchar(32),
    employee_id bigint
);

create table if not exists department (
    id bigint primary key auto_increment not null,
    name varchar(128)
);

create table if not exists job_offer (
    id bigint primary key auto_increment not null,
    title varchar(128),
    department_id bigint,
    number bigint,
    due_date date,
    status varchar(128),
    position_id bigint
);

create table if not exists position (
    id bigint primary key auto_increment not null,
    name varchar(128),
    level varchar(32)
);

create table if not exists salary (
    id bigint primary key auto_increment not null,
    employee_id bigint,
    amount decimal(26, 6)
);

create table if not exists employee (
    id bigint primary key auto_increment not null,
    email varchar(128) unique,
    password varchar(128),
    type varchar(32),
    resign_time date,
    enrol_time date,
    name varchar(32),
    gender varchar(16),
    address varchar(128),
    phone_number varchar(64),
    birthday date,
    position_id bigint,
    department_id bigint
);

insert into
    department
select
    *
from
    (
        select
            1,
            'develop'
        union
        select
            2,
            'bussiness'
        union
        select
            3,
            'other'
    ) x
where
    not exists(
        select
            *
        from
            department
    );

insert into
    position
select
    *
from
    (
        select
            1,
            'officer',
            '1'
        union
        select
            2,
            'assitant manager',
            '2'
        union
        select
            3,
            'manager',
            '3'
    ) x
where
    not exists(
        select
            *
        from
            position
    );
