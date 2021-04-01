import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../utils/firebaseConfig';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [authUser, setAuthUser] = useState();
    const [loading, setLoading] = useState(true);

    // function signup(email, password) {
    //     return auth.createUserWithEmailAndPassword(email, password);
    // }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setAuthUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, [])


    const value = {
        authUser,
        // signup,
        login,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
