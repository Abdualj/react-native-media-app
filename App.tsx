import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './src/contexts/UserContext';
import {UpdateProvider} from './src/contexts/UpdateContext';
import Navigator from './src/navigators/Navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <UpdateProvider>
          <Navigator />
          <StatusBar style="auto" />
        </UpdateProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
