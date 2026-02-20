import {useEffect, useState} from 'react';
import {MediaItemWithOwner, User} from '../types/DBTypes';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/media`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }
      const data = await response.json();
      setMediaArray(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray, loading, error, getMedia};
};

const useFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postMedia = async (
    formData: FormData,
    token: string
  ): Promise<{media_id: number} | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/media`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Failed to upload media');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error uploading media:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {postMedia, loading, error};
};

const useUser = () => {
  const postUser = async (user: {
    username: string;
    password: string;
    email: string;
  }) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const getUsernameAvailable = async (username: string) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/users/username/${username}`
      );
      if (!response.ok) {
        return {available: false};
      }
      return await response.json();
    } catch (error) {
      console.error('Username check error:', error);
      return {available: false};
    }
  };

  const getEmailAvailable = async (email: string) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/users/email/${email}`
      );
      if (!response.ok) {
        return {available: false};
      }
      return await response.json();
    } catch (error) {
      console.error('Email check error:', error);
      return {available: false};
    }
  };

  return {postUser, getUsernameAvailable, getEmailAvailable};
};

export {useMedia, useFile, useUser};
