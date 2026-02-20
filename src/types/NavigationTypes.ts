import {MediaItemWithOwner} from './DBTypes';

export type RootStackParamList = {
  Tabs: undefined;
  Single: {
    item: MediaItemWithOwner;
  };
};

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
};
