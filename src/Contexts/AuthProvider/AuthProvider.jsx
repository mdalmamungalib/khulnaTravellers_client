import React, { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  githubProvider.addScope("user:email");

  // Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update User Profile
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Verify Email
  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  };

  // User SignIn
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Reset Password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  // Sign In with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign In with Facebook
  const signInWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  // Sign In with GitHub
  const signInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // Log Out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Delete User
  const userDelete = () => {
    setLoading(true);
    return deleteUser(auth.currentUser);
  };

 useEffect(() => {
    const unsubsCribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        const userEmail = currentUser?.email || user?.email;
        console.log("userEmail", userEmail);
        const loggedUser = {
          email: userEmail,
        };
        setUser(currentUser);
        if (currentUser) {
          axios
            .post(
              `${import.meta.env.VITE_SERVER_URL}/jwt`,
              loggedUser,
              { withCredentials: true }
            )
            .then((res) => {
              console.log(res.data);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          axios
            .post(
              `${import.meta.env.VITE_SERVER_URL}/logOut`,
              loggedUser,
              { withCredentials: true }
            )
            .then((res) => {
              console.log(res?.data);
            })
            .finally(() => {
              setLoading(true);
            });
        }
      }
    );
    return () => {
      unsubsCribe();
    };
  }, [auth, user?.email]);


  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    verifyEmail,
    loginUser,
    resetPassword,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
    logOut,
    userDelete,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
