import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Searchbar, Title } from 'react-native-paper';
import { size, map } from 'lodash';
import { searchMoviesApi } from '../api/movies';
import { API_BASE_PATH_IMG } from '../utils/constants';

const { width } = Dimensions.get('window');

export default function Search(props) {
  const { navigation } = props;
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState('');

  const searchMovies = async search => {
    const response = await searchMoviesApi(search);
    // console.log('data', response.results);
    setMovies(response.results);
  };

  useEffect(() => {
    if (size(search) > 2) {
      searchMovies(search);
    }
  }, [search]);

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Busca tu película"
        iconColor={'transparent'}
        icon="arrow-left"
        style={styles.input}
        onChangeText={e => setSearch(e)}
      />
      <ScrollView>
        <View style={styles.container}>
          {map(movies, (movie, index) => (
            <Movie key={index} movie={movie} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Movie(props) {
  const { movie, navigation } = props;
  const { id, poster_path, title } = movie;
  const imageUrl = `${API_BASE_PATH_IMG}/w500${poster_path}`;

  const goMovie = () => {
    navigation.navigate('Movie', { id });
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
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

const styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
