import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import NewsScreen from '../screens/NewsScreen';
import PopularScreen from '../screens/PopularScreen';
import SearchScreen from '../screens/SearchScreen';
import {IconButton} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const StackNavigation = props => {
  const {navigation} = props;

  const buttonLeft = () => {
    return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />;
  };

  const buttonRight = () => {
    return <IconButton icon="magnify" onPress={() => navigation.navigate('Search')} />;
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          title: '',
          headerTransparent: true,
          // headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: 'News',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="Popular"
        component={PopularScreen}
        options={{
          title: 'Popular',
          headerLeft: () => buttonLeft(),
          headerRight: () => buttonRight(),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Search movie' }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
