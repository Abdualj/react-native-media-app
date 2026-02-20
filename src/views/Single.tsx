import {Image, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Card, ListItem, Text} from '@rneui/themed';
import {formatDate, getMediaUrl} from '../lib/functions';
import {RootStackParamList} from '../types/NavigationTypes';

type SingleProps = NativeStackScreenProps<RootStackParamList, 'Single'>;

const Single = ({route}: SingleProps) => {
  const {item} = route.params;

  return (
    <ScrollView>
      <Card>
        <Image
          source={{uri: getMediaUrl(item.filename)}}
          style={{width: '100%', height: 300}}
          resizeMode="contain"
        />
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
