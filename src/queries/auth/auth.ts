import { useMutation, useQueryClient } from 'react-query';

import { QueryArgs, UserState } from '../../interfaces';
import { loginUser } from '../../api';
import { UserStorageKey } from '../../helpers';

export const useInitializeAuthMutation = ({ onError, onSuccess }: QueryArgs) => {
  return useMutation({
    mutationFn: async () => {
      const user = localStorage.getItem(UserStorageKey);

      if (!user || (user && user.length === 0)) {
        return null;
      }

      const saved: UserState = JSON.parse(user || '');

      if (!saved) {
        return null;
      }

      const valid = saved.authenticated;

      if (!valid) {
        localStorage.removeItem(UserStorageKey);

        return null;
      }

      return saved;
    },
    onError,
    onSuccess(...args) {
      onSuccess(...args);
    },
  });
};

export const useLoginMutation = ({ onError, onSuccess }: QueryArgs) => {
  return useMutation({
    mutationFn: loginUser,
    onError(err: any) {
      onError(err.message ?? err.err.toString().replace(RegExp(`${err.err.name}:\\s*`), ''));
    },
    onSuccess(data) {
      if (data.authenticated) {
        localStorage.setItem(UserStorageKey, JSON.stringify(data));
      }

      onSuccess(data);
    },
  });
};

export const useLogoutMutation = ({ onError, onSuccess }: QueryArgs) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return true;
    },
    onError(err: any) {
      onError(err?.err.toString().replace(RegExp(`${err.err.name}:\\s*`), ''));
    },
    onSuccess() {
      localStorage.removeItem(UserStorageKey);

      queryClient.invalidateQueries({
        predicate: () => true,
      });

      onSuccess();
    },
  });
};
