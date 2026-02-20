import {CompositeNavigationProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListItem, Avatar, Text} from '@rneui/themed';
import {MediaItemWithOwner} from '../types/DBTypes';
import {formatDate, getMediaUrl} from '../lib/functions';
import {RootStackParamList, TabParamList} from '../types/NavigationTypes';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type MediaListItemProps = {
  item: MediaItemWithOwner;
  navigation: NavigationProp;
};

const MediaListItem = ({item, navigation}: MediaListItemProps) => {
  const handlePress = () => {
    navigation.navigate('Single', {item});
  };

  return (
    <ListItem onPress={handlePress} bottomDivider>
      <Avatar
        source={{uri: getMediaUrl(item.filename)}}
        size={80}
        rounded
        containerStyle={{backgroundColor: '#f0f0f0'}}
      />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
        {item.description && (
          <ListItem.Subtitle numberOfLines={2}>
            {item.description}
          </ListItem.Subtitle>
        )}
        <Text style={{fontSize: 12, color: '#888', marginTop: 4}}>
          @{item.username} • {formatDate(item.created_at)}
        </Text>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default MediaListItem;
