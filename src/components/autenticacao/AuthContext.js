import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.error('Erro ao salvar o token:', error);
    }
  }; 

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken('');
    } catch (error) {
      console.error('Erro ao remover o token:', error);
    }
  };

//   useEffect(() => {
//     const checkToken = async () => {
//       try {
//         const token = await AsyncStorage.getItem('userToken');
//         setUserToken(token);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Erro ao verificar o token:', error);
//       }
//     };

//     checkToken();
//   }, []);

  const value = {
    userToken,
    isLoading,
    setUserToken,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
