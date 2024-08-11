import React, { PropsWithChildren, useMemo } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'small' | 'medium' | 'default';
  block?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: any) => void;
  loading?: boolean;
}

export default function Button({
  children,
  size,
  block,
  type,
  onClick,
  loading,
  ...otherProps
}: PropsWithChildren<ButtonProps>) {
  const btnSize = useMemo(() => {
    if (size === 'large') {
      return 'h-16 text-lg rounded-md';
    }

    if (size === 'medium') {
      return 'h-12 text-lg rounded-md';
    }

    if (size === 'small') {
      return 'h-8 text-sm rounded-sm';
    }

    return 'h-10 text-base rounded-sm';
  }, [size]);

  return (
    <button
      type={type || 'button'}
      className={`bg-indigo-500 ${btnSize} text-white font-semibold hover:bg-indigo-600 border-none shadow-none
        hover:shadow-md ${block ? 'w-full' : 'w-auto'} outline-none transition duration-300 px-4 disabled:bg-gray-300`}
      onClick={onClick}
      disabled={loading}
      {...otherProps}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
}
