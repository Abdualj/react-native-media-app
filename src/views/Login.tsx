import {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from '@rneui/themed';
import {useUserContext} from '../hooks/ContextHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const {handleAutoLogin} = useUserContext();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    handleAutoLogin();
  }, []);

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16,
          }}
        >
          {showRegister ? (
            <RegisterForm onSuccess={toggleForm} />
          ) : (
            <LoginForm />
          )}

          <Button
            type="clear"
            title={
              showRegister
                ? 'Already have an account? Login'
                : "Don't have an account? Register"
            }
            onPress={toggleForm}
            containerStyle={{marginTop: 16}}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

export default Login;
