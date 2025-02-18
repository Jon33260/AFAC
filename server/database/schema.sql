create table users (
  id int primary key auto_increment not null,
  username VARCHAR(255) NOT NULL,
  email varchar(255) not null unique,
  password varchar(255) not null,
  profile_picture VARCHAR(255) DEFAULT NULL,
  bio TEXT DEFAULT NULL
);

INSERT INTO users(username, email, password)
VALUES ("Admin", "test@test.fr", "123456");

