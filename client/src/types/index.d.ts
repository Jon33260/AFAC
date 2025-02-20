interface Artwork {
  id: number;
  title: string;
  description: string;
  picture: string;
  category: string;
  user_id: number;
}

interface Artworks {
  artworks: Artwork[];
}

interface UserTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
