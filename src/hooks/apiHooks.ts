import {useEffect, useState} from 'react';
import {MediaItemWithOwner} from '../types/DBTypes';

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

export {useMedia, useFile};
