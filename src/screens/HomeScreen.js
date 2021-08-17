import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { getNewsMovieApi } from '../api/movies';

const HomeScreen = () => {

  const [newMovies, setNewMovies] = useState(null)

  const getNewsMovies = async () => {
    const response = await getNewsMovieApi()
    return response.results
  }

  useEffect(() => {
    setNewMovies(getNewsMovies())
  }, [])

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen
