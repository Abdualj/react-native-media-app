import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MediaItemWithOwner} from '../types/DBTypes';
import {formatDate, getMediaUrl} from '../lib/functions';
import {RootStackParamList} from '../types/NavigationTypes';

type SingleProps = NativeStackScreenProps<RootStackParamList, 'Single'>;

const Single = ({route}: SingleProps) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{uri: getMediaUrl(item.filename)}}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
          <View style={styles.metadata}>
            <View style={styles.metadataRow}>
              <Text style={styles.label}>Owner:</Text>
              <Text style={styles.value}>@{item.username}</Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.label}>Created:</Text>
              <Text style={styles.value}>{formatDate(item.created_at)}</Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.label}>File type:</Text>
              <Text style={styles.value}>{item.media_type}</Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.label}>File size:</Text>
              <Text style={styles.value}>
                {(item.filesize / 1024).toFixed(2)} KB
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  metadata: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
});

export default Single;
