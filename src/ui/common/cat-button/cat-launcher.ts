import Matter from 'matter-js';
import catImage from './cat.png';

const { Engine, Events, Runner, Composite, World, Bodies, Body } = Matter;

interface XY {
  x: number;
  y: number;
}

export class CatLauncher {
  private engine: Matter.Engine;
  private world: Matter.World;
  private imageSize: number = 40;
  private domElements: Record<string, HTMLImageElement> = {};
  private tickCounter: number = 0;
  private width!: number;
  private height!: number;
  private bounds!: { min: XY; max: XY };
  private container: HTMLElement;
  private runner: Matter.Runner;
  private running: boolean = false;
  private line!: Matter.Body;

  constructor(container: HTMLElement) {
    this.container = container;
    this.engine = Engine.create();
    this.engine.timing.timeScale = 0.7;
    this.world = this.engine.world;
    this.updateBounds();
    window.addEventListener('resize', this.updateBounds.bind(this));

    this.runner = Runner.create();
    Runner.run(this.runner, this.engine);

    this.running = true;
    this.run();
    this.addBottomSensor();

    Events.on(this.engine, 'collisionStart', this.handleCollision.bind(this));
  }

  private addBottomSensor() {
    if (this.line) {
      World.remove(this.world, this.line);
    }
    // Create the line
    this.line = Bodies.rectangle(
      -50,
      this.container.clientHeight + 25,
      this.container.clientWidth * 2 + 100,
      50,
      {
        isStatic: true,
        collisionFilter: {
          category: 0x00_01,
          mask: 0x00_01,
        },
        render: {
          fillStyle: 'blue',
        },
        isSensor: true,
      },
    );
    World.add(this.world, this.line);
  }

  private handleCollision(event: Matter.IEventCollision<Matter.Engine>) {
    const pairs = event.pairs;

    for (const pair of pairs) {
      const { bodyA, bodyB } = pair;
      const object = bodyA === this.line ? bodyB : bodyA;
      const lineTop = this.line.position.y - (this.line.bounds.max.y - this.line.bounds.min.y) / 2;

      // Check if the object is coming from the top
      if (object.position.y < lineTop && object.velocity.y > 0) {
        // Bounce effect (reverse the velocity)
        Body.setVelocity(object, {
          x: object.velocity.x * 1.2 + (object.velocity.x > 0 ? 0.9 : -0.9),
          y: -object.velocity.y * 0.8 + 0.01,
        });
        Body.setAngularVelocity(
          object,
          object.angularVelocity + (object.velocity.x > 0 ? 0.03 : -0.03),
        );
      } else {
        Body.setAngularVelocity(object, object.angularVelocity * 1.03);
      }
    }
  }

  private run() {
    const fixedTimeStep = 1000 / 60; // 60 FPS
    let lastTime = performance.now();

    const tick = (time: number) => {
      if (this.running) {
        const deltaTime = time - lastTime;
        lastTime = time;

        Engine.update(this.engine, fixedTimeStep, deltaTime / fixedTimeStep);
        this.onTick();

        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }

  private updateBounds() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.bounds = {
      min: { x: -this.imageSize * 2, y: -this.imageSize * 5 },
      max: { x: this.width + this.imageSize * 2, y: this.height + this.imageSize * 2 },
    };

    this.world.bounds = this.bounds;
    this.addBottomSensor();
  }

  private calculateVelocity(from: XY, to: XY, slowdownFactor = 35) {
    return {
      x: (to.x - from.x) / slowdownFactor,
      y: -(from.y - to.y) / slowdownFactor,
    };
  }

  private getRandomPosition() {
    const totalArea = this.height + this.width + this.imageSize * 2;
    // eslint-disable-next-line sonarjs/pseudo-random
    const randomPoint = Math.floor(Math.random() * totalArea);

    if (randomPoint <= this.height / 2) {
      return { x: this.imageSize / 2, y: randomPoint + this.height / 2 };
    } else if (randomPoint <= this.height) {
      return { x: this.width + this.imageSize / 2, y: randomPoint };
    } else {
      return { x: randomPoint - this.height, y: this.height + this.imageSize / 2 };
    }
  }

  private moveElement(body_id: number, x: number, y: number, angle: number) {
    const radToDeg = (angle: number) => angle * (180 / Math.PI);

    if (this.domElements[body_id]) {
      this.domElements[body_id].style.transform =
        `translate(${x - this.imageSize}px, ${y - this.imageSize}px) rotate(${radToDeg(angle)}deg)`;
    }
  }

  private addElement(body_id: number, position: XY, angle: number) {
    const element = document.createElement('img');
    element.src = catImage;
    element.style.cssText = `height: ${this.imageSize * 2}px; width: ${this.imageSize * 2}px; position: absolute; pointer-events: none;`;
    this.domElements[body_id] = element;
    this.moveElement(body_id, position.x, position.y, angle);
    this.container.append(element as any);
  }

  public launchCat() {
    const startPosition = this.getRandomPosition();
    const catBody = Bodies.circle(startPosition.x, startPosition.y, this.imageSize, {
      density: 0.001,
      frictionAir: 0.003,
      restitution: 0.2,
      friction: 0.01,
    });

    this.addElement(catBody.id, startPosition, catBody.angle);

    Body.setVelocity(
      catBody,
      this.calculateVelocity(startPosition, { x: this.width / 2, y: this.height / 4 }),
    );

    World.add(this.world, catBody);
  }

  private onTick() {
    this.tickCounter++;
    Composite.allBodies(this.world).forEach((body) => {
      const { x, y } = body.position;
      this.moveElement(body.id, x, y, body.angle);
    });

    if (!(this.tickCounter % 25)) {
      Composite.allBodies(this.world).forEach((body) => {
        if (
          body.position.x < this.bounds.min.x ||
          body.position.x > this.bounds.max.x ||
          body.position.y < this.bounds.min.y ||
          body.position.y > this.bounds.max.y
        ) {
          this.domElements[body.id].remove();
          delete this.domElements[body.id];
          Composite.remove(this.world, body);
        }
      });
    }
  }

  public cleanup() {
    Runner.stop(this.runner);
    // eslint-disable-next-line unicorn/no-invalid-remove-event-listener
    window.removeEventListener('resize', this.updateBounds.bind(this));
  }
}
