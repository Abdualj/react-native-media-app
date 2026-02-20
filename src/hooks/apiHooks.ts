import {useEffect, useState} from 'react';
import * as FileSystem from 'expo-file-system';
import {MediaItemWithOwner, UploadResponse} from '../types/DBTypes';
import {useUpdateContext} from './ContextHooks';

const useMedia = () => {
  const {update} = useUpdateContext();
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
  }, [update]);

  return {mediaArray, loading, error, getMedia};
};

const useFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postExpoFile = async (
    imageUri: string,
    token: string
  ): Promise<UploadResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const fileResult = await FileSystem.uploadAsync(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/media/upload`,
        imageUri,
        {
          httpMethod: 'POST',
          uploadType: 1, // MULTIPART
          fieldName: 'file',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      return fileResult.body ? JSON.parse(fileResult.body) : null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error uploading file:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const postMedia = async (
    data: {filename: string; title: string; description: string},
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
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to save media metadata');
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error saving media:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const putMedia = async (
    mediaId: number,
    data: {title: string; description: string},
    token: string
  ): Promise<{message: string} | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/media/${mediaId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update media');
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error updating media:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (
    mediaId: number,
    token: string
  ): Promise<{message: string} | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/media/${mediaId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete media');
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error deleting media:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {postExpoFile, postMedia, putMedia, deleteMedia, loading, error};
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
