import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState({});
  const [role, setRole] = useState('');
  const [student, setStudent] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

 


  const createUser = async (
        fname,
        lname,
        email,
        password,
        userEducation,
        userExperience,
        softSkills,
        userAbout,
        userPortfolio,
        userCoverPhoto
  ) => {
    try {
       const { user } = await createUserWithEmailAndPassword(
         auth,
         email,
         password
       );
       await updateProfile(auth.currentUser, {
         displayName: fname + ' ' + lname,
         userCoverPhoto: userCoverPhoto,
         dateCreated: new Date().toISOString(),
       });
       await setDoc(doc(db, 'users', user.uid), {
         uid: user.uid,
         email: user.email,
         name: user.displayName,
         userEducation: userEducation,
          userExperience: userExperience,
          softSkills: softSkills,
          userAbout: userAbout,
          userPortfolio: userPortfolio,
          userCoverPhoto: userCoverPhoto,
         dateCreated: user.metadata.creationTime,
       });
     setUser(user);
     } catch (error) {
       console.log(error);
     }
 };

  
  


   const signIn = async (email, password) =>  {
     try {
     await signInWithEmailAndPassword(auth, email, password)
        if (userRole === 'admin') {
          navigate('/dashboard')
        } else if (userRole === 'teacher') {
          navigate('/current-subject')
        } else if (userRole === 'student') {
          navigate('/current-classes')
        }
      } catch (e) {
        console.log(e.message)
        setError(e.message)
      }
   }

  const logout = () => {
      return signOut(auth)
  }

  const getUserRole = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const userRole = docSnap.data().role;
      setUserRole(userRole);
    } else {
      console.log('User does not exist' + uid);
      logout();
    }

  };




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUserRole(currentUser?.role);
      setUser(currentUser);
      getUserRole(currentUser?.uid);
    });
    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <UserContext.Provider value={{ error, createUser, user, userRole, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};



  

export const UserAuth = () => {
  return useContext(UserContext);
};
