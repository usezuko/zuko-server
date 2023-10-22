CREATE TABLE likes (
    like_id integer primary key,
    comment_id int,
    post_id int,
    vault_id text not null
    )