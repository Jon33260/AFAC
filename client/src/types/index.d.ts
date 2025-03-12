interface Artwork {
  likes: number;
  liked: boolean;
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

interface ProfilePictureProps {
  artworks: Artwork[];
  userData: UserData;
}

interface ProfileData {
  user: UserData;
  artworks: Artwork[];
}

interface Event {
  event_id: number;
  event_title: string;
  event_description: string | null;
  start_date: string;
  end_date: string;
  location: string | null;
  picture: string;
  artists: string | null;
}

type Events = Event[];

interface EventArtwork {
  id: number;
  event_id: number;
  artwork_id: number;
}
interface LoaderEvents {
  currentEvents: Events;
  upcomingEvents: Events;
}

interface CredentialsTypes {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}
