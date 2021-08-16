import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';

const DrawerContent = props => {
  // console.log("las props", props)
  const {navigation} = props;
  const [active, setActive] = useState('Home');
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
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
