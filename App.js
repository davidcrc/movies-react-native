import React from 'react';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';

const App = props => {
  console.log(props);
  const {theme} = props;
  DarkThemeNavigation.colors.background = '#192734';
  DarkThemeNavigation.colors.card = '#15212b';

  return (
    <NavigationContainer
      theme={theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation}>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
