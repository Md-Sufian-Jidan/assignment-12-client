import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: status = null, isLoading } = useQuery({
        queryKey: ['status'],
        // enabled: loading ? false : true,
        enabled: !loading, // enabled means wait the queryFn.
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/role/${user?.email}`);
            // console.log(data);
            return data?.status;
        },
    });
    // fetching user info using logged in email
    return [status, isLoading];
};

export default useRole;