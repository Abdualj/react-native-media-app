import {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, View} from 'react-native';
import {Card, Input, Button} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useFile} from '../hooks/apiHooks';
import {useUpdateContext} from '../hooks/ContextHooks';
import {TabParamList} from '../types/NavigationTypes';

type UploadFormData = {
  title: string;
  description: string;
};

const Upload = () => {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const {postExpoFile, postMedia, loading} = useFile();
  const {triggerUpdate} = useUpdateContext();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(
    null
  );

  const initValues: UploadFormData = {title: '', description: ''};
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: initValues,
    mode: 'onChange',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.6,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const resetForm = () => {
    reset();
    setImage(null);
  };

  const doUpload = async (inputs: UploadFormData) => {
    if (!image) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You must be logged in to upload');
        return;
      }

      // Upload the file
      const uploadResult = await postExpoFile(image.uri, token);
      if (!uploadResult) {
        Alert.alert('Error', 'Failed to upload file');
        return;
      }

      // Save media metadata
      const mediaData = {
        filename: uploadResult.data.filename,
        title: inputs.title,
        description: inputs.description,
      };

      const result = await postMedia(mediaData, token);
      if (!result) {
        Alert.alert('Error', 'Failed to save media information');
        return;
      }

      // Success!
      Alert.alert('Success', 'File uploaded successfully!');
      triggerUpdate();
      resetForm();
      navigation.navigate('Home');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload file');
    }
  };

  // Reset form when navigating away
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      resetForm();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <Card>
        <Card.Title>Upload Media</Card.Title>
        <Card.Divider />

        {/* Image Preview */}
        <View style={{alignItems: 'center', marginBottom: 20}}>
          {image ? (
            <Image
              source={{uri: image.uri}}
              style={{width: '100%', height: 200, borderRadius: 8}}
              resizeMode="contain"
            />
          ) : (
            <View
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f0f0f0',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Button
                title="Select Image/Video"
                onPress={pickImage}
                type="outline"
              />
            </View>
          )}
        </View>

        {image && (
          <Button
            title="Change Image/Video"
            onPress={pickImage}
            type="outline"
            containerStyle={{marginBottom: 16}}
          />
        )}

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
          title="Upload"
          onPress={handleSubmit(doUpload)}
          disabled={!isValid || !image || loading}
          loading={loading}
          containerStyle={{marginBottom: 12}}
        />

        <Button
          title="Reset"
          onPress={resetForm}
          type="outline"
          color="warning"
        />
      </Card>
    </ScrollView>
  );
};

export default Upload;
