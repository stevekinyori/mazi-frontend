import { useMutation } from 'react-query';
import { QueryArgs } from '../../interfaces';
import { fetchDeviceData, fetchDeviceSummary, fetchItems, filterByDeviceId, postMessageToSQS } from '../../api';

export const useFetchDeviceDataMutation = ({ onError, onSuccess }: QueryArgs) => {
  return useMutation({
    mutationFn: (deviceId: string) => fetchDeviceData(deviceId),
    onError(err: any) {
      onError(err.message ?? err.toString());
    },
    onSuccess(data) {
      onSuccess(data);
    },
  });
};

export const useFetchDeviceSummaryMutation = ({ onError, onSuccess }: QueryArgs) => {
  return useMutation({
    mutationFn: fetchDeviceSummary,
    onError(err: any) {
      onError(err.message ?? err.toString());
    },
    onSuccess(data) {
      onSuccess(data);
    },
  });
};

export const usePostMessageToSQSMutation = ({ onError, onSuccess }: QueryArgs) => {
  return useMutation({
    mutationFn: (payload: any) => postMessageToSQS(payload),
    onError(err: any) {
      onError(err.message ?? err.toString());
    },
    onSuccess(data) {
      onSuccess(data);
    },
  });
};

export const useFetchItemsMutation = ({ onError, onSuccess }: QueryArgs) => {
  return useMutation({
    mutationFn: fetchItems,
    onError(err: any) {
      onError(err.message ?? err.toString());
    },
    onSuccess(data) {
      onSuccess(data);
    },
  });
};
export const useFilterByDeviceIdMutation = ({ onError, onSuccess }: QueryArgs) => {
  return useMutation({
    mutationFn: (deviceId: string) => filterByDeviceId(deviceId),
    onError(err: any) {
      onError(err.message ?? err.toString());
    },
    onSuccess(data) {
      onSuccess(data);
    },
  });
};
