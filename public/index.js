var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 600,
    backgroundColor: "#000044",
    physics: {
      default: 'matter',
      matter: {
        debug: true
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ball', 'assets/blue_ball.png');
    this.load.image('bar', 'assets/bluebar.png');
    this.load.image('platform', 'assets/platform.png');
}

function create ()
{
  /* set the bounds of our Matter.js world */
  this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
  document.querySelector("canvas").style.border = "10px solid green";
  this.add.text(100, 30, 'Try to keep the pendulum up! Use the left/right arrow keys');

  /* make a moveable platform (don't let it rotate) */
  this.platform = this.matter.add.image(400, config.height, 'platform');
  this.platform.setFixedRotation();
  this.platform.setMass(8000);

  /* add a pendulum head */
  this.pendulumHead = this.matter.add.image(400, 50, 'ball');
  this.pendulumHead.setCircle();
  this.pendulumHead.setScale(6);
  this.pendulumHead.setMass(8000);


  /* Give the pendulum an initial velocity from 20 to 60 */
  const startVelocity = Math.floor(Math.random() * 40 + 20);
  this.platform.setVelocityX(startVelocity);

  // TODO how to add joints to a POINT on an object, not THE object??
  this.matter.add.joint(this.platform, this.pendulumHead, 400, 1);

  /* record time */
  this.timeText = {};
  this.maxDelta = 0;
  this.timeText.total = this.add.text(100, 50, `Total time: ${0}`);
  this.timeText.delta = this.add.text(100, 70, `Delta: ${0}`);

  /* set up keyboard input */
  this.cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  if (delta > this.maxDelta) {
    this.maxDelta = delta;
  }
  /* NOTE: You get a time delta here, but I'm not sure if Phaser uses this to move stuff. */
  this.timeText.total.setText(`Total time (ms): ${time.toFixed(2)}`);
  this.timeText.delta.setText(`Delta (ms)     : ${delta.toFixed(2)} (max: ${this.maxDelta.toFixed(2)})`);

  if (this.cursors.left.isDown){
    this.platform.setVelocityX(-20);
  } else if (this.cursors.right.isDown) {
    this.platform.setVelocityX(20);
  } else {
    this.platform.setVelocityX(0);
  }

  /* Do collider physics at the end */
  if (this.pendulumHead.body.position.y > 540 && this.gameOver != true) {
    this.gameOver = true;
    document.querySelector("canvas").style.borderColor = "red";
    document.getElementById("you-lose").style.visibility = "visible";
  }
}
