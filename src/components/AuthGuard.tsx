import React, { useContext, useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { UserContext } from '../helpers';

export default function AuthGuard() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const redirectUrl = useMemo(() => {
    if (user.authenticated && !location.pathname.startsWith('/dashboard')) {
      return '/dashboard';
    }

    if (!user.authenticated && location.pathname.startsWith('/dashboard')) {
      return '/';
    }

    return null;
  }, [user, location]);

  if (redirectUrl) {
    return <Navigate to={redirectUrl} replace />;
  }

  return <Outlet />;
}
