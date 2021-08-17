import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Title } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { map, size } from 'lodash';
import { API_BASE_PATH_IMG } from '../utils/constants';
import { getAllGenresApi } from '../api/movies';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

function RenderItem(props) {
  const { data, allGenres, navigation } = props;
  const { id, title, poster_path, genre_ids } = data.item;
  const imageUrl = `${API_BASE_PATH_IMG}/w500${poster_path}`;

  const genres = [];
  genre_ids.forEach(id => {
    allGenres &&
      allGenres.forEach(item => {
        if (item.id === id) genres.push(item.name);
      });
  });

  const onNavigation = () => {
    navigation.navigate('Movie', { id });
  };

  return (
    <TouchableWithoutFeedback onPress={() => onNavigation()}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode={'contain'}
        />
        <Title style={styles.title}>{title}</Title>
        <View style={styles.genres}>
          {genres &&
            map(genres, (genre, index) => (
              <Text key={index} style={styles.genre}>
                {genre}
                {index !== size(genres) - 1 && ', '}
              </Text>
            ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const CarouselVertical = props => {
  const { data, navigation, genres } = props;

  // console.log("que hay??", data)
  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={item => (
        <RenderItem allGenres={genres} data={item} navigation={navigation} />
      )}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );
};

export default CarouselVertical;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 20,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  genres: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  genre: {
    fontSize: 12,
    color: '#8997a5',
  },
});
