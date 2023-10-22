#!/usr/bin/fish

# Define an array of database file paths
set databases "../user.sql" "../community.sql" "../like.sql" "../post.sql" "../user-community.sql" "../comment.sql"

# Loop through the database files and create tables for each
for db in $databases
    tableland create --file $db
end
