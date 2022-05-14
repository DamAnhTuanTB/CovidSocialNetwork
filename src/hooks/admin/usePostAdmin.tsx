import { getDetailPostAdmin, getListCommentPostAdmin, getListPostAdmin, getListPostByUserAdmin } from '../../api/admin/post';
import { useQuery } from 'react-query';

export function useGetListPostAdmin(paramSearch: any, enabled: any) {
    const { data: dataPost, isLoading: isLoadingPost } = useQuery<any>(['admin-all-posts', {params: paramSearch}], () => getListPostAdmin(paramSearch), { enabled: enabled });
    return { dataPost, isLoadingPost };
}

export function useGetListPostByUserAdmin(paramSearch: any, idUser: any) {
    const { data: dataPostByUser, refetch: refetchPostByUser, isLoading: isLoadingPostByUser, isFetching: isFetchingPostByUser } = useQuery<any>(['admin-all-post-user', {param: paramSearch}], () => getListPostByUserAdmin({...paramSearch, idUser: idUser}), { enabled: !!idUser });
    return { dataPostByUser, refetchPostByUser, isLoadingPostByUser, isFetchingPostByUser };
}

export function useGetDetailPostAdmin(idPost: any, isAdmin: any) {
    const { data: dataDetailPostAdmin, refetch: refetchDetailPostAdmin, isLoading: isLoadingDetailPostAdmin, isFetching: isFetchingDetailPostAdmin } = useQuery<any>(['admin-detail-post', {id: idPost}], () => getDetailPostAdmin(idPost), { enabled: (!!idPost && isAdmin) });
    return { dataDetailPostAdmin, refetchDetailPostAdmin, isLoadingDetailPostAdmin, isFetchingDetailPostAdmin };
}

export function useGetListCommentPostAdmin(idPost: any, isAdmin: any) {
    const { data: dataCommentPostAdmin, refetch: refetchCommentPostAdmin, isLoading: isLoadingCommentPostAdmin, isFetching: isFetchingCommentPostAdmin } = useQuery<any>(['admin-comments-post', {id: idPost}], () => getListCommentPostAdmin({idPost: idPost}), {enabled: (!!idPost && isAdmin)});
    return { dataCommentPostAdmin, refetchCommentPostAdmin, isLoadingCommentPostAdmin, isFetchingCommentPostAdmin };
}