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

type UploadResponse = {
  message: string;
  data: {
    filename: string;
    media_type: string;
    filesize: number;
  };
};

type Credentials = {
  username: string;
  password: string;
};

type User = {
  user_id: number;
  username: string;
  email: string;
  created_at: Date | string;
};

type AuthResponse = {
  message: string;
  token?: string;
  user?: User;
};

type UserWithoutPassword = Omit<User, 'password'>;

export type {
  MediaItemWithOwner,
  MediaItem,
  UploadResult,
  UploadResponse,
  Credentials,
  User,
  AuthResponse,
  UserWithoutPassword,
};
