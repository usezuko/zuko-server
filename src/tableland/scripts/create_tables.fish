#!/usr/bin/fish

# Prompt for private key if not set
# HINT: you can export it
if test -z "$PRIVATE_KEY"
    read -P "Enter private key: " -x PRIVATE_KEY
end

# Get and display script directory
set script_dir (dirname (status -f))

# Define an array of database file paths relative to script directory
set databases "$script_dir/../user.sql" "$script_dir/../community.sql" "$script_dir/../like.sql" "$script_dir/../post.sql" "$script_dir/../user-community.sql" "$script_dir/../comment.sql"

# Check if files exist
for db in $databases
    echo "Checking file: $db"
    if test -f "$db"
        echo "File exists: $db"
    else
        echo "File not found: $db"
    end
end

# Loop through the database files and create tables for each
for db in $databases
    echo "Processing: $db"
    bunx tableland create --file $db --privateKey $PRIVATE_KEY --chain arbitrum-sepolia
end