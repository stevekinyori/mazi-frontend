export interface UserState {
  user_id?: string;
  token?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  initialized: boolean;
  authenticated: boolean;
}
