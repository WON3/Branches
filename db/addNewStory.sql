Insert Into stories
    (
    is_complete,
    user_id,
    title,
    description,
    point_of_view,
    is_public,
    allows_fork,
    moderator_accepts)
VALUES(
    $1, $2, $3 ,$4 ,$5 ,$6 ,$7 ,$8  
);

