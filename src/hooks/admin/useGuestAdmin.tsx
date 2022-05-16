import { useQuery } from 'react-query';
import { getListGuest, getListImageByIdGuest } from '../../api/admin/guest-management';

export function useGetListGuest(paramSearch: any) {
    const { data: dataGuest, isLoading: isLoadingGuest } = useQuery<any>(['admin-all-guests', {params: paramSearch}], () => getListGuest(paramSearch));
    return { dataGuest, isLoadingGuest };
}

export function useGetListImageByIdGuest(idUser: any) {
  const { data: dataListImageGuest, isLoading: isLoadingListImageGuest } = useQuery<any>(['admin-list-images-guest', idUser], () => getListImageByIdGuest(idUser), { enabled: !!idUser });
  return { dataListImageGuest, isLoadingListImageGuest };
}