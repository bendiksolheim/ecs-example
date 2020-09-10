import Controlled from "../components/controlled";
import Position from "../components/position";
import { World, system, Entity } from "../ecs";

export default system(
  [Controlled, Position],
  (entities: Entity[], world: World) => {
    entities.forEach((entity) => {
      const mouse = world.mouse;
      const position = entity.get(Position);
      position.x = mouse.x;
    });
  }
);
