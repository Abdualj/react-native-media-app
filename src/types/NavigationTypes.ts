import {MediaItemWithOwner} from './DBTypes';

export type RootStackParamList = {
  Tabs: undefined;
  Single: {
    item: MediaItemWithOwner;
  };
  MyFiles: undefined;
  Modify: {
    item: MediaItemWithOwner;
  };
};

export type TabParamList = {
  Home: undefined;
  Upload: undefined;
  Profile: undefined;
};
