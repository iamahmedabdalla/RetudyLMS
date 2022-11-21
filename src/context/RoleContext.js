import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const UserRole = createContext();

export const UserRoleContextProvider = ({ children }) => {
    const [userRole, setUserRole] = useState({});
    
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();
    
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);
            const userRole = docSnap.data().role;
            setUserRole(userRole);
        }
        });
    }, []);
    
    return (
        <UserRoleContext.Provider value={{ userRole }}>
        {children}
        </UserRoleContext.Provider>
    );
    }

export const UserRoleContext = () => {
    return useContext(UserRole);
}
