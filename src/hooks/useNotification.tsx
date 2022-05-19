import { useQuery } from 'react-query';
import { getAllNotification } from '../api/notification';

export function useGetNotifilcation(enabled = false) {
  const { data: notification, refetch: refetchNotification } = useQuery<any>('notifications', getAllNotification, { enabled });
  return { notification, refetchNotification };
}