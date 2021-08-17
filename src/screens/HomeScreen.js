import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Title } from 'react-native-paper';
import { getNewsMovieApi } from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';

const HomeScreen = () => {

  const [newsMovies, setNewsMovies] = useState(null)

  const getNewsMovies = async () => {
    const response = await getNewsMovieApi()
    // console.log("\nAQUI EL RES", response.results)
    setNewsMovies(response.results)
  }

  useEffect(() => {
    getNewsMovies()
    
    // // Para usar con then
    // getNewsMovies().then( (response) => {
    //   console.log("AQUI EL THEN", response)
    // })
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      { newsMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle} >Nuevas peliculas</Title>
          <CarouselVertical data={newsMovies} />
        </View>
      ) }
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  }
})