SELECT u.username, u.email, c.* from contributions as c
join users as u on u.id = c.user_id 
where c.story_id = ${story_id}