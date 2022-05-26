import { useQuery } from 'react-query';
import { getProfile, getProfileOther, getProfileOtherAdmin } from '../api/profile';

export function useGetProfile(enabled = false) {
  const { data: profile, refetch: refetchProfile } = useQuery<any>('profile', getProfile, { enabled });
  return { profile, refetchProfile };
}

export function useGetProfileOther(id_user: any) {
  const { data: profileOtherData, refetch: refetchProfileOther, isError, isLoadingError } = useQuery<any>(['profile', { id: id_user }], getProfileOther, { enabled: !!id_user });
  return { profileOtherData, refetchProfileOther, isError, isLoadingError };
}
