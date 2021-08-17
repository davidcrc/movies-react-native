import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { getMovieByIdApi } from '../api/movies';
import { API_BASE_PATH_IMG } from '../utils/constants';

function MovieImage(props) {
  const { posterPath } = props;
  const imageUrl = `${API_BASE_PATH_IMG}/w500${posterPath}`;

  return (
    <View style={styles.viewPoster}>
      <Image style={styles.poster} source={{ uri: imageUrl }} />
    </View>
  );
}

const MovieScreen = props => {
  console.log('props movie', props.route.params);
  const { id } = props.route.params;
  const [movie, setMovie] = useState(null);

  const getMovieById = async idMovie => {
    const response = await getMovieByIdApi(idMovie);
    console.log('\nAQUI EL RES', response);
    setMovie(response);
  };

  useEffect(() => {
    getMovieById(id);
  }, []);

  return (
    <>
      <ScrollView>
        {movie && <MovieImage posterPath={movie.poster_path} />}
      </ScrollView>
      {/* Modal */}
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
    shadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 30,
  },
});
