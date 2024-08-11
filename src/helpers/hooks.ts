import { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import lodashDebounce from 'lodash.debounce';
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';

import { QueryArgs } from '../interfaces';
import { useLogoutMutation } from '../queries';

import { UserContext } from './contexts';
import { RouteSessionStorageKey } from './constants';

export function useTitle(title: string, hasError?: boolean) {
  const [activeTitle, setActiveTitle] = useState('MaziMob');

  useEffect(() => {
    document.title = `${hasError ? title : activeTitle} | MaziMob`;
  }, [hasError, activeTitle]);

  useEffect(() => {
    if (!/oops/i.test(title)) {
      setActiveTitle(title);
    }
  }, [title]);
}

export function useExcelData() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const readJsonFile = useCallback(async (filePath: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(filePath);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (err) {
      setError('Error loading the JSON file');
      console.error(err);
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    error,
    readJsonFile,
    isLoading,
  };
}

export function useDashboardState() {
  const [dashboardState, dispatchChange] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'content-loaded': {
          return {
            ...state,
            contentLoaded: action.payload,
          };
        }

        case 'active-company': {
          return {
            ...state,
            contentLoaded: state.contentLoaded || true,
            activeCompany: action.payload,
          };
        }

        case 'app-drawer': {
          return {
            ...state,
            drawerOpen: action.payload,
          };
        }

        case 'selected-tab': {
          return {
            ...state,
            selectedTab: action.payload,
          };
        }

        default: {
          return state;
        }
      }
    },
    {
      activeCompany: null,
      contentLoaded: false,
      drawerOpen: false,
      selectedTab: '1',
    }
  );

  return {
    dashboardState,
    dispatchChange,
  };
}

export function useDashboardHeaderInit({ filter }: { funderData: any; filter: string }) {
  const [, setSearch] = useState(filter);

  const updateSearch = useMemo(() => lodashDebounce(setSearch, 500), []);

  useEffect(() => {
    updateSearch(filter);
  }, [filter]);
}

export function useHandleDashboardError({ onError }: Pick<QueryArgs, 'onError'>) {
  const loc = useLocation();

  const hasRun = useRef(false);

  const { setUser } = useContext(UserContext);

  const logoutMutation = useLogoutMutation({
    onError: () => {},
    onSuccess: () => {},
  });

  return function handleError(...args: any[]) {
    if (hasRun.current) {
      return;
    }

    hasRun.current = true;

    const storageKey = 'auth-modal';

    const authModal = localStorage.getItem(storageKey);

    if (
      (args[0].response?.status === 401 ||
        /permission/.test(args[0].response?.data?.error?.type) ||
        /401/.test(args[0].message)) &&
      !authModal
    ) {
      localStorage.setItem(storageKey, '0');

      Modal.warning({
        title: 'Auth session expired or invalid',
        content: 'You have been logged out due to inactivity. Please log in again to continue using the portal!',
        keyboard: false,
        okButtonProps: {
          className: 'bg-brand-orange/80 hover:bg-brand-orange',
        },
        onOk: () => {
          localStorage.removeItem(storageKey);
          localStorage.setItem(RouteSessionStorageKey, loc.pathname);

          logoutMutation.mutate();

          setUser({
            initialized: true,
            authenticated: false,
          });
        },
      });
    }

    onError(...args);
  };
}
