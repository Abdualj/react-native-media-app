import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';
import {useUserContext} from '../hooks/ContextHooks';
import Home from '../views/Home';
import Upload from '../views/Upload';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import MyFiles from '../views/MyFiles';
import Modify from '../views/Modify';
import {RootStackParamList, TabParamList} from '../types/NavigationTypes';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: true,
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          title: 'Upload',
          headerShown: true,
          tabBarIcon: ({color}) => (
            <MaterialIcons name="add-circle" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          headerShown: true,
          tabBarIcon: ({color}) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Single"
        component={Single}
        options={{
          title: 'Media Details',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="MyFiles"
        component={MyFiles}
        options={{
          title: 'My Files',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="Modify"
        component={Modify}
        options={{
          title: 'Modify Media',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const {user} = useUserContext();

  return (
    <NavigationContainer>
      {user ? <StackScreen /> : <Login />}
    </NavigationContainer>
  );
};

export default Navigator;
