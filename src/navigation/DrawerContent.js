import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';
import usePreferences from '../hooks/usePreferences';

const DrawerContent = props => {
  // console.log("las props", props)
  const { navigation } = props;
  const [active, setActive] = useState('Home');
  const { theme, togleTheme } = usePreferences();

  const onChangeScreen = screen => {
    // console.log(screen);
    navigation.navigate(screen)
    setActive(screen);
  };
  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active == 'Home'}
          onPress={() => onChangeScreen('Home')}
        />
        <Drawer.Item
          label="Peliculas populares"
          active={active == 'Popular'}
          onPress={() => onChangeScreen('Popular')}
        />
        <Drawer.Item
          label="Nuevas peliculas"
          active={active == "News"}
          onPress={() => onChangeScreen('News')}
        />
      </Drawer.Section>

      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preferences} >
            <Text>Dark theme</Text>
            <Switch value={theme === "dark"} onValueChange={togleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  }
})

export default DrawerContent;
