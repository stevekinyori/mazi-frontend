import React from 'react';

export default function GrowthIndicator({ direction }: { direction: 'up' | 'down' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d={direction === 'down' ? 'M3 7L9 13L13 9L21 17H15M21 11V14' : 'M3 17L9 11L13 15L21 7V13M15 7H18'}
        stroke={direction === 'up' ? '#5cb85c' : '#d95350'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
