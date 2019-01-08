SELECT title, story_id, is_complete, description
FROM  stories
WHERE user_id=$1;