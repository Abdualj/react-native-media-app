import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Credentials, User} from '../types/DBTypes';

type UserContextType = {
  user: User | null;
  handleLogin: (credentials: Credentials) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleAutoLogin: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (credentials: Credentials) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login response:', data);

      if (data.token && data.user) {
        await AsyncStorage.setItem('token', data.token);
        setUser(data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        await AsyncStorage.removeItem('token');
        return;
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Auto login error:', error);
      await AsyncStorage.removeItem('token');
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};
