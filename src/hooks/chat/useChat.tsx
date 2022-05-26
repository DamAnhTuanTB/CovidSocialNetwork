import { getDetailChatSession, getInfoChatSession, getListMessagesPatient, getListMessagesExpert, getListChatSessionsOfExpert, getListChatSessionsOfExpertAdmin, getDetailChatSessionAdmin, getListMessagesExpertAdmin } from '../../api/chat';
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
// a
export function useGetListChatSessionsOfExpertAdmin(id: number, date?: string, status?: number, page?: number, limit?: number) {
    const { data, isLoading } = useQuery<any>(['getListChatSessionsOfExpertAdmin', [id, date, status, page, limit]], () => getListChatSessionsOfExpertAdmin(id, date, status, page, limit));
    return { data, isLoading }
}
// a
export function useGetDetailChatSessionAdmin(id: number) {
    const { data, isLoading } = useQuery<any>(['getDetailChatSessionAdmin', id], () => getDetailChatSessionAdmin(id));
    return { data, isLoading }
}
// a
export function useGetListMessagesExpertAdmin(id: number, isEnable: boolean) {
    const { data, isLoading } = useQuery<any>(['getListMessagesExpertAdmin', id], () => getListMessagesExpertAdmin(id), { enabled: isEnable });
    return { data, isLoading }
}


