export type LoggedInUser = GuestUser | User;

export interface User {
  id: string;
  email: string;
  photoURL: string | null;
  dateCreated: number;
  dateUpdated: number;
}

export interface GuestUser extends User {
  id: null;
}
