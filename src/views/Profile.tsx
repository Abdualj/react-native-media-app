import {ScrollView} from 'react-native';
import {Card, ListItem, Button} from '@rneui/themed';
import {useUserContext} from '../hooks/ContextHooks';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/NavigationTypes';

const Profile = () => {
  const {user, handleLogout} = useUserContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!user) {
    return null;
  }

  return (
    <ScrollView>
      <Card>
        <Card.Title>Profile</Card.Title>
        <Card.Divider />
      </Card>

      <Card>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Username</ListItem.Title>
            <ListItem.Subtitle>{user.username}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Email</ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        <ListItem>
          <ListItem.Content>
            <ListItem.Title>User ID</ListItem.Title>
            <ListItem.Subtitle>{user.user_id}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Card>

      <Card>
        <Button
          title="My Files"
          onPress={() => navigation.navigate('MyFiles')}
          icon={{name: 'folder', type: 'material', color: 'white'}}
          containerStyle={{marginBottom: 12}}
        />
        <Button title="Logout" onPress={handleLogout} color="error" />
      </Card>
    </ScrollView>
  );
};

export default Profile;
