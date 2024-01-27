const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events } = Matter;

const engine = Engine.create();
const runner = Runner.create();
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false
  }
});

Render.run(render);
Runner.run(runner, engine);

let gravityX = 0;
let gravityY = 0.5;

// Create objects
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 20, window.innerWidth, 40, { isStatic: true });

// Add objects to the world
World.add(engine.world, [ground]);

// Change gravity
engine.world.gravity.x = gravityX;
engine.world.gravity.y = gravityY;

// Function to update gravity
function updateGravity() {
  engine.world.gravity.x = gravityX;
  engine.world.gravity.y = gravityY;
}

// Event listeners for gravity input fields
document.getElementById('gravityX').addEventListener('input', (event) => {
  gravityX = parseFloat(event.target.value);
  updateGravity();
});

document.getElementById('gravityY').addEventListener('input', (event) => {
  gravityY = parseFloat(event.target.value);
  updateGravity();
});

// Mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

World.add(engine.world, mouseConstraint);

// Add mouse control and collision events
Events.on(engine, 'collisionStart', (event) => {
  const pairs = event.pairs;
  pairs.forEach(pair => {
    const { bodyA, bodyB } = pair;
    if (bodyA.render && bodyB.render) {
      bodyA.render.fillStyle = 'red';
      bodyB.render.fillStyle = 'red';
    }
  });
});

Events.on(engine, 'collisionEnd', (event) => {
  const pairs = event.pairs;
  pairs.forEach(pair => {
    const { bodyA, bodyB } = pair;
    if (bodyA.render && bodyB.render) {
      bodyA.render.fillStyle = 'blue';
      bodyB.render.fillStyle = 'blue';
    }
  });
});

// Simulation control
document.getElementById('pauseButton').addEventListener('click', () => {
  Runner.stop(runner);
});

document.getElementById('resumeButton').addEventListener('click', () => {
  Runner.start(runner, engine);
});

document.getElementById('speedRange').addEventListener('input', (event) => {
  const speed = parseFloat(event.target.value);
  Runner.speed(runner, speed);
});
