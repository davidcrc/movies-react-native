import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <Drawer.Navigator initialRouteName="app">
      <Drawer.Screen
        name="app"
        options={{ headerShown: false }}
        component={StackNavigation}
      />
    </Drawer.Navigator>
  );
};

export default Navigation;
