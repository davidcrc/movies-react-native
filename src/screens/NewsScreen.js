import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getNewsMovieApi } from '../api/movies';
import { map } from 'lodash';
import { API_BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import defaultImage from '../assets/png/default-image.png';

const { width } = Dimensions.get('window');

function Movie(props) {
  const { movie, navigation } = props;
  const { id, title, poster_path } = movie;
  const imageUrl = poster_path
    ? `${API_BASE_PATH_IMG}/w500${poster_path}`
    : defaultImage;

  const onNavigation = () => {
    navigation.navigate('Movie', { id });
  };

  return (
    <TouchableWithoutFeedback onPress={() => onNavigation()}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const NewsScreen = props => {
  const { navigation } = props;
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(false);
  const { theme } = usePreferences();

  const getNewsMovies = async page => {
    const response = await getNewsMovieApi(page);
    // console.log('data', response.results);
    const totalPages = response.total_pages;

    if (page < totalPages) {
      setShowBtnMore(true);
      !movies
        ? setMovies(response.results)
        : setMovies([...movies, ...response.results]);
    } else {
      setShowBtnMore(false);
    }
  };

  useEffect(() => {
    getNewsMovies(page);
  }, [page]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {map(movies, (movie, index) => (
          <Movie key={index} movie={movie} navigation={navigation} />
        ))}
      </View>
      {showBtnMore && (
        <Button
          mode="contained"
          content={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
          onPress={() => {
            setPage(page + 1);
          }}>
          Cargar mas...
        </Button>
      )}
    </ScrollView>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
