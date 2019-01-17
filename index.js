var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
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
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

var logo;
function create ()
{
  /* make the sky */
  this.add.image(400, 300, 'sky');

  /* make the logo */
  logo = this.physics.add.image(400, 100, 'logo');
  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  /* make a particle emitter and attach it to the logo */
  var particles = this.add.particles('red');
  var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
  });
  emitter.startFollow(logo);

  /* set up keyboard input */
  this.cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {

  if (this.cursors.left.isDown) {
    console.log(`Time: ${time}. Delta: ${delta}`);
  }

  //Collider physics happens at the end
}
