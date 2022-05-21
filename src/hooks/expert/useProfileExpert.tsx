import { useQuery } from "react-query";
import { getProfileExpert } from "../../api/expert/profile";

export function useGetProfileExpert(enabled = false) {
  const { data: profile, refetch: refetchProfile } = useQuery<any>('get-profile-expert', getProfileExpert, { enabled });
  return { profile, refetchProfile };
}