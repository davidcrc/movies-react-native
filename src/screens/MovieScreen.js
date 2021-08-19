import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Text, Title, IconButton } from 'react-native-paper';
import { map } from 'lodash';
import { getMovieByIdApi } from '../api/movies';
import { API_BASE_PATH_IMG } from '../utils/constants';
import ModalVideo from '../components/ModalVideo';
import { Rating } from 'react-native-ratings';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

function MovieImage(props) {
  const { posterPath } = props;
  const imageUrl = `${API_BASE_PATH_IMG}/w500${posterPath}`;

  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{ uri: imageUrl }}
        resizeMode={'contain'}
      />
    </View>
  );
}

function MovieTrailer(props) {
  const { setShowVideo } = props;

  return (
    <View style={styles.viewPlay}>
      <IconButton
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShowVideo(true)}
      />
    </View>
  );
}

function MovieTitle(props) {
  const { movie } = props;
  return (
    <View style={styles.viewInfo}>
      <Title>{movie.title}</Title>
      <View style={styles.viewGenre}>
        {map(movie.genres, (genre, index) => (
          <Text key={genre.id} style={styles.genre}>
            {genre.name}
          </Text>
        ))}
      </View>
    </View>
  );
}

function MovieRating(props) {
  const { voteCount, voteAverage } = props;
  const media = voteAverage / 2;
  const { theme } = usePreferences();

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starDark : starLight}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        imageSize={20}
        style={{ marginRight: 15 }}
      />
      <Text style={{ fontSize: 16, marginRight: 15 }}>{media}</Text>
      <Text style={{ fontSize: 12, color: '#8697a5', textAlign: 'center' }}>
        {voteCount}
      </Text>
    </View>
  );
}

const MovieScreen = props => {
  // console.log('props movie', props.route.params);
  const { id } = props.route.params;
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getMovieById = async idMovie => {
    setIsLoading(true);
    const response = await getMovieByIdApi(idMovie);
    // console.log('\nAQUI EL RES', response);
    setMovie(response);
    setIsLoading(false)
  };

  useEffect(() => {
    getMovieById(id);
  }, []);

  if (!movie) return null;

  return isLoading ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#1ae1f2" />
    </View>
  ) : (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer setShowVideo={setShowVideo} />
        <MovieTitle movie={movie} />
        <MovieRating
          voteCount={movie.vote_count}
          voteAverage={movie.vote_average}
        />
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={[styles.overview, { marginBottom: 30 }]}>
          Fecha de lanzamiento: {movie.release_date}
        </Text>
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  viewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  play: {
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  viewInfo: {
    marginHorizontal: 30,
  },
  viewGenre: {
    flexDirection: 'row',
  },
  genre: {
    marginRight: 20,
    color: '#8697a5',
  },
  viewRating: {
    marginHorizontal: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overview: {
    marginHorizontal: 30,
    marginTop: 20,
    // textAlign: 'justify',
    color: '#8697a5',
  },
});
