import React from "react"
import { View } from "react-native"
import { useState, useEffect } from "react"

export default function Obstacles(props) {
const { screenWidth, screenHeight, birdBottom, setGameOver, setScore } = props
const [obstacles, setObstacles] = useState(screenWidth)
const [obstaclesTwo, setObstaclesTwo] = useState(screenWidth + screenWidth/2 + 30)
const [obstaclesHeightNeg, setObstaclesHeightNeg] = useState(0)
const [obstaclesHeightNegTwo, setObstaclesHeightNegTwo] = useState(0)
const obstacleWidth = 60
const obstacleHeight = 300
const gap = 200
let obstacleLeftTimer
let obstacleLeftTimerTwo

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
      setScore(score => score + 1)
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
      setScore(score => score + 1)
    }
  }, [obstaclesTwo])

  //check for collisions
  useEffect(() => {
    if (
      ((birdBottom < (obstaclesHeightNeg + obstacleHeight + 30) ||
      birdBottom > (obstaclesHeightNeg + obstacleHeight + gap -30)) &&
      (obstacles > screenWidth/2 -30 && obstacles < screenWidth/2 + 30 )
      )
      || 
      ((birdBottom < (obstaclesHeightNegTwo + obstacleHeight + 30) ||
      birdBottom > (obstaclesHeightNegTwo + obstacleHeight + gap -30)) &&
      (obstaclesTwo > screenWidth/2 -30 && obstaclesTwo < screenWidth/2 + 30 )
      )
      ) 
      {
      console.log('game over')
      gameOver()
    }
  })

const gameOver = () => {
  setGameOver(true)
  clearInterval(obstacleLeftTimer)
  clearInterval(obstacleLeftTimerTwo) 
}


  return (
    <>
      <View
        style={{
          position: "absolute",
          backgroundColor: "green",
          width: obstacleWidth,
          height: 500,
          left: obstacles,
          bottom: obstaclesHeightNeg + obstacleHeight + gap,
        }}
      />
      <View
        style={{
          position: "absolute",
          backgroundColor: "green",
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstacles,
          bottom:  obstaclesHeightNegTwo,
        }}
      />
    </>
  )
      }
