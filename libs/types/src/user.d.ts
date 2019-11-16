export type LoggedInUser = GuestUser | User;

export interface User {
  id: string;
  email: string;
}

export interface GuestUser {
  id: null;
  email: string;
}
