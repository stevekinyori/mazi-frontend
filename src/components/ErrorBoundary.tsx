import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RefreshLineIcon from 'remixicon-react/RefreshLineIcon';
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon';
import ArrowUpLineIcon from 'remixicon-react/ArrowUpSLineIcon';

import { useTitle } from '../helpers';
import { useLogoutMutation } from '../queries';

function ErrorDisplay({ error, hasError, children }: PropsWithChildren<{ error: Error; hasError: boolean }>) {
  useTitle('Ooops!', hasError);

  const navigate = useNavigate();

  const [refreshCount, setRefreshCount] = useState(Number(localStorage.getItem('refreshCount')) || 0);

  const [showError, setShowError] = useState(false);

  const logoutMutation = useLogoutMutation({
    onError() {},
    onSuccess() {
      localStorage.clear();
    },
  });

  const handleRefresh = () => {
    if (refreshCount >= 1) {
      logoutMutation.mutate();
      navigate('/');
      window.location.reload();
    } else {
      window.location.reload();
    }

    setRefreshCount(refreshCount + 1);
  };

  useEffect(() => {
    localStorage.setItem('refreshCount', String(refreshCount));
  }, [refreshCount]);

  if (hasError) {
    return (
      <div className="flex h-screen">
        <div className="m-auto rounded-lg bg-white">
          <div className="bg-[url('/img/sote_logo.svg')] mx-auto mb-s-3 w-[130px] h-[30.5px]" />
          <p className="text-sm text-center font-semibold uppercase my-s-1 text-sky-600">Unexpected Error</p>
          <h1 className="text-5xl text-center font-bold text-[#273253]">Oops!</h1>
          <p className="text-lg font-normal my-s-1 text-[#3B506E]">
            Sorry, we had an unexpected error while processing your request.
          </p>
          <div>
            <div className="text-base pb-s-1 mt-s-1 text-sky-600" onClick={() => setShowError(!showError)}>
              {showError ? (
                <span className="inline-flex justify-center">
                  Close error
                  <ArrowUpLineIcon className="ml-s-2" />
                </span>
              ) : (
                <span className="inline-flex justify-center py-s-1">
                  Show More <ArrowDownSLineIcon className="ml-s-2" />
                </span>
              )}
            </div>
            {showError && error && (
              <div className="pb-s-1">
                <p className="text-gray-500 italic border border-gray-300 p-s-1">TypeError: {error?.message}</p>
              </div>
            )}
          </div>

          <button
            className="inline-flex justify-center px-s-2 py-s-1 mr-s-1 mt-s-1 w-44 rounded-md border border-transparent
              cursor-pointer bg-sky-600 text-white"
            onClick={handleRefresh}
          >
            Refresh
            <RefreshLineIcon className="ml-s-2" />
          </button>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}

export default class ErrorBoundary extends React.Component<PropsWithChildren, any> {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
      hasError: true,
    });
  }

  render() {
    const { error, hasError } = this.state;
    const { children } = this.props;

    return (
      <ErrorDisplay error={error} hasError={hasError}>
        {children}
      </ErrorDisplay>
    );
  }
}
