import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Title, IconButton } from 'react-native-paper';
import { map } from 'lodash';
import { getMovieByIdApi } from '../api/movies';
import { API_BASE_PATH_IMG } from '../utils/constants';
import ModalVideo from '../components/ModalVideo';

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

const MovieScreen = props => {
  // console.log('props movie', props.route.params);
  const { id } = props.route.params;
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  const getMovieById = async idMovie => {
    const response = await getMovieByIdApi(idMovie);
    // console.log('\nAQUI EL RES', response);
    setMovie(response);
  };

  useEffect(() => {
    getMovieById(id);
  }, []);

  if (!movie) return null;

  return (
    <>
      <ScrollView>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer setShowVideo={setShowVideo} />
        <MovieTitle movie={movie} />
      </ScrollView>
      <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
    </>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
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
});
