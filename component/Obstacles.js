import React from "react"
import { View, Image } from "react-native"
import { useState, useEffect } from "react"
import Pipe from "/Users/danielmccarthy/flappy-bird/component/images/flappy-bird-pipe-png.png"
import PipeReversed from '/Users/danielmccarthy/flappy-bird/component/images/flappy-bird-pipe-reversed.png'

export default function Obstacles(props) {
  const { screenWidth, birdBottom, setGameOver, setScore } = props
  const [obstaclesOne, setObstacles] = useState(screenWidth)
  const [obstaclesTwo, setObstaclesTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  )
  const [obstaclesHeightNeg, setObstaclesHeightNeg] = useState(0)
  const [obstaclesHeightNegTwo, setObstaclesHeightNegTwo] = useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300
  const gap = 200
  let obstacleTimerOne
  let obstacleTimerTwo

  // ONE
  useEffect(() => {
    if (obstaclesOne > -obstacleWidth) {
      obstacleTimerOne = setInterval(() => {
        setObstacles((obstaclesOne) => obstaclesOne - 5)
      }, 30)
      return () => {
        clearInterval(obstacleTimerOne)
      }
    } else {
      setObstacles(screenWidth)
      setObstaclesHeightNeg(-Math.random() * 100)
      setScore((score) => score + 1)
    }
  }, [obstaclesOne])

  //TWO
  useEffect(() => {
    if (obstaclesTwo > -obstacleWidth) {
      obstacleTimerTwo = setInterval(() => {
        setObstaclesTwo((obstaclesTwo) => obstaclesTwo - 5)
      }, 30)
      return () => {
        clearInterval(obstacleTimerTwo)
      }
    } else {
      setObstaclesTwo(screenWidth)
      setObstaclesHeightNegTwo(-Math.random() * 100)
      setScore((score) => score + 1)
    }
  }, [obstaclesTwo])

  //check for collisions
  useEffect(() => {
    if (
      ((birdBottom < obstaclesHeightNeg + obstacleHeight + 30 ||
        birdBottom > obstaclesHeightNeg + obstacleHeight + gap - 30) &&
        obstaclesOne > screenWidth / 2 - 30 &&
        obstaclesOne < screenWidth / 2 + 30) ||
      ((birdBottom < obstaclesHeightNegTwo + obstacleHeight + 30 ||
        birdBottom > obstaclesHeightNegTwo + obstacleHeight + gap - 30) &&
        obstaclesTwo > screenWidth / 2 - 30 &&
        obstaclesTwo < screenWidth / 2 + 30)
    ) {
      console.log("game over")
      gameIsOver()
    }
  })

  function gameIsOver() {
    setGameOver("true")
    clearInterval(obstacleTimerOne)
    clearInterval(obstacleTimerTwo)
  }

  return (
    <>
      <View
        style={{
          position: "absolute",
          backgroundColor: "green",
          width: obstacleWidth,
          height: 500 ,
          left: obstaclesOne,
          bottom: obstaclesHeightNeg + obstacleHeight + gap,
        }}
      ><Image source={PipeReversed} style={{width: obstacleWidth, height: 500}} /></View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "green",
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesOne,
          bottom: obstaclesHeightNeg,
        }}
      ><Image source={Pipe} style={{width: obstacleWidth, height: 500}} /></View>

       <View
        style={{
          position: "absolute",
          backgroundColor: "red",
          width: obstacleWidth,
          height: 500 ,
          left: obstaclesTwo,
          bottom: obstaclesHeightNegTwo + obstacleHeight + gap,
        }}
      ><Image source={PipeReversed} style={{width: obstacleWidth, height: 500}} /></View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "red",
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesTwo,
          bottom: obstaclesHeightNegTwo,
        }}
      ><Image source={Pipe} style={{width: obstacleWidth, height: 500}} /></View>
    </>
  )
}
