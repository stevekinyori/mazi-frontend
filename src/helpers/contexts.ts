import React, { createContext } from 'react';

import { UserState } from '../interfaces';

export const UserContext = React.createContext({
  user: {} as UserState,
  setUser(user: UserState) {
    this.user = Object.assign(this.user, user);
  },
});
interface AppContextProps {
  contentLoaded: any;
}

export const AppContext = createContext<AppContextProps>({
  contentLoaded: null,
});