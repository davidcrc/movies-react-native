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
    return <IconButton icon="menu" onPress={() => navigation.openDrawer() } />;
  };
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'themovieApp', headerLeft: () => buttonLeft()}}
      />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        options={{title: 'Movie', headerLeft: () => buttonLeft()}}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{title: 'News', headerLeft: () => buttonLeft()}}
      />
      <Stack.Screen
        name="Popular"
        component={PopularScreen}
        options={{title: 'Popular', headerLeft: () => buttonLeft()}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Search', headerLeft: () => buttonLeft()}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
