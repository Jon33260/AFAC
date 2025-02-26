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

interface Event {
  event_id: number;
  event_title: string;
  event_description: string | null;
  start_date: string;
  end_date: string;
  location: string | null;
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
