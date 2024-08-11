import React, { useContext, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuProps, notification } from 'antd';
import DashboardFillIcon from 'remixicon-react/DashboardFillIcon';
import DashboardLineIcon from 'remixicon-react/DashboardLineIcon';

import { UserContext } from '../helpers';
import { useLogoutMutation } from '../queries';

import DashboardDrawer from './DashboardDrawer';
import DashboardSidebar from './DashboardSidebar';

export type MenuItem = Required<MenuProps>['items'][number];

export type MenuItemArgs = {
  label: React.ReactNode;
  key: React.Key;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  children?: MenuItem[];
  type?: 'group';
  active: boolean;
  onClick?: () => void;
};

function getMenuItem({
  label,
  key,
  activeIcon,
  inactiveIcon,
  children,
  type,
  active,
  onClick,
}: MenuItemArgs): MenuItem {
  return {
    key,
    icon: active ? activeIcon : inactiveIcon,
    children,
    label,
    type,
    className: [
      'm-0 rounde w-full py-4 my-s-1',
      active ? 'font-extrabold text-brand-orange' : 'text-gray-500 font-medium',
    ].join(' '),
    onClick,
  } as MenuItem;
}

interface AppNavigationParams {
  drawerOpen?: boolean;
  closeDrawer?: () => void;
}

export default function DashboardNavigation({
  drawerOpen,
  closeDrawer,
}: AppNavigationParams) {
  const { setUser } = useContext(UserContext);

  const nav = useLocation();

  const selectedMenuItems = useMemo(() => {
    if (nav.pathname === '/dashboard') {
      return ['dashboard'];
    }

    return [nav.pathname.split('/')[2]];
  }, [nav]);

  const menuItems: MenuProps['items'] = [
    getMenuItem({
      label: <Link to="/dashboard">Dashboard</Link>,
      key: 'dashboard',
      activeIcon: <DashboardFillIcon className="fill-brand-orange" />,
      inactiveIcon: <DashboardLineIcon />,
      active: true,
    }),
  ];

  const logoutMutation = useLogoutMutation({
    onError(message) {
      notification.warning({
        message: 'Logout failed',
        description: message,
        key: '0',
      });
    },
    onSuccess() {
      setUser({
        initialized: true,
        authenticated: false,
      });
    },
  });

  if (typeof drawerOpen !== 'undefined' && typeof closeDrawer !== 'undefined') {
    return (
      <DashboardDrawer
        open={drawerOpen}
        close={closeDrawer}
        menuItems={menuItems}
        selectedMenuItems={selectedMenuItems}
        logout={logoutMutation.mutate}
      />
    );
  }

  return (
    <DashboardSidebar
      menuItems={menuItems}
      selectedMenuItems={selectedMenuItems}
      logout={logoutMutation.mutate}
    />
  );
}
