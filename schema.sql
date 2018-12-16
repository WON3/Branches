CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    username VARCHAR(100)
);

CREATE TABLE role_type
(
    id SERIAL PRIMARY KEY,
    description VARCHAR(20)
);


INSERT INTO role_type
    (description)
VALUES(
        'contributor'
);

INSERT INTO role_type
    (description)
VALUES(
        'moderator'
);

INSERT INTO role_type
    (description)
VALUES(
        'admin'
);

CREATE TABLE user_role
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES role_type(id)
);

CREATE TABLE user_login
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    login_token VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE profile_pic
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    url VARCHAR(500),
    is_default BOOL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE stories
(
    story_id SERIAL PRIMARY KEY,
    is_complete BOOL,
    user_id INT,
    title VARCHAR(100),
    description VARCHAR(1000),
    point_of_view VARCHAR(100),
    is_public BOOL,
    allows_fork BOOL,
    moderator_accepts BOOL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE stories_contibutors
(
    id SERIAL PRIMARY KEY,
    story_id INT,
    user_id INT,
    FOREIGN KEY (story_id) REFERENCES stories(story_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE character
(
    id SERIAL PRIMARY KEY,
    story_id INT,
    name VARCHAR(100),
    description VARCHAR (300),
    FOREIGN KEY (story_id) REFERENCES stories(story_id)
);

CREATE TABLE genre
(
    id SERIAL PRIMARY KEY,
    description VARCHAR(300)
)

INSERT INTO genre
    (description)
VALUES(
        'tragedy'
);

INSERT INTO genre
    (description)
VALUES(
        'sci-fi'
);

INSERT INTO genre
    (description)
VALUES(
        'fantasy'
);

INSERT INTO genre
    (description)
VALUES(
        'mythology'
);

INSERT INTO genre
    (description)
VALUES(
        'adventure'
);

INSERT INTO genre
    (description)
VALUES(
        'mystery'
);

INSERT INTO genre
    (description)
VALUES(
        'drama'
);

INSERT INTO genre
    (description)
VALUES(
        'romance'
);

INSERT INTO genre
    (description)
VALUES(
        'action'
);

INSERT INTO genre
    (description)
VALUES(
        'satire'
);

INSERT INTO genre
    (description)
VALUES(
        'horror'
);

INSERT INTO genre
    (description)
VALUES(
        'comedy'
);

INSERT INTO genre
    (description)
VALUES(
        'thriller'
);

CREATE TABLE story_genre
(
    id SERIAL PRIMARY KEY,
    story_id INT,
    genre_id INT,
    FOREIGN KEY (story_id) REFERENCES stories(story_id),
    FOREIGN KEY (genre_id) REFERENCES genre(id)
)

CREATE TABLE rule
(
    id SERIAL PRIMARY KEY,
    description VARCHAR (500)
);

INSERT INTO rule
    (description)
VALUES(
        '2500'
);

INSERT INTO rule
    (description)
VALUES(
        '2000'
);

INSERT INTO rule
    (description)
VALUES(
        '1500'
);

INSERT INTO rule
    (description)
VALUES(
        '1000'
);

CREATE TABLE story_rule
(
    id SERIAL PRIMARY KEY,
    story_id INT,
    rule_id INT,
    FOREIGN KEY (story_id) REFERENCES stories(story_id),
    FOREIGN KEY (rule_id) REFERENCES rule(id)
);

CREATE TABLE contributions
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    story_id INT,
    contribution VARCHAR(2500),
    is_accepted BOOL,
    prior_contribution_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (story_id) REFERENCES stories(story_id),
)

CREATE TABLE contribution_votes
(
    id SERIAL PRIMARY KEY,
    contribution_id INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (contribution_id) REFERENCES contributions(id)
)

CREATE TABLE user_story_favorites
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    story_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (story_id) REFERENCES stories(story_id)
)