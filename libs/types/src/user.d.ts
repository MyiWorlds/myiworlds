export type LoggedInUser = GuestUser | User;

export interface User {
  id: string;
  email: string;
  photoURL: string | null;
}

export interface GuestUser extends User {
  id: null;
}
