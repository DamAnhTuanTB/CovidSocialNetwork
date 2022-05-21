import { useQuery } from "react-query";
import { getListImageOther, getMyListImage } from "../api/profile";

export function useGetListImageOther(idUser: any) {
  const { data: dataListImageOther, isLoading: isLoadingListImageOther } = useQuery<any>(['list-images-other', idUser], () => getListImageOther(idUser), { enabled: !!idUser });
  return { dataListImageOther, isLoadingListImageOther };
}

export function useGetMyListImage(enabled = false) {
  const { data: dataListMyImage, refetch: isLoadingListMyImage } = useQuery<any>('my-list-image', getMyListImage, { enabled });
  return { dataListMyImage, isLoadingListMyImage };
}