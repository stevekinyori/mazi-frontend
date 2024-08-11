import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { UserContext } from './helpers';
import ErrorBoundary from './components/ErrorBoundary';
import AuthGuard from './components/AuthGuard';
import { UserState } from './interfaces';
import { useInitializeAuthMutation } from './queries';
import FullScreenLoader from './components/shared/FullScreenLoader';

const IndexPage = lazy(() => import('./pages'));
const DashboardIndexPage = lazy(() => import('./pages/dashboard'));
const DashboardPage = lazy(() => import('./pages/dashboard/dashboard'));
const Devices = lazy(() => import('./pages/dashboard/device'));

export default function App() {
  const [user, setUser] = useState<UserState>({
    initialized: true,
    authenticated: false,
  });

  const userContextProps = useMemo(
    () => ({
      user,
      setUser(args) {
        setUser((current) => ({
          ...current,
          ...args,
        }));
      },
    }),
    [user, setUser]
  );

  const verifyLoginMutation = useInitializeAuthMutation({
    onError() {},
    onSuccess(userData) {
      setUser({
        ...userData,
        initialized: true,
      });
    },
  });

  useEffect(() => {
    verifyLoginMutation.mutate({});
  }, []);

  if (!user.initialized) {
    return (
      <div>
        <FullScreenLoader />
      </div>
    );
  }

  return (
    <div className="max-w-[1800px] mx-auto">
      <UserContext.Provider value={userContextProps}>
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<FullScreenLoader />}>
              <Routes>
                <Route element={<AuthGuard />}>
                  <Route path="*" element={<Navigate to="/" replace />} />
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/dashboard" element={<DashboardIndexPage />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="device/:deviceId" element={<Devices />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
