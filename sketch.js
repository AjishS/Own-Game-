var boy, boyImage, InvisibleGround, score, water, rockImage, crocImage, waterImage, rocksGroup, crocsGroup;
var gameState = "play"
var gameOverImage, gameOver;
var score = 0;

function preload() {
  groundImage = loadImage("bg.jpg");
  boyDieImage = loadAnimation("boy1.png", "boydie2.png")
  boyJumpImage = loadAnimation("boyjump1.png", "boyjump2.png", "boyjump3.png", "boyjump4.png", "boyjump5.png", "boyJump6.png")
  boyRunImage = loadAnimation("boyRun.png", "boyRun2.png", "boyRun3.png")
  rockImage = loadImage("rock.png")
  crocImage = loadImage("croc.png")
  waterImage = loadImage("water.png")
  gameOverImage = loadImage("gameover.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  ground = createSprite(300, 50, 50, 50)
  ground.addImage("ground", groundImage)
  ground.velocityX = -6 + 3, width / 300;
  ground.scale = 1.6;

  invisibleGround = createSprite(200, 720, 400, 10)
  invisibleGround.visible = false;

  gameOver = createSprite(width / 2, height / 2)
  gameOver.addImage("gameOver", gameOverImage)
  gameOver.scale = 0.5

  gameOver.visible = false;

  boy = createSprite(300, 590)
  boy.addAnimation("run", boyRunImage)
  boy.addAnimation("jump", boyJumpImage)
  boy.addAnimation("boy", boyDieImage)
  boy.debug = true;

  rocksGroup = new Group();
  crocGroup = new Group();


}

function draw() {
  background("black")

  drawSprites();

  fill("white")
  textSize(35)
  text("Score: " + score, 1250, 70)

  if (gameState === "play") {

    score = score + Math.round(getFrameRate() / 60)


    boy.changeAnimation("run", boyRunImage)

    if (ground.x < 0) {
      ground.x = width / 2
    }
    spawnRocks();

    if (keyDown("space")) {
      boy.velocityY = -11
      boy.changeAnimation("jump", boyJumpImage);
    }

    boy.collide(invisibleGround)

    boy.velocityY = boy.velocityY + 0.8

    if (rocksGroup.isTouching(boy)) {
      gameState = "end"
    }

  }
  if (gameState === "end") {
    boy.changeAnimation("boy", boyDieImage)
    gameOver.visible = true
  }

}

function spawnRocks() {

  if (frameCount % Math.round(random(115, 250)) === 0) {
    var rock = createSprite(width, 680, 40, 10);

    rock.addImage(rockImage);
    rock.scale = 0.5;
    rock.velocityX = -3;


    rock.lifetime = width;

    rocksGroup.add(rock);
  }

}



