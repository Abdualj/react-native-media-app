import {useState} from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Card, ListItem, Text, Button} from '@rneui/themed';
import {Video, ResizeMode} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatDate, getMediaUrl} from '../lib/functions';
import {RootStackParamList} from '../types/NavigationTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {useFile} from '../hooks/apiHooks';
import {useUpdateContext} from '../hooks/ContextHooks';

type SingleProps = NativeStackScreenProps<RootStackParamList, 'Single'>;

const Single = ({route, navigation}: SingleProps) => {
  const {item} = route.params;
  const {user} = useUserContext();
  const {deleteMedia, loading} = useFile();
  const {triggerUpdate} = useUpdateContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = user?.user_id === item.user_id;
  const isVideo = item.media_type.startsWith('video/');

  const handleModify = () => {
    navigation.navigate('Modify', {item});
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Media',
      'Are you sure you want to delete this media? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDelete,
        },
      ]
    );
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You must be logged in');
        return;
      }

      const result = await deleteMedia(item.media_id, token);
      if (!result) {
        Alert.alert('Error', 'Failed to delete media');
        return;
      }

      Alert.alert('Success', 'Media deleted successfully!');
      triggerUpdate();
      navigation.goBack();
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete media');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ScrollView>
      <Card>
        {isVideo ? (
          <Video
            source={{uri: getMediaUrl(item.filename)}}
            style={{width: '100%', height: 300}}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={false}
          />
        ) : (
          <Image
            source={{uri: getMediaUrl(item.filename)}}
            style={{width: '100%', height: 300}}
            resizeMode="contain"
          />
        )}
      </Card>

      <Card>
        <Card.Title>{item.title}</Card.Title>
        <Card.Divider />
        {item.description && (
          <Text style={{marginBottom: 16, lineHeight: 24}}>
            {item.description}
          </Text>
        )}
      </Card>

      {isOwner && (
        <Card>
          <Button
            title="Modify"
            onPress={handleModify}
            icon={{name: 'edit', type: 'material', color: 'white'}}
            containerStyle={{marginBottom: 12}}
          />
          <Button
            title="Delete"
            onPress={handleDelete}
            color="error"
            icon={{name: 'delete', type: 'material', color: 'white'}}
            loading={isDeleting || loading}
            disabled={isDeleting || loading}
          />
        </Card>
      )}

      <Card>
        <Card.Title>Media Information</Card.Title>
        <Card.Divider />
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Owner</ListItem.Title>
            <ListItem.Subtitle>@{item.username}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Created</ListItem.Title>
            <ListItem.Subtitle>{formatDate(item.created_at)}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>File type</ListItem.Title>
            <ListItem.Subtitle>{item.media_type}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>File size</ListItem.Title>
            <ListItem.Subtitle>
              {(item.filesize / 1024).toFixed(2)} KB
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

export default Single;
