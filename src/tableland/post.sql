CREATE TABLE post (
    post_id integer primary key,
    title text not null,
    content text not null,
    timestamp int not null,
    likes_count int
    comments_count int
    vault_id text not null,
    group_id text not null
    )