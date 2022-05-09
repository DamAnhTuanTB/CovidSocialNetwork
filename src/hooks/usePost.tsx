import { getDetailPost, getListCommentPost, getListMyPost, getListPost } from '../api/post';
import { useQuery } from 'react-query';

export function useGetListPost(paramSearch: any) {
    const { data: dataPost, isLoading: isLoadingPost } = useQuery<any>(['posts', {params: paramSearch}], () => getListPost(paramSearch));
    return { dataPost, isLoadingPost };
}

export function useGetListMyPost(paramSearch: any) {
    const { data: dataPost, refetch: refetchPost, isLoading: isLoadingPost, isFetching: isFetchingPost } = useQuery<any>(['my-posts', {param: paramSearch}], getListMyPost);
    return { dataPost, refetchPost, isLoadingPost, isFetchingPost };
}

export function useGetListOtherPost(paramSearch: any) {
    const { data: dataPostOther, refetch: refetchPostOther, isLoading: isLoadingPostOther, isFetching: isFetchingPostOther } = useQuery<any>(['other-posts', {param: paramSearch}], getListMyPost);
    return { dataPostOther, refetchPostOther, isLoadingPostOther, isFetchingPostOther };
}

export function useGetDetailPost(idPost: any) {
    const { data: dataDetailPost, refetch: refetchDetailPost, isLoading: isLoadingDetailPost, isFetching: isFetchingDetailPost } = useQuery<any>(['detail-post', {id: idPost}], () => getDetailPost(idPost));
    return { dataDetailPost, refetchDetailPost, isLoadingDetailPost, isFetchingDetailPost };
}

export function useGetListCommentPost(idPost: any) {
    const { data: dataCommentPost, refetch: refetchCommentPost, isLoading: isLoadingCommentPost, isFetching: isFetchingCommentPost } = useQuery<any>(['comments-post', {id: idPost}], () => getListCommentPost({idPost: idPost}));
    return { dataCommentPost, refetchCommentPost, isLoadingCommentPost, isFetchingCommentPost };
}