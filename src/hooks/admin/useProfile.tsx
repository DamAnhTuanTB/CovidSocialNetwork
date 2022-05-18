import { useQuery } from 'react-query';
import { getProfileAdmin } from '../../api/admin/profile';

export function useGetProfileAdmin(enabled = false) {
  const { data: profileAdmin, refetch: refetchProfileAdmin } = useQuery<any>('get-profile-admin', getProfileAdmin, { enabled });
  return { profileAdmin, refetchProfileAdmin };
}
