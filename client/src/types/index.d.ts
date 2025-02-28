interface Artwork {
  id: number;
  title: string;
  description: string;
  picture: string;
  category: string;
  user_id: number;
  username: string;
}

interface Artworks {
  artworks: Artwork[];
}

interface UserData {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_picture: string | null;
  following: number;
  followers: number;
  bio: string | null;
  portfolio: string | null;
  website: string | null;
}

interface UserTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface propsFormTypes {
  user: UserTypes;
  handleChangeForm: React.ChangeEventHandler<HTMLInputElement>;
}

interface Category {
  name: string;
}

interface LoaderDataHome {
  artworks: Artwork[];
  category: Category[];
}

interface HeaderProps {
  setFilteredImages: (artworks: Artwork[]) => void;
  artworks: Artwork[];
  category: Category[];
}
