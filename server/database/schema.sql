-- SQLBook: Code
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT NULL,
  following INT DEFAULT 0,
  followers INT DEFAULT 0, 
  bio TEXT DEFAULT NULL,
  portfolio VARCHAR(255) DEFAULT NULL,
  website VARCHAR(255) DEFAULT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

-- le mdp est mdpAFAC@91
INSERT INTO user(username, email, hashed_password, profile_picture, following, followers, bio, portfolio, website, is_admin) VALUES
("Admin", "test@test.fr", "$argon2id$v=19$m=19456,t=2,p=1$Yme1gkTMwKkLvuW6KJwRLg$qUpg5FadAxfwrS1pTA8wHiEEq/7TvRBY/Yi8y4BT2J0", "", 150, 230, "Développeur passionné par le web et les nouvelles technologies.", "https://johndoe.dev", "https://instagram.com/johndoe", TRUE);


INSERT INTO user(username, email, hashed_password, profile_picture, following, followers, bio, portfolio, website, is_admin) VALUES
("Clément PICASSO", "test3@test.fr", "123456", "", 150, 230, "I am a digital artist and photographer capturing the beauty of Earth's diverse landscapes. Through photography and digital art, I blend reality and imagination to create immersive scenes that highlight nature's depth, light, and atmosphere, inviting viewers to explore the world through a new lens.", "https://johndoe.dev", "https://instagram.com/johndoe", FALSE),
("Admin", "admin@test.fr", "123456",NULL,0,0,NULL,NULL,NULL, FALSE),
("Alice", "alice@example.com", "password1",NULL,0,0,NULL,NULL,NULL, FALSE),
("Bob", "bob@example.com", "password2",NULL,0,0,NULL,NULL,NULL, FALSE),
("Charlie", "charlie@example.com", "password3",NULL,0,0,NULL,NULL,NULL, FALSE),
("David", "david@example.com", "password4",NULL,0,0,NULL,NULL,NULL, FALSE),
("Emma", "emma@example.com", "password5",NULL,0,0,NULL,NULL,NULL, FALSE);

INSERT INTO user(username, email, hashed_password, profile_picture, following, followers, bio, portfolio, website) VALUES
("Sophie", "sophie@example.com", "password6", NULL, 0, 0, "Photographe amateur passionnée par la nature et les paysages.", NULL, NULL),
("Antoine", "antoine@example.com", "password7", NULL, 0, 0, "Artiste digital créant des œuvres abstraites et modernes.", NULL, NULL),
("Marie", "marie@example.com", "password8", NULL, 0, 0, "Illustratrice et peintre explorant le mélange des styles artistiques.", NULL, NULL),
("Lucas", "lucas@example.com", "password9", NULL, 0, 0, "Passionné de photographie de rue et de portraits urbains.", NULL, NULL);


CREATE TABLE category (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL
);

INSERT INTO category (name) VALUES
  ('Peintures'),
  ('Musiques'),
  ('Photos'),
  ('Danse'),
  ('Street Art'),
  ('Sculpture'),
  ('Autres');


CREATE TABLE artwork (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  picture text NOT NULL,
  category_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(category_id) REFERENCES category(id)
);

INSERT INTO artwork(title, description, picture, category_id, user_id) VALUES
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", 4, 3),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 3, 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", 2, 3),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 1, 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", 6, 3),
("Foret", "Jolie foret", "https://img.freepik.com/photos-premium/arbres-qui-poussent-dans-foret_1048944-30368869.jpg?w=1380", 5, 4),
("Ecureuil", "Un petit ecureuil qui prend la pose", "https://img.freepik.com/photos-premium/close-up-ecureuil-poteau-bois_1048944-30370286.jpg?w=1380", 2, 5),
("Jolie madame", "Photo de jolie madame", "https://img.freepik.com/photos-gratuite/portrait-personne-assistant-soiree-musique-techno-dynamique_23-2150551577.jpg?t=st=1739959194~exp=1739962794~hmac=d503fde15dc3a3574e390ea38cd78836e14db1485751c3a61fa27d20240fbd43&w=1380", 3, 6),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", 4, 3),
("Jolie madame", "Photo de jolie madame", "https://img.freepik.com/photos-premium/paysage-panoramique-au-lever-du-soleil_335224-1307.jpg?w=1380", 1, 6);

INSERT INTO artwork(title, description, picture, category_id, user_id) VALUES
("Coucher de soleil", "Un magnifique coucher de soleil sur la plage", "https://img.freepik.com/photos-gratuite/coucher-soleil-tour-eiffel-paris_181624-22712.jpg?size=626&ext=jpg", 3, 10),
("Ville la nuit", "Vue aérienne d'une ville illuminée la nuit", "https://img.freepik.com/photos-gratuite/vue-aerienne-ville-illuminations-nuit_181624-13831.jpg?size=626&ext=jpg", 4, 3),
("Paysage montagneux", "Paysage montagneux avec un lac au premier plan", "https://img.freepik.com/photos-gratuite/vue-montagnes-lac-contre-ciel-bleu_181624-20597.jpg?size=626&ext=jpg", 1, 4),
("Forêt en automne", "Forêt avec feuillage automnal", "https://img.freepik.com/photos-gratuite/foret-avec-arbres-automne_181624-14110.jpg?size=626&ext=jpg", 5, 5),
("Forêt en automne", "Forêt avec feuillage automnal", "https://img.freepik.com/photos-gratuite/foret-avec-arbres-automne_181624-14110.jpg?size=626&ext=jpg", 5, 1);

CREATE TABLE event (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  picture text NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_artwork (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  event_id INT NOT NULL,
  artwork_id INT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
  FOREIGN KEY (artwork_id) REFERENCES artwork(id) ON DELETE CASCADE
);

INSERT INTO event(title, description, picture, start_date, end_date, location) VALUES
("Exposition d'art 1", "Exposition d'art moderne", "https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-03-15", "2025-03-20", "Paris"),
("Exposition d'art 2", "Exposition d'art ancien","https://images.pexels.com/photos/631339/pexels-photo-631339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-04-01", "2025-04-05", "En Ligne"),
("Exposition d'art 3", "Exposition d'art contemporain","https://images.pexels.com/photos/2215609/pexels-photo-2215609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-04-15", "2025-04-20", "Reims"),
("Exposition d'art 4", "Exposition d'art street art","https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-05-01", "2025-05-05", "Marseille"),
("Exposition d'art 5", "Exposition d'art web","https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-05-15", "2025-05-20", "En Ligne"),
("Exposition SUPP3", "Exposition d'art abstrait", "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-03-11", "2025-03-23", "Lille"),
("Exposition SUPP2", "Exposition d'art abstrait", "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-03-11", "2025-03-22", "Lille"),
("Exposition SUPP1", "Exposition d'art abstrait", "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-03-11", "2025-03-21", "Lille"),
("Exposition SUPP4", "Exposition d'art abstrait", "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-03-11", "2025-03-20", "Lille"),
("Exposition d'art 6", "Exposition d'art abstrait", "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "2025-03-11", "2025-03-19", "Lille");


INSERT INTO event_artwork(event_id, artwork_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10),
(6, 11);

CREATE TABLE likes (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  artwork_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (artwork_id) REFERENCES artwork(id) ON DELETE CASCADE
);

INSERT INTO likes(user_id, artwork_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1);

CREATE TABLE comment (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  artwork_id INT NOT NULL,
  comment_text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (artwork_id) REFERENCES artwork(id) ON DELETE CASCADE
);