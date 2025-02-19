create table user (
  id int primary key auto_increment not null,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) not null unique,
  password VARCHAR(255) not null,
  profile_picture VARCHAR(255) DEFAULT NULL,
  following INT not NULL,
  followers INT not NULL, 
  bio TEXT DEFAULT NULL,
  portfolio VARCHAR(255) DEFAULT NULL,
  website VARCHAR(255) DEFAULT NULL
);

INSERT INTO user(username, email, password, profile_picture, following, followers, bio, portfolio, website)
VALUES ("Admin", "test@test.fr", "123456", "", 150, 230, "Développeur passionné par le web et les nouvelles technologies.", "https://johndoe.dev", "https://instagram.com/johndoe");

create table artwork (
  id int primary key auto_increment not null,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  picture VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO artwork(title, picture, category, user_id)
VALUES ("Titre", "photo", "technique", 1 );