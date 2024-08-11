import HomeLineIcon from 'remixicon-react/HomeLineIcon';
import UserLineIcon from 'remixicon-react/UserLineIcon';
import { Link, useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../queries';

import Button from './shared/Button';

export default function DashboardHeader() {
  const nav = useNavigate();

  const logoutMutation = useLogoutMutation({
    onError: () => {},
    onSuccess: () => {
      nav('/');
      window.location.reload();
    },
  });

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto p-4">
          <a href="/" className="flex items-center space-x-3">
            <img src="https://www.mazimobility.com/images/mazi_logo.png" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MaziMob</span>
          </a>
          <div className="flex items-center space-x-6">
            <a href="tel:5541251234" className="text-sm text-gray-500 dark:text-white hover:underline">
              IoT Dashboard | Mazi Mobility
            </a>
            <Button
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => {
                logoutMutation.mutate();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
      <nav className="px-s-2 py-s-3 bg-gray-50 border-b border-gray-200 dark:bg-gray-700">
        <div className="px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 text-sm">
              <li>
                <Link to="/dashboard" className="flex items-center text-gray-900 dark:text-white hover:underline">
                  <HomeLineIcon className="w-5 h-5 mr-2" />
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
