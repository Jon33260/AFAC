-- SQLBook: Code
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255) DEFAULT "https://ih1.redbubble.net/image.1380092756.9137/raf,360x360,075,t,fafafa:ca443f4786.jpg",
  following INT DEFAULT 0,
  followers INT DEFAULT 0, 
  bio TEXT DEFAULT NULL,
  portfolio VARCHAR(255) DEFAULT NULL,
  website VARCHAR(255) DEFAULT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

-- le mdp est mdpAFAC@91
INSERT INTO user(username, email, hashed_password, profile_picture, following, followers, bio, portfolio, website, is_admin) VALUES
("Admin", "test@test.fr", "$argon2id$v=19$m=19456,t=2,p=1$Yme1gkTMwKkLvuW6KJwRLg$qUpg5FadAxfwrS1pTA8wHiEEq/7TvRBY/Yi8y4BT2J0", "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png", 150, 230, "Développeur passionné par le web et les nouvelles technologies.", "https://johndoe.dev", "https://instagram.com/johndoe", TRUE),
("User02", "user02@test.fr", "$argon2id$v=19$m=19456,t=2,p=1$Yme1gkTMwKkLvuW6KJwRLg$qUpg5FadAxfwrS1pTA8wHiEEq/7TvRBY/Yi8y4BT2J0", "https://cdn.pixabay.com/photo/2021/02/07/19/52/pikachu-5992504_960_720.png", 150, 230, "Je suis un utilisateur", "https://johndoe.dev", "https://instagram.com/johndoe", FALSE);

INSERT INTO user(username, email, hashed_password, following, followers, bio, portfolio, website, is_admin) VALUES
("Clément PICASSO", "test3@test.fr", "123456", 150, 230, "I am a digital artist and photographer capturing the beauty of Earth's diverse landscapes. Through photography and digital art, I blend reality and imagination to create immersive scenes that highlight nature's depth, light, and atmosphere, inviting viewers to explore the world through a new lens.", "https://johndoe.dev", "https://instagram.com/johndoe", FALSE),
("Admin", "admin@test.fr", "123456",0,0,NULL,NULL,NULL, FALSE),
("Alice", "alice@example.com", "password1",0,0,NULL,NULL,NULL, FALSE),
("Bob", "bob@example.com", "password2",0,0,NULL,NULL,NULL, FALSE),
("Charlie", "charlie@example.com", "password3",0,0,NULL,NULL,NULL, FALSE),
("David", "david@example.com", "password4",0,0,NULL,NULL,NULL, FALSE),
("Emma", "emma@example.com", "password5",0,0,NULL,NULL,NULL, FALSE);

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
("Beauty at home", "Un jeune cadre dynamique", "https://img.freepik.com/free-photo/dark-photo-frame-plant-arrangement_23-2149454943.jpg?t=st=1742312941~exp=1742316541~hmac=c29b8c8e6b7832f9ab1b1aa89f0a14cae521444e547f9f62069ccfdb0ef33092&w=740", 5, 3),
("La Brume", "Foret de Liege", "https://img.freepik.com/free-photo/high-angle-shot-beautiful-forest-with-lot-green-trees-enveloped-fog-new-zealand_181624-19717.jpg?t=st=1742313110~exp=1742316710~hmac=4fa035a1ee4755062d0b3e3e5b6831eed85d0cbab24fc7638abaf3e2fe6a768c&w=996", 4, 8),
("Le Mont AFAC", "Il faut trouver un meilleur nom", "https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?t=st=1742313197~exp=1742316797~hmac=f3d01c3fcdbd370d20a08694643440b4dd7727e77996a8aa9beca2527ba00ed7&w=996", 1, 6),
("Cyprien ?", "On dirait Cyprien", "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?t=st=1742312962~exp=1742316562~hmac=eb6a3bb7d70f529f2dc6d8de71256eda7d2c1a226b5a39c277403b5274b3160e&w=996", 5, 2),
("La tablette a données", "C'est juste des données", "https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169851.jpg?t=st=1742313233~exp=1742316833~hmac=6bda573289d023cd124e24af89729def28ab9b9a604530b1ba788e1b55c53c46&w=740", 4, 9),
("Le voyage Jaune", "C'est tres jaune", "https://img.freepik.com/free-photo/beautiful-collage-travel-concept_23-2149232169.jpg?t=st=1742312770~exp=1742316370~hmac=3c1e90d214ee948add986901444b04ce8f89ac7b9a93e95faf882405ef32f20f&w=740", 1, 5),
("ON M'ENTENDS ?", "Love Love ALLO", "https://img.freepik.com/free-photo/social-media-concept-composition_23-2150169142.jpg?t=st=1742313435~exp=1742317035~hmac=d94658d33e59af0e0ded3f7d080421b432e456c62ac53a34332a2e69b2102921&w=826", 2, 3),
("La plage", "Il fait chaud !", "https://img.freepik.com/free-photo/beach-composition-with-blank-space-text_24837-240.jpg?t=st=1742313631~exp=1742317231~hmac=a39cfba964c5e54673e4896a1a5b4f5dcebfc88e49d378d150c451951a3e0744&w=740", 1, 9),
("Jolie madame", "Photo de jolie madame", "https://img.freepik.com/photos-gratuite/portrait-personne-assistant-soiree-musique-techno-dynamique_23-2150551577.jpg?t=st=1739959194~exp=1739962794~hmac=d503fde15dc3a3574e390ea38cd78836e14db1485751c3a61fa27d20240fbd43&w=1380", 3, 6),
("Les couleurs nutritifs", "Miam Miam", "https://img.freepik.com/free-photo/buddha-bowl-dish-with-vegetables-legumes-top-view_1150-42589.jpg?t=st=1742313023~exp=1742316623~hmac=f9fa592c6801bb63c67b81592fa55e8efbb7451ac134da9c89d5b2eab98442e9&w=996", 3, 2),
("Fleur Rose", "Une jolie fleur rose", "https://img.freepik.com/free-photo/8-march-lettering-with-copy-space_23-2148418771.jpg?t=st=1742312879~exp=1742316479~hmac=0e7d136011ff2d38433e1b72c2347a118e04aa5cf66c263d945ad79a1645b7c5&w=740", 5, 2),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 5, 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", 4, 3),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 3, 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", 2, 3),
("Masque de Carnval", "Un magnifique masque de carnaval sur fond jaune", "https://img.freepik.com/photos-gratuite/masque-elegant-perles-carnaval-mystere-plat_23-2148756051.jpg?t=st=1739958827~exp=1739962427~hmac=c407cabd4d0cc3dfa973f29cfdfb5a03180840dc1a8a0afcc30ab42d812316f0&w=1380", 1, 2),
("Server", "Data center", "https://img.freepik.com/photos-gratuite/salle-hub-racks-serveurs-donnees-centre-informatique-big-data-interieur-bleu-pour-hebergement-materiel-stockage_90220-1033.jpg?t=st=1739958956~exp=1739962556~hmac=9898e2dd0229fdacffa7478b45fa8aa573156cefb3fdceb6ddc87a5ded8a7117&w=740", 6, 3),
("Foret", "Jolie foret", "https://img.freepik.com/photos-premium/arbres-qui-poussent-dans-foret_1048944-30368869.jpg?w=1380", 5, 4),
("Ecureuil", "Un petit ecureuil qui prend la pose", "https://img.freepik.com/photos-premium/close-up-ecureuil-poteau-bois_1048944-30370286.jpg?w=1380", 2, 5),
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
  picture text DEFAULT NULL,
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

INSERT INTO comment(user_id, artwork_id, comment_text) VALUES
(1, 1, "Superbe oeuvre !"),
(2, 1, "Merci pour votre commentaire !"),
(3, 1, "Je suis très content de cette oeuvre !"),
(4, 1, "Merci pour votre commentaire !"),
(5, 1, "Je suis très content de cette oeuvre !");