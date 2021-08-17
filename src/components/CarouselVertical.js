import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {map, size} from 'lodash';
import {API_BASE_PATH_IMG} from '../utils/constants';
import {getGenreMovieApi} from '../api/movies';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

function RenderItem(props) {
  const {data,allGenres} = props;
  const {title, poster_path, genre_ids} = data.item;
  const imageUrl = `${API_BASE_PATH_IMG}/w500${poster_path}`;

  const genres = [];
  genre_ids.forEach(id => {
    allGenres && allGenres.forEach(item => {
      if (item.id === id) genres.push(item.name);
    });
  });  

  return (
    <TouchableWithoutFeedback onPress={() => console.log('wiii')}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri: imageUrl}} />
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
  const {data} = props;
  const [genres, setGenres] = useState(null);

  const getGenreMovie = async () => {
    const response = await getGenreMovieApi();
    // console.log("\nAQUI EL RES", response)
    setGenres(response.genres);
  };

  useEffect(() => {
    getGenreMovie();
  }, []);
  
  // console.log("que hay??", data)
  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={item => <RenderItem allGenres={genres} data={item} />}
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
    height: 450,
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
