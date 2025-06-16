
import { createContext, useState, useEffect, useContext } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail // ✅ NEW
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (email, password, name, photoURL = null) => {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const defaultPhoto = photoURL || `https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`;
        await updateProfile(userCredential.user, {
            displayName: name,
            photoURL: defaultPhoto
        });

        setUser({
            ...userCredential.user,
            displayName: name,
            photoURL: defaultPhoto
        });

        setLoading(false);
        return userCredential;
    };

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    // ✅ Send password reset email
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const updateUserProfile = async (name, photoURL) => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        await updateProfile(currentUser, {
            displayName: name,
            photoURL: photoURL
        });

        setUser({ ...currentUser, displayName: name, photoURL });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        register,
        login,
        setLoading,
        googleLogin,
        logout,
        updateUserProfile,
        resetPassword // ✅ Include in context
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

