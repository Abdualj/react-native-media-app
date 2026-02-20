import {useEffect} from 'react';
import {Alert, ScrollView} from 'react-native';
import {Card, Input, Button} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFile} from '../hooks/apiHooks';
import {useUpdateContext} from '../hooks/ContextHooks';
import {RootStackParamList} from '../types/NavigationTypes';

type ModifyProps = NativeStackScreenProps<RootStackParamList, 'Modify'>;

type ModifyFormData = {
  title: string;
  description: string;
};

const Modify = ({route, navigation}: ModifyProps) => {
  const {item} = route.params;
  const {putMedia, loading} = useFile();
  const {triggerUpdate} = useUpdateContext();

  const initValues: ModifyFormData = {
    title: item.title,
    description: item.description || '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: initValues,
    mode: 'onChange',
  });

  const doModify = async (inputs: ModifyFormData) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You must be logged in to modify media');
        return;
      }

      const result = await putMedia(item.media_id, inputs, token);
      if (!result) {
        Alert.alert('Error', 'Failed to update media');
        return;
      }

      Alert.alert('Success', 'Media updated successfully!');
      triggerUpdate();
      navigation.goBack();
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update media');
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title>Modify Media</Card.Title>
        <Card.Divider />

        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'Title is required'},
            minLength: {value: 3, message: 'Min length is 3 characters'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.title?.message}
            />
          )}
          name="title"
        />

        <Controller
          control={control}
          rules={{
            minLength: {value: 5, message: 'Min length is 5 characters'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={3}
              errorMessage={errors.description?.message}
            />
          )}
          name="description"
        />

        <Button
          title="Update"
          onPress={handleSubmit(doModify)}
          disabled={!isValid || loading}
          loading={loading}
          containerStyle={{marginBottom: 12}}
        />

        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          type="outline"
          color="warning"
        />
      </Card>
    </ScrollView>
  );
};

export default Modify;
