import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Title, Button } from 'react-native-paper';
import { map } from 'lodash';
import { Rating } from 'react-native-ratings';
import { gePopularMoviesApi } from '../api/movies';
import { API_BASE_PATH_IMG } from '../utils/constants';
import usePreferences from '../hooks/usePreferences';
import defaultImage from '../assets/png/default-image.png';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

function MovieRating(props) {
  const { theme, voteCount, voteAverage } = props;
  const media = voteAverage / 2;

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={18}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 12, color: '#8697a5', marginTop: 5 }}>
        {voteCount} votos
      </Text>
    </View>
  );
}

function Movie(props) {
  const { movie, theme, navigation } = props;
  const { id, poster_path, title, release_date, vote_count, vote_average } =
    movie;
  const imageUrl = movie.poster_path
    ? `${API_BASE_PATH_IMG}/w500${poster_path}`
    : defaultImage;

  const onNavigation = () => {
    navigation.navigate('Movie', { id });
  };

  return (
    <TouchableWithoutFeedback onPress={() => onNavigation()}>
      <View style={styles.movie}>
        <View style={styles.left}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>

        <View style={styles.right}>
          <Title numberOfLines={1}>{title}</Title>
          <Text>{release_date}</Text>
          <MovieRating
            theme={theme}
            voteCount={vote_count}
            voteAverage={vote_average}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const PopularScreen = props => {
  const { navigation } = props;
  const [movies, setMovies] = useState(null);
  const [showBtnMore, setShowBtnMore] = useState(false);
  const [page, setPage] = useState(1);
  const { theme } = usePreferences();

  const getPopularMovies = async page => {
    const response = await gePopularMoviesApi(page);
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
    getPopularMovies(page);
  }, [page]);

  if (!movies) return null;

  return (
    <ScrollView>
      {map(movies, (movie, index) => (
        <Movie
          key={index}
          movie={movie}
          theme={theme}
          navigation={navigation}
        />
      ))}
      {showBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
          onPress={() => {
            setPage(page + 1);
          }}>
          Cargar mas ...
        </Button>
      )}
    </ScrollView>
  );
};

export default PopularScreen;

styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    marginRight: 20,
  },
  right: {},
  image: {
    width: 100,
    height: 150,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
