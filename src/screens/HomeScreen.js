import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { getGenreMovieApi, getNewsMovieApi } from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';
import { map, size } from 'lodash';

const HomeScreen = props => {
  const { navigation } = props;
  const [newsMovies, setNewsMovies] = useState(null);
  const [genresList, setGenresList] = useState([]);
  const [genreSelected, setGenreSelected] = useState();

  const getNewsMovies = async () => {
    const response = await getNewsMovieApi();
    // console.log("\nAQUI EL RES", response.results)
    setNewsMovies(response.results);
  };

  const getGenreMovie = async () => {
    const response = await getGenreMovieApi();
    // console.log("\nAQUI EL RES", response)
    setGenresList(response.genres);
    setGenreSelected(response.genres[0].id)   // po default el primero que retorna
  };

  useEffect(() => {
    getNewsMovies();
    // // Para usar con then
    // getNewsMovies().then( (response) => {
    //   console.log("AQUI EL THEN", response)
    // })
  }, []);

  useEffect(() => {
    getGenreMovie();
  }, []);

  const onChangeGenre = newGenreId => {
    setGenreSelected(newGenreId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newsMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas peliculas</Title>
          <CarouselVertical
            data={newsMovies}
            navigation={navigation}
            genres={genresList}
          />
        </View>
      )}
      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Peliculas por genero</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genresList}>
          {map(genresList, (genre, index) => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                { color: genre.id !== genreSelected ? '#8697a5' : '#fff' },
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genresList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
