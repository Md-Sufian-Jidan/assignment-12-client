/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { auth } from '../Firebase/Firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    //create user 
    const createUser = (auth,email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(email, password);
    };
    // login user 
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(email, password);
    };

    // google login user 
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = (googleProvider, email, password) => {
        setLoading(true);
        return signInWithPopup(googleProvider, email, password);
    };

    // logout user 
    const logoutUser = () => {
        setLoading(true);
        return signOut();
    };

    const authInfo = { user, loading, createUser, loginUser, logoutUser, googleLogin };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object
}
export default AuthProvider;