import Entity from "./entity";
import System from "./system";
import { Component } from "./component";

export default class World {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  entities: Record<string, Entity>;
  mouse: { x: number; y: number };
  systems: System[];

  constructor(
    canvas: HTMLCanvasElement,
    entities: Record<string, Entity>,
    systems: System[]
  ) {
    canvas.style.cursor = "none";
    canvas.style.backgroundColor = "#aaa";
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.entities = entities;
    this.mouse = { x: -100, y: -100 };
    this.systems = systems;

    const canvasRect = canvas.getBoundingClientRect();
    this.canvas.addEventListener("mousemove", ev => {
      this.mouse.x = ev.clientX - canvasRect.left;
      this.mouse.y = ev.clientY - canvasRect.top;
    });
  }

  add(entity: Entity) {
    this.entities[entity.id] = entity;
  }

  getEntities<C extends Component>(
    ...components: (new (...args: any) => C)[]
  ): Entity[] {
    return Object.values(this.entities).filter(entity =>
      components.every(component => entity.has(component))
    );
  }

  removeEntity(id: string) {
    delete this.entities[id];
  }

  tick() {
    this.systems.forEach(system => system(this));
  }
}