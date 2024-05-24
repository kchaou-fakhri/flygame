import Matter from "matter-js";

const Physics = (restart, { touches, time, dispatch }) => {
  let engine = restart.physics.engine;
  touches.forEach((t) => {
    console.log(t.type);
    Matter.Body.setVelocity(restart.Bird.body, {
      x: +1,
      y: -8,
    });
  });
  Matter.Engine.update(engine, time.delta);

  return restart;
};

export default Physics;
