import {createContext} from 'react'

const PreferencesContext = createContext({
  theme: '',
  togleTheme: () => {},
});

export default PreferencesContext;