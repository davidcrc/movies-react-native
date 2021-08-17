/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';
import PreferencesContext from './src/context/PreferencesContext';

export default function Main() {
  const [theme, setTheme] = React.useState('dark');

  DefaultThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.accent = '#1ae1f2';

  const togleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  const preferenees = React.useMemo(
    () => ({
      togleTheme,
      theme,
    }),
    [theme],
  );
  return (
    <PreferencesContext.Provider value={preferenees}>
      <PaperProvider
        theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
        {/* <React.StatusBar barStyle={theme === "dark" ? 'dark-content': 'light-content'}/> */}
        <App theme={theme} />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
