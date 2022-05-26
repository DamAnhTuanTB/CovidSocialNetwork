import { useQuery } from 'react-query';
import { getProfileAdmin } from '../../api/admin/profile';
import { getProfileOtherAdmin } from '../../api/profile';

export function useGetProfileAdmin(enabled = false) {
  const { data: profileAdmin, refetch: refetchProfileAdmin } = useQuery<any>('get-profile-admin', getProfileAdmin, { enabled });
  return { profileAdmin, refetchProfileAdmin };
}

export function useGetProfileOtherAdmin(id_user: any) {
  const { data: profileOtherData, refetch: refetchProfileOther, isError, isLoadingError } = useQuery<any>(['profile', { id: id_user }], getProfileOtherAdmin, { enabled: !!id_user });
  return { profileOtherData, refetchProfileOther, isError, isLoadingError };
}