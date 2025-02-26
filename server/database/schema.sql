CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT NULL,
  following INT not NULL,
  followers INT not NULL, 
  bio TEXT DEFAULT NULL,
  portfolio VARCHAR(255) DEFAULT NULL,
  website VARCHAR(255) DEFAULT NULL
);



INSERT INTO user(username, email, password, profile_picture, following, followers, bio, portfolio, website) VALUES
("Clément PICASSO", "test@test.fr", "123456", "", 150, 230, "I am a digital artist and photographer capturing the beauty of Earth's diverse landscapes. Through photography and digital art, I blend reality and imagination to create immersive scenes that highlight nature’s depth, light, and atmosphere, inviting viewers to explore the world through a new lens.", "https://johndoe.dev", "https://instagram.com/johndoe"),
("Admin", "admin@test.fr", "123456",NULL,0,0,NULL,NULL,NULL),
("Alice", "alice@example.com", "password1",NULL,0,0,NULL,NULL,NULL),
("Bob", "bob@example.com", "password2",NULL,0,0,NULL,NULL,NULL),
("Charlie", "charlie@example.com", "password3",NULL,0,0,NULL,NULL,NULL),
("David", "david@example.com", "password4",NULL,0,0,NULL,NULL,NULL),
("Emma", "emma@example.com", "password5",NULL,0,0,NULL,NULL,NULL);


CREATE TABLE artwork (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  picture text NOT NULL,
  category VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO artwork(title, description, picture, category, user_id) VALUES
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", "Peinture", 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", "Sculpture", 3),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", "Peinture", 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", "Sculpture", 3),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", "Peinture", 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", "Sculpture", 3),
("Foret", "Jolie foret", "https://img.freepik.com/photos-premium/arbres-qui-poussent-dans-foret_1048944-30368869.jpg?w=1380", "Graffiti", 4),
("Ecureuil", "Un petit ecureuil qui prend la pose", "https://img.freepik.com/photos-premium/close-up-ecureuil-poteau-bois_1048944-30370286.jpg?w=1380", "Dessin", 5),
("Jolie madame", "Photo de jolie madame", "https://img.freepik.com/photos-gratuite/portrait-personne-assistant-soiree-musique-techno-dynamique_23-2150551577.jpg?t=st=1739959194~exp=1739962794~hmac=d503fde15dc3a3574e390ea38cd78836e14db1485751c3a61fa27d20240fbd43&w=1380", "Photographie", 6),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", "Sculpture", 3),
("Jolie madame", "Photo de jolie madame", "https://img.freepik.com/photos-premium/paysage-panoramique-au-lever-du-soleil_335224-1307.jpg?w=1380", "Photographie", 6);