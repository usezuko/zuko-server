CREATE TABLE comment (
    comment_id integer primary key,
    post_id int not null,
    vault_id text not null unique,
    content text not null,
    likes_count int,
    timestamp int not null
    )