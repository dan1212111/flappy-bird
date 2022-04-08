

import React from "react"
import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import Bird from "./component/Bird"
import Obstacles from "./component/Obstacles"

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  /* setting bird in middle of screen + timer */
  const birdLeftSide = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const gravity = 3
  let timer
  /* obstacles state */
  const [obstacles, setObstacles] = useState(screenWidth)
  const [obstaclesTwo, setObstaclesTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesHeightNeg, setObstaclesHeightNeg] = useState(0)
  const [obstaclesHeightNegTwo, setObstaclesHeightNegTwo] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  let obstacleLeftTimer
  let obstacleLeftTimerTwo

  /* making bird fall */
  useEffect(() => {
    if (birdBottom > 0) {
      timer = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(timer)
      }
    }
  }, [birdBottom])

  /* adding first set of obstacles */
  // ONE
  useEffect(() => {
    if (obstacles > -obstacleWidth) {
      obstacleLeftTimer = setInterval(() => {
        setObstacles((obstacles) => obstacles - 5)
      }, 30)
      return () => {
        clearInterval(obstacleLeftTimer)
      }
    } else {
      setObstacles(screenWidth)
      setObstaclesHeightNeg( - Math.random() * 100)
    }
  }, [obstacles])

  //TWO
  useEffect(() => {
    if (obstaclesTwo > -obstacleWidth) {
      obstacleLeftTimerTwo = setInterval(() => {
        setObstaclesTwo((obstaclesTwo) => obstaclesTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstacleLeftTimerTwo)
      }
    } else {
      setObstaclesTwo(screenWidth)
      setObstaclesHeightNegTwo( - Math.random() * 100)
    }
  }, [obstaclesTwo])

//check for collisions









  return (
    <View style={styles.container}>
      <Bird birdLeftSide={birdLeftSide} birdBottom={birdBottom} />
      <Obstacles
        obstacles={obstacles}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        obstaclesHeightNeg={obstaclesHeightNeg}
        gap={gap}
      />
      <Obstacles
        obstacles={obstaclesTwo}
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        obstaclesHeightNeg={obstaclesHeightNegTwo}
        gap={gap}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
