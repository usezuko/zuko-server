CREATE TABLE community (
    community_id integer primary key,
    name text not null,
    description text,
    profile_url text,
    group_id text not null unique
    )