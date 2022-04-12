import React from "react"
import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, ImageBackground } from "react-native"
import Bird from "./component/Bird"
import Obstacles from "./component/Obstacles"
import background from "/Users/danielmccarthy/my_app/images/flappy-bird-background.png"

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  /* setting bird in middle of screen + timer */
  const birdLeftSide = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const [gameOver, setGameOver] = useState('false')
  const [score, setScore] = useState(0)
  const gravity = 3
  let timer

  /* making bird fall */
  useEffect(() => {
    if (birdBottom > 0 && gameOver === 'false') {
      timer = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(timer)
      }
    }
  }, [birdBottom])

/* making bird jump */
function jump () {
  if(gameOver === 'false' && birdBottom < screenHeight) {
    setBirdBottom(birdBottom => birdBottom + 50)
  }
}


  return (
    <TouchableWithoutFeedback onPress={jump}> 
    <View style={styles.container}>
    <ImageBackground
        style={{flex: 1}}
        source={
          background
            }/>
      {gameOver === 'true' && <Text style={{fontSize: '50px', position: 'absolute'}}> Score: {score}</Text>}
      <Bird birdLeftSide={birdLeftSide} birdBottom={birdBottom} />
      <Obstacles screenWidth={screenWidth} screenHeight={screenHeight} birdBottom={birdBottom} setGameOver={setGameOver} setScore={setScore}/>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    // backgroundColor: 'white',
    // alignItems: "center",
    // justifyContent: "center",
  },
})
