import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MediaItemWithOwner} from '../types/DBTypes';
import {formatDate, getMediaUrl} from '../lib/functions';

type MediaListItemProps = {
  item: MediaItemWithOwner;
  onPress?: (item: MediaItemWithOwner) => void;
};

const MediaListItem = ({item, onPress}: MediaListItemProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{uri: getMediaUrl(item.filename)}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        {item.description && (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <View style={styles.metadata}>
          <Text style={styles.username}>@{item.username}</Text>
          <Text style={styles.date}>{formatDate(item.created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  username: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default MediaListItem;
