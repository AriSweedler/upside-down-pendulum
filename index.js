var config = {
    type: Phaser.AUTO,
    width: 800,
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

  /* make a moveable platform (don't let it rotate) */
  this.platform = this.matter.add.image(400, config.height, 'platform', null, { ignoreGravity: true });
  this.platform.setFixedRotation();
  this.platform.setMass(500);

  /* add a pendulum head */
  this.pendulumHead = this.matter.add.image(400, 50, 'ball');
  this.pendulumHead.setCircle();
  this.pendulumHead.setScale(6); //make it 4 times bigger
  this.pendulumHead.setMass(100);

  /* attach a pole to the bottom of the ball, and to the top of the platform */
  this.pendulumNeck = this.matter.add.image(300, 150, 'bar');
  this.pendulumNeck.setScale(4, 1); //make it 4 times longer
  this.pendulumNeck.setMass(10);

  this.matter.add.joint(this.pendulumHead, this.pendulumNeck, 60, 0.5);
  // this.matter.add.joint(this.platform, this.pendulumNeck, 70, 0.5);
  //TODO how to add joints to a POINT on an object, not THE object??

  /* set up keyboard input */
  this.cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {

  if (this.cursors.left.isDown) {
    console.log(`Time: ${time}. Delta: ${delta}`);
  }

  if (this.cursors.left.isDown){
    this.platform.setVelocityX(-20);
  } else if (this.cursors.right.isDown) {
    this.platform.setVelocityX(20);
  } else {
    this.platform.setVelocityX(0);
  }

  if (this.cursors.up.isDown){
    this.platform.setVelocityY(-20);
  } else if (this.cursors.down.isDown) {
    this.platform.setVelocityY(20);
  } else {
    this.platform.setVelocityY(0);
  }

  //Collider physics happens at the end
  if (this.pendulumHead.body.position.y > 500) {
    console.log("you lose");
  }
}
