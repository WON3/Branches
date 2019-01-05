INSERT INTO users(username, email)
VALUES($1, $2),
RETURNING id AS user_id;