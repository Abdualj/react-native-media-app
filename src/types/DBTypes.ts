type MediaItemWithOwner = {
  media_id: number;
  user_id: number;
  filename: string;
  filesize: number;
  media_type: string;
  title: string;
  description: string | null;
  created_at: Date | string;
  thumbnail: string | null;
  username: string;
};

type MediaItem = Omit<MediaItemWithOwner, 'username'>;

type UploadResult = {
  message: string;
  data: {
    media_id: number;
    filename: string;
  };
};

export type {MediaItemWithOwner, MediaItem, UploadResult};
