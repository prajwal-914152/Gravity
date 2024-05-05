const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = [
    '#a2d2ff', '#bde0fe', '#ffafcc', '#ffc8dd', '#cdb4db', '#000', '#fff'
]

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

//utility functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
  }




// Objects
var gravity = 0.1;
var friction = 0.9  ;
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height ){
      this.dy = -this.dy * friction ;
    } else {
      this.dy += gravity;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

addEventListener("click", function() {
  init();
})

// Implementation
var ball;
var ballArray;
function init() {
  ballArray = [];
  for (var i = 0; i < 150; i++){
    var radius = randomIntFromRange(10, 35);
    var x = randomIntFromRange(radius, canvas.width - radius);
    var y = randomIntFromRange(0, canvas.height - radius);
    var dx = randomIntFromRange(-2 , 2);
    var dy = randomIntFromRange(-2 , 2);
    var color = randomColor(colors);
    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
  // console.log(ballArray);
    //  ball = new Ball(canvas.width/2, canvas.height/2, 1, 30, 'black');
    
    // for (let i = 0; i < 400; i++) {
    //     ball.push()
    //   }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height)
  // ball.update();

  for (var i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }
//   c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  
  //   objects.forEach(object => {
//   })
}

init()
animate()