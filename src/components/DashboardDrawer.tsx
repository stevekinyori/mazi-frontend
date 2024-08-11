import React, { useContext } from 'react';
import { Button, Drawer, Menu } from 'antd';
import CloseFillIcon from 'remixicon-react/CloseFillIcon';
import LogoutBoxRLineIcon from 'remixicon-react/LogoutBoxRLineIcon';

import { UserContext } from '../helpers';

import type { MenuItem } from './DashboardNavigation';

interface AppDrawerParams {
  open: boolean;
  menuItems: MenuItem[];
  selectedMenuItems: string[];
  close: () => void;
  logout: () => void;
}

export default function DashboardDrawer({ open, menuItems, selectedMenuItems, close, logout }: AppDrawerParams) {
  const { user } = useContext(UserContext);

  return (
    <Drawer
      placement="left"
      width={300}
      open={open}
      onClose={close}
      headerStyle={{ display: 'none' }}
      bodyStyle={{
        position: 'relative',
        padding: '0',
      }}
    >
      <button className="absolute right-1 top-1 p-s-0.5 z-10" onClick={close} data-testid="close-drawer-btn">
        <CloseFillIcon className="fill-gray-400" />
      </button>

      <div className="flex flex-col justify-between h-full">
        <div>
          <div
            className="flex justify-center py-6 relative before:content-[''] before:absolute before:h-0.5
                before:bottom-0 before:inset-x-[15%] before:bg-gray-200"
          >
            <img src="/img/sote_logo.svg" alt="MaziMob" className="w-1/2" />
          </div>

          <Menu
            selectedKeys={selectedMenuItems}
            mode="inline"
            theme="light"
            className="mt-s-2 px-s-3"
            items={menuItems}
          />
        </div>

        <div className="mb-s-3">
          <div className="w-full h-px bg-gray-300 mb-s-1" />

          <div className="flex justify-center">
            <img
              src="https://www.mazimobility.com/images/mazi_logo.png"
              alt="-"
              className="mr-s-2 w-12 h-12 rounded-full border-2 border-gray-300 p-s-0.5"
            />
          </div>

          <div className="mb-s-2 text-center">
            <p>
              {`${user.first_name} ${user.last_name}`.trim()}
              <span className="text-lg inline-block mx-s-1">&#x7c;</span>
            </p>
            <p className="text-md text-gray-500">{user.email}</p>
          </div>

          <div className="flex justify-center">
            <Button
              size="large"
              className="flex items-center fill-gray-500 hover:fill-brand-orange transition duration-300 px-s-4 rounded"
              onClick={logout}
            >
              Logout
              <LogoutBoxRLineIcon className="inline-block ml-s-2 fill-inherit" />
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
