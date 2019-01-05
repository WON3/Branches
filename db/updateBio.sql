INSERT INTO users(bio)
VALUE($1)
WHERE (id = $2);
