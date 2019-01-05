SELECT url, title, story_id, is_complete, description
FROM profile_pic
INNER JOIN stories ON profile_pic.user_id = stories.user_id;