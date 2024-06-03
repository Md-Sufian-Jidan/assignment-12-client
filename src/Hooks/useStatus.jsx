import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: status, isLoading } = useQuery({
        queryKey: ['status', user?.email],
        // enabled: loading ? false : true,
        enabled: !loading && !!user?.email, // enabled means wait the queryFn.
        queryFn: async () => {
            const { data } = await axiosSecure(`/role/${user?.email}`);
            return data.status;
        },
    });
    // fetching user info using logged in email
    return [status, isLoading];
};

export default useRole;