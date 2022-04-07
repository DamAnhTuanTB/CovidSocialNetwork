import { getProfile } from '../api/profile';
import { useQuery } from 'react-query';

export function useGetProfile(enabled = false) {
  const { data: profile, refetch: refetchProfile } = useQuery<any>('profile', getProfile, { enabled });
  return { profile, refetchProfile };
}
