import useAuth from '../../../Hooks/useAuth';
const UserStatistics = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2>hi Welcome Back , {user?.displayName}</h2>
        </div>
    );
};

export default UserStatistics;