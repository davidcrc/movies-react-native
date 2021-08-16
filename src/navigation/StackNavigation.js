import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import NewsScreen from '../screens/NewsScreen';
import PopularScreen from '../screens/PopularScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'themovieApp'}}
      />
      <Stack.Screen
        name="Movie"
        component={MovieScreen}
        options={{title: 'Movie'}}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{title: 'News'}}
      />
      <Stack.Screen
        name="Popular"
        component={PopularScreen}
        options={{title: 'Popular'}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Search'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
