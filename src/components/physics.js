import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "../hooks/useRandom";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Physics = (restart, { touches, time, dispatch }) => {
  let engine = restart.physics.engine;
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(restart.Ball.body, {
        x: 0,
        y: -5,
      });
    });

  for (let index = 1; index <= 2; index++) {
    if (
      restart[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
      !restart[`ObstacleTop${index}`].point
    ) {
      restart[`ObstacleTop${index}`].point = true;
      dispatch({ type: "new_point" });
    }
    if (restart[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      Matter.Body.setPosition(
        restart[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      );

      Matter.Body.setPosition(
        restart[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      );
    }
    Matter.Body.translate(restart[`ObstacleTop${index}`].body, {
      x: -2,
      y: 0,
    });

    Matter.Body.translate(restart[`ObstacleBottom${index}`].body, {
      x: -2,
      y: 0,
    });
  }

  Matter.Engine.update(engine, time.delta);

  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({ type: "game_over" });
  });
  return restart;
};

export default Physics;
