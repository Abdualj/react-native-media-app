const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getMediaUrl = (filename: string): string => {
  return `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/uploads/${filename}`;
};

export {formatDate, getMediaUrl};
