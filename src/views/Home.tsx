import {FlatList, RefreshControl, View} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Text} from '@rneui/themed';
import {useMedia} from '../hooks/apiHooks';
import MediaListItem from '../components/MediaListItem';
import {RootStackParamList, TabParamList} from '../types/NavigationTypes';

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type HomeProps = {
  navigation: HomeNavigationProp;
};

const Home = ({navigation}: HomeProps) => {
  const {mediaArray, loading, error, getMedia} = useMedia();

  const handleRefresh = () => {
    getMedia();
  };

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
      data={mediaArray}
      renderItem={({item}) => (
        <MediaListItem item={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.media_id.toString()}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <View style={{padding: 40, alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: '#888'}}>
            No media items found
          </Text>
        </View>
      }
    />
  );
};

export default Home;
