import React from 'react';

import Loader from '../../assets/sote-loader.svg';

export default function AppLoader({ message, small }: { message?: string; small?: boolean }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-s-3">
        <img src={Loader} className={`${small ? 'h-10' : 'h-16'} w-auto`} alt="Loader" />
      </div>

      <div className={`text-center ${small ? 'text-lg' : 'text-2xl font-medium'} pl-s-2`}>
        {message ?? 'Just a moment'}...
      </div>
    </div>
  );
}
