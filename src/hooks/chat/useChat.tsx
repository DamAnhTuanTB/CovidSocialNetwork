import { getDetailChatSession, getInfoChatSession, getListMessagesPatient, getListMessagesExpert, getListChatSessionsOfExpert } from '../../api/chat';
import { useQuery } from 'react-query';

// p
export function useGetInfoChatSession(paramSearch: any) {
    const { data, isLoading } = useQuery<any>(['getProfileExpertToChat'], () => getInfoChatSession());
    return { data, isLoading };
}
// p
export function useGetListMessagesPatient(id: number, isEnable: boolean) {
    const { data, isLoading } = useQuery<any>(['getListMessagesPatient', id], () => getListMessagesPatient(id), { enabled: isEnable });
    return { data, isLoading }
}
// e
export function useGetDetailChatSession(id: number) {
    const { data, isLoading } = useQuery<any>(['getDetailChatSession', id], () => getDetailChatSession(id));
    return { data, isLoading }
}
// e
export function useGetListMessagesExpert(id: number, isEnable: boolean) {
    const { data, isLoading } = useQuery<any>(['getListMessagesExpert', id], () => getListMessagesExpert(id), { enabled: isEnable });
    return { data, isLoading }
}
// e
export function useGetListChatSessionsOfExpert(id: number, date?: string, status?: number, page?: number, limit?: number) {
    const { data, isLoading } = useQuery<any>(['getListChatSessionsOfExpert', [id, date, status, page, limit]], () => getListChatSessionsOfExpert(id, date, status, page, limit));
    return { data, isLoading }
}


