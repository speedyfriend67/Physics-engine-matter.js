const { Engine, Render, World, Bodies, Runner } = Matter;

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

// Customizable parameters
let gravityX = 0;
let gravityY = 0.5;

// Create objects
const box = Bodies.rectangle(400, 200, 80, 80);
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 20, window.innerWidth, 40, { isStatic: true });

// Add objects to the world
World.add(engine.world, [box, ground]);

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
