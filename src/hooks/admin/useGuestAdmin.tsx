import { useQuery } from 'react-query';
import { getDetailPatient, getListGuest, getListImageByIdGuest } from '../../api/admin/guest-management';

export function useGetListGuest(paramSearch: any) {
    const { data: dataGuest, isLoading: isLoadingGuest } = useQuery<any>(['admin-all-guests', {params: paramSearch}], () => getListGuest(paramSearch));
    return { dataGuest, isLoadingGuest };
}

export function useGetListImageByIdGuest(idUser: any) {
  const { data: dataListImageGuest, isLoading: isLoadingListImageGuest } = useQuery<any>(['admin-list-images-guest', idUser], () => getListImageByIdGuest(idUser), { enabled: !!idUser });
  return { dataListImageGuest, isLoadingListImageGuest };
}

export function useGetDetailPatient(idPatient: any) {
  const { data: detailPatient, isLoading: isLoadingDetailPatient } = useQuery<any>(['admin-all-experts', {idPatient: idPatient}], () => getDetailPatient(idPatient), {enabled: !!idPatient});
  return { detailPatient, isLoadingDetailPatient };
}