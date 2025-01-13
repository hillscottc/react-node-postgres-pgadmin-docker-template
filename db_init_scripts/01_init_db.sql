-- Create User table
CREATE TABLE IF NOT EXISTS public."User" (
    id CHARACTER VARYING(255),
    user_name CHARACTER VARYING(255) NOT NULL,
    first_name CHARACTER VARYING(120),
    last_name CHARACTER VARYING(120),
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.todo_items
(
    id character varying(36) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    completed boolean
);

