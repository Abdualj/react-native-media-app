import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './src/contexts/UserContext';
import Navigator from './src/navigators/Navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Navigator />
        <StatusBar style="auto" />
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
