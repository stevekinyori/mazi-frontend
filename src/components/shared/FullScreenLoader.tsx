import React from 'react';

import AppLoader from './AppLoader';

export default function FullScreenLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen h-max">
      <AppLoader />
    </div>
  );
}
