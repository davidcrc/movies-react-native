import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import { Button } from 'react-native-paper'

const App = () => {
  console.log("hola lola")
  return (
    <SafeAreaView>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </SafeAreaView>
  )
}

export default App
