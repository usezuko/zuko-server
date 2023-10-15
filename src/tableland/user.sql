CREATE TABLE user (
  vault_id text primary key unique,
  username text not null,
  registration_timestamp int not null
  )