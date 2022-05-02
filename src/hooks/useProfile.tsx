import { getProfile, getProfileOther } from '../api/profile';
import { useQuery } from 'react-query';

export function useGetProfile(enabled = false) {
  const { data: profile, refetch: refetchProfile } = useQuery<any>('profile', getProfile, { enabled });
  return { profile, refetchProfile };
}

export function useGetProfileOther(id_user: any) {
  const { data: profileOtherData, refetch: refetchProfileOther, isError, isLoadingError } = useQuery<any>(['profile', {id: id_user}], getProfileOther);
  return { profileOtherData, refetchProfileOther, isError, isLoadingError };
}
