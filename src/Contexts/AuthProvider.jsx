import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
// firebase auth
import auth from "../Firebase/Firebase.config";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    // create user by email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // after creating a user by email and password update it's name and photo url
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };
    // send reset password email
    const resetPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }
    // login user by email and password
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // login user by google
    const googleProvider = new GoogleAuthProvider();
    const googleLoginUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    // login a user by github
    const githubProvider = new GithubAuthProvider();
    const githubLoginUser = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };
    // login user by google
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // get the token and set in the local storage
            if (currentUser) {
                const userEmail = { email: currentUser?.email };
                axiosPublic.post('/jwt', userEmail)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }

                    })
            }
            else {
                console.log('current user ', currentUser);
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic]);

    const authInfo = { user, loading, setLoading, createUser, updateUserProfile, loginUser, googleLoginUser, githubLoginUser, logout, resetPassword };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.array,
};
export default AuthProvider;