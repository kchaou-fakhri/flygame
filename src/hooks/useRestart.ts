import Matter from "matter-js";
import { Dimensions } from "react-native";
import Ball from "../components/ball";
import Obstacle from "../components/obstacle";

import Floor from "../components/floor";
import { COLORS } from "../utils/colors";
import { getPipeSizePosPair } from "./useRandom";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default (restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;

  world.gravity.y = 0.4;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * -3);
  return {
    physics: { engine, world },

    Ball: Ball(
      world,
      "green",
      { x: windowWidth / 2, y: 300 },
      { height: 40, width: 40 }
    ),
    ObstacleTop1: Obstacle(
      world,
      "ObstacleTop1",
      COLORS.Red,
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size
    ),
    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      COLORS.Blue,
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size
    ),

    ObstacleTop2: Obstacle(
      world,
      "ObstacleTop2",
      "red",
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size
    ),
    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      "blue",
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size
    ),
    Floor: Floor(
      world,
      COLORS.Green,
      { x: windowWidth / 2, y: windowHeight },
      { height: 50, width: windowWidth }
    ),

    FloorTop: Floor(
      world,
      COLORS.Green,
      { x: windowWidth / 2, y: 0 },
      { height: 50, width: windowWidth }
    ),
  };
};
