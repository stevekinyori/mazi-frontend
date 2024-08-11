import React, { useContext, useState } from 'react';
import { notification } from 'antd';

import { UserContext, useTitle } from '../helpers';
import Login from '../components/auth/Login';

export default function IndexPage() {
  useTitle('Login');

  const { user } = useContext(UserContext);

  const [forgotPass, setForgotPass] = useState(false);

  const validationFailed = () => {
    notification.warning({
      message: 'Input error',
      description: 'You have errors in your input, please rectify before trying again',
      key: '0',
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div
        className="w-full my-s-2 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 h-screen sm:h-auto px-s-2 py-s-6 bg-white
          rounded-md shadow border border-gray-200"
      >
        <div className="text-center">
          {/* <div className="my-s-4 flex justify-center">
            <img src="/img/sote_logo.svg" alt="MaziMob" className="h-10 w-auto" />
          </div> */}

          <h1 className="font-bold text-3xl text-slate-600 mb-s-1">Welcome to MaziMob</h1>
        </div>

        {!user.forcePasswordChange && !forgotPass && (
          <Login validationFailed={validationFailed} forgotPassword={() => setForgotPass(true)} />
        )}

        <p className="text-center">
          Version&nbsp;
          {process.env.VERSION}
        </p>
      </div>
    </div>
  );
}
