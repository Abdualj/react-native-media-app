import {MediaItemWithOwner} from './DBTypes';

export type RootStackParamList = {
  Tabs: undefined;
  Single: {
    item: MediaItemWithOwner;
  };
  MyFiles: undefined;
};

export type TabParamList = {
  Home: undefined;
  Upload: undefined;
  Profile: undefined;
};
