import React from "react"
import { View } from "react-native"

export default function Obstacles(props) {
const {obstacles, obstacleWidth, obstacleHeight, gap, obstaclesHeightNeg} = props


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
          bottom:  obstaclesHeightNeg,
        }}
      />
    </>
  )
}
