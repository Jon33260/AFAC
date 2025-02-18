create table user (
  id int primary key auto_increment not null,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) not null unique,
  password VARCHAR(255) not null,
  profile_picture VARCHAR(255) DEFAULT NULL,
  bio TEXT DEFAULT NULL
);

INSERT INTO user(username, email, password)
VALUES ("Admin", "test@test.fr", "123456");

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