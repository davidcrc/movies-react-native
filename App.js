import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import { Button, Card } from 'react-native-paper'

const App = () => {
  console.log("hola lola")
  return (
    <SafeAreaView>
      <Button icon="facebook" mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>

      <Card>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  )
}

export default App
