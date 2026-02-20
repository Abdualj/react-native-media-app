import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {MediaItemWithOwner} from '../types/DBTypes';

const Home = () => {
  const {mediaArray, loading, error, getMedia} = useMedia();

  const handleRefresh = () => {
    getMedia();
  };

  const handleMediaPress = (item: MediaItemWithOwner) => {
    console.log('Media item pressed:', item.title);
    // TODO: Navigate to media detail view
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && mediaArray.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading media...</Text>
        </View>
      ) : (
        <FlatList
          data={mediaArray}
          renderItem={({item}) => (
            <MediaListItem item={item} onPress={handleMediaPress} />
          )}
          keyExtractor={(item) => item.media_id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No media items found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default Home;
