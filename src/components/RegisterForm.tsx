import {Controller, useForm} from 'react-hook-form';
import {Card, Input, Button} from '@rneui/themed';
import {useUser} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';

type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const RegisterForm = ({onSuccess}: {onSuccess: () => void}) => {
  const {postUser, getUsernameAvailable, getEmailAvailable} = useUser();
  const {handleLogin} = useUserContext();

  const initValues: RegisterFormData = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: initValues,
    mode: 'onBlur',
  });

  const doRegister = async (inputs: RegisterFormData) => {
    try {
      // Remove confirmPassword before sending to API
      const {confirmPassword, ...userData} = inputs;
      await postUser(userData);

      // Auto login after registration
      await handleLogin({
        username: inputs.username,
        password: inputs.password,
      });
      onSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Card>
      <Card.Title>Register</Card.Title>
      <Card.Divider />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Username is required'},
          minLength: {value: 3, message: 'Min length is 3 characters'},
          validate: async (value) => {
            try {
              const {available} = await getUsernameAvailable(value);
              return available ? available : 'Username taken';
            } catch (error) {
              console.log((error as Error).message);
              return 'Error checking username';
            }
          },
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
          required: {value: true, message: 'Email is required'},
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Must be a valid email',
          },
          validate: async (value) => {
            try {
              const {available} = await getEmailAvailable(value);
              return available ? available : 'Email already registered';
            } catch (error) {
              console.log((error as Error).message);
              return 'Error checking email';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            keyboardType="email-address"
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Password is required'},
          minLength: {value: 5, message: 'Min length is 5 characters'},
          pattern: {
            value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/,
            message: 'Must contain uppercase, lowercase, and number',
          },
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

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Please confirm password'},
          validate: (value) => {
            const password = getValues('password');
            return value === password || 'Passwords do not match';
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
      />

      <Button title="Register" onPress={handleSubmit(doRegister)} />
    </Card>
  );
};

export default RegisterForm;
