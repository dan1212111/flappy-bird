import React from "react"
import { View, Image } from "react-native"
import bird from '/Users/danielmccarthy/my_app/images/flappy-bird-transparentBackground.png'

export default function Bird(props) {
  const { birdLeftSide, birdBottom } = props
  const birdWidth = 50
  const birdHeight = 50

  return (
    <View
      style={{
        position: "absolute",
        width: birdWidth,
        height: birdHeight,
        left: birdLeftSide - (birdWidth/2),
        bottom: birdBottom - (birdHeight/2),
      }}
    ><Image source={bird} style={{width: 50, height: 50}} /></View>
  )
}
