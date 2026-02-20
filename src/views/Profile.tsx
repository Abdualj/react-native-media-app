import {ScrollView} from 'react-native';
import {Card, ListItem, Text} from '@rneui/themed';

const Profile = () => {
  return (
    <ScrollView>
      <Card>
        <Card.Title>Profile</Card.Title>
        <Card.Divider />
        <Text style={{marginBottom: 20, textAlign: 'center', color: '#666'}}>
          User profile information
        </Text>
      </Card>

      <Card>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Name</ListItem.Title>
            <ListItem.Subtitle>Current User</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Email</ListItem.Title>
            <ListItem.Subtitle>user@example.com</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Member since</ListItem.Title>
            <ListItem.Subtitle>2024</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

export default Profile;
