import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const Ball = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        // borderWidth: 1,
        // borderColor: color,
        // borderStyle: "solid",
        // position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        // borderRadius: 20,
      }}
    >
      <Image
        style={{
          width: 32,
          height: 32,
          bottom: -10,
          transform: [{ rotateY: "180deg" }],
        }}
        source={require("../assets/ball.png")}
      />
    </View>
  );
};

export default (world, color, pos, size) => {
  const initialBall = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Ball" }
  );
  Matter.World.add(world, initialBall);

  return {
    body: initialBall,
    color,
    pos,
    renderer: <Ball />,
  };
};
