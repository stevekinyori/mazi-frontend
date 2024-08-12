import React, { useContext } from 'react';
import { Button, Menu } from 'antd';
import LogoutBoxRLineIcon from 'remixicon-react/LogoutBoxRLineIcon';

import { UserContext } from '../helpers';

import type { MenuItem } from './DashboardNavigation';

interface AppSidebarParams {
  menuItems: MenuItem[];
  selectedMenuItems: string[];
  logout: () => void;
}

export default function DashboardSidebar({ menuItems, selectedMenuItems, logout }: AppSidebarParams) {
  const { user } = useContext(UserContext);

  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-center py-s-4 border-b border-gray-200">
          <img src="/img/mazi_logo.svg" alt="MaziMob" className="w-1/2" />
        </div>

        <Menu
          selectedKeys={selectedMenuItems}
          mode="inline"
          theme="light"
          className="mt-s-2 px-s-3"
          items={menuItems}
        />
      </div>

      <div className="grid grid-cols-1 gap-y-s-3 mb-s-6">
        <div className="flex justify-center">
          <img src="https://www.mazimobility.com/images/mazi_logo.png" alt="-" className="mr-s-2 w-12 h-12 rounded-full border-2 border-gray-300 p-s-0.5" />
        </div>

        <div className="text-center">
          <p>
            {`${user.first_name} ${user.last_name}`.trim()}
            <span className="text-lg inline-block mx-s-1">&#x7c;</span>-
          </p>
          <p className="text-md text-gray-500">{user.email}</p>
        </div>

        <div className="flex justify-center">
          <Button
            size="large"
            className="flex items-center fill-gray-500 hover:fill-brand-orange transition
                    duration-300 px-s-4 rounded"
            onClick={logout}
          >
            Logout
            <LogoutBoxRLineIcon className="inline-block ml-s-2 fill-inherit" />
          </Button>
        </div>
      </div>
    </div>
  );
}
