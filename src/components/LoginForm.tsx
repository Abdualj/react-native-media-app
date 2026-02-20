import {Controller, useForm} from 'react-hook-form';
import {Card, Input, Button} from '@rneui/themed';
import {useUserContext} from '../hooks/ContextHooks';
import {Credentials} from '../types/DBTypes';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {username: '', password: ''};
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
  });

  const doLogin = async (inputs: Credentials) => {
    try {
      await handleLogin(inputs);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Card>
      <Card.Title>Login</Card.Title>
      <Card.Divider />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Username is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Password is required'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Button title="Login" onPress={handleSubmit(doLogin)} />
    </Card>
  );
};

export default LoginForm;
