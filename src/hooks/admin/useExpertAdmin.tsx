import { useQuery } from 'react-query';
import { getListExpert } from '../../api/admin/expert-management';

export function useGetListExpert(paramSearch: any) {
    const { data: dataExpert, isLoading: isLoadingExpert } = useQuery<any>(['admin-all-experts', {params: paramSearch}], () => getListExpert(paramSearch));
    return { dataExpert, isLoadingExpert };
}