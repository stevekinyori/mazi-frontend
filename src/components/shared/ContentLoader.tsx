import React from 'react';

import Loader from '../../assets/loader.svg';

export default function ContentLoader() {
  return (
    <div className="flex flex-col bg-white py-s-8 rounded-md">
      <div className="flex justify-center mb-s-3">
        <img src={Loader} className="h-16 w-auto" alt="Loader" />
      </div>

      <div className="text-center text-2xl pl-s-2">Loading data...</div>
    </div>
  );
}
