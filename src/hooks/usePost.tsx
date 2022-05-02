import { getListMyPost, getListPost } from '../api/post';
import { useQuery } from 'react-query';

export function useGetListPost() {
    const { data } = useQuery<any>('profile', getListPost);
    return { data };
}

export function useGetListMyPost(paramSearch: any) {
    const { data: dataPost, refetch: refetchPost, isLoading: isLoadingPost } = useQuery<any>(['my-posts', {param: paramSearch}], getListMyPost);
    return { dataPost, refetchPost, isLoadingPost };
}