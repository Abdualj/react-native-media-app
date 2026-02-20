import {FlatList, RefreshControl, View} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserContext} from '../hooks/ContextHooks';
import MediaListItem from '../components/MediaListItem';
import {RootStackParamList, TabParamList} from '../types/NavigationTypes';
import {MediaItemWithOwner} from '../types/DBTypes';

type MyFilesNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type MyFilesProps = {
  navigation: MyFilesNavigationProp;
};

const MyFiles = ({navigation}: MyFilesProps) => {
  const {user} = useUserContext();
  const [myMedia, setMyMedia] = useState<MediaItemWithOwner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyMedia = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_MEDIA_SERVER}/api/media/user/${user.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch your media');
      }
      const data = await response.json();
      setMyMedia(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching my media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyMedia();
  }, [user]);

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text h4 style={{color: '#FF3B30'}}>
          Error: {error}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={myMedia}
      renderItem={({item}) => (
        <MediaListItem item={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.media_id.toString()}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchMyMedia} />
      }
      ListEmptyComponent={
        <View style={{padding: 40, alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: '#888'}}>
            You haven't uploaded any media yet
          </Text>
        </View>
      }
    />
  );
};

export default MyFiles;
