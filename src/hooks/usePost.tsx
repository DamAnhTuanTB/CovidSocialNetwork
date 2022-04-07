import { getListPost } from '../api/post';
import { useQuery } from 'react-query';

export default function useGetListPost() {
    const { data } = useQuery<any>('profile', getListPost);
    return { data };
}
