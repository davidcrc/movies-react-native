import React from 'react'
import { View, Text } from 'react-native'

const MovieScreen = (props) => {
  console.log("props movie", props.route.params)
  const { id } = props.route.params
  return (
    <View>
      <Text>MovieScreen {id}</Text>
    </View>
  )
}

export default MovieScreen
