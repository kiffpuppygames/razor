import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Layer from '../objects/layer';
import Ship from '../objects/ship';
import Bullet from '../objects/bullet';

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;  
  cursors: any;
  energyblast: any;
  energyBlastLastSpawned: any;
  turretEnergyBlastLastSpawned: any;
  turretHit: any;
  explosionAnimation: any;
  gameOver: any;

  ship: Ship;
  
  turret1: any;
  turret2: any;
  turret3: any;
  badguy1: any;
  badguy2: any;
  badguy3: any;
  badguy4: any;
  badguy5: any;
  badguy6: any;
  shoot: Phaser.Sound.BaseSound;
  music: Phaser.Sound.BaseSound;
  heroshoot: Phaser.Sound.BaseSound;
  explosion: Phaser.Sound.BaseSound;
  
  p: Phaser.GameObjects.Particles.ParticleEmitterManager;
  
  //Backgrounds
  starField: any;
  farBackground: Layer;
  middleBackground: Layer;
  closeBackground: Phaser.GameObjects.TileSprite;

  turret1_turretblast1: Bullet;
  turret2_turretblast1: Bullet;
  turret2_turretblast2: Bullet;
  expl: Phaser.Physics.Arcade.Sprite;
  energyblast1: Bullet;
  heroBulletSound: Phaser.Sound.BaseSound;
  turret3_turretblast1: Bullet;
  turret3_turretblast2: Bullet;
  turret1_turretblast2: Bullet;
  energyblast2: Bullet;

  constructor() {
    super({ key: 'MainScene' })

    this.energyBlastLastSpawned = 0;
    this.turretEnergyBlastLastSpawned = 0;
    this.gameOver = false;
  }

  create() {
    /////Template Code

    new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0)

    ////***************

    this.shoot = this.sound.add('shoot');
    this.heroshoot = this.sound.add('heroshoot');
    this.music = this.sound.add('music');
    this.explosion = this.sound.add('explosion');
    this.heroBulletSound = this.sound.add('heroshoot');
    this.music.play();
    
    this.starField = new Layer(this, 512, 5120, +this.game.config.width, +this.game.config.height, "star-field");
    this.farBackground = new Layer(this, 512, 5120, +this.game.config.width, +this.game.config.height, "far-background");      
    this.middleBackground = new Layer(this, 512, 5120, +this.game.config.width, +this.game.config.height, "middle-background");  
    this.closeBackground = new Layer(this, 512, 5120, +this.game.config.width, +this.game.config.height, "close-background"); 
    
    this.p = this.add.particles('dust-atlas',  new Function('return ' + this.cache.text.get('dust'))());
    this.p.y = 9285;
    this.p.x = 0;        
    
    
    this.cameras.main.setBounds(0, 0, 1024, window.innerHeight);
    //this.cameras.main.zoom = 0.08;
    this.cameras.main.x = 0;
    this.cameras.main.y = -10240 + window.innerHeight;

    this.ship = new Ship(this, 512, 10240, 'ship', 300, 0.4);

    this.anims.create({
        key: 'turret',
        frames: this.anims.generateFrameNumbers('turret_top_ss', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: 1
    });
    this.anims.create({
        key: 'explosion',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6 }),
        frameRate: 10,
        repeat: 1
    });
    
    this.turret1 = this.physics.add.sprite(193, 10000, 'turret_top_ss');
    this.turret1.health = 100;
    
    this.turret2 = this.physics.add.sprite(512 + (512 - 193), 10000, 'turret_top_ss');
    this.turret2.health = 100;
    
    this.turret3 = this.physics.add.sprite(600, 9350, 'turret_top_ss');
    this.turret3.health = 100;
    
    this.badguy1 = this.physics.add.sprite(250, 9600, 'badguy1').setScale(0.2);
    this.badguy1.health = 200;
    this.badguy2 = this.physics.add.sprite(350, 9600, 'badguy1').setScale(0.2);
    this.badguy2.health = 200;
    this.badguy3 = this.physics.add.sprite(450, 9600, 'badguy1').setScale(0.2);
    this.badguy3.health = 200;
    this.badguy4 = this.physics.add.sprite(550, 9600, 'badguy1').setScale(0.2);
    this.badguy4.health = 200;
    this.badguy5 = this.physics.add.sprite(650, 9600, 'badguy1').setScale(0.2);
    this.badguy5.health = 200;
    this.badguy6 = this.physics.add.sprite(750, 9600, 'badguy1').setScale(0.2);
    this.badguy6.health = 200;
    
    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();   
  }
    
  update(timestamp) {
    this.fpsText.update()


      if(!this.gameOver)
      {
          //this.layer1.tilePositionY -= 2;
          this.middleBackground.tilePositionY -= 1;
          this.farBackground.tilePositionY -= 0.2;
          this.starField.tilePositionY -= 0.1;
          
          //Point Turrets to Player
          var shipPoint = new Phaser.Geom.Point(this.ship.x,this.ship.y);
          var turretPoint1 = new Phaser.Geom.Point(this.turret1.x, this.turret1.y);
          var rotation = Phaser.Math.Angle.BetweenPoints(shipPoint, turretPoint1);               
          this.turret1.rotation = rotation;
          this.turret1.angle -= 90;
          var turretPoint2 = new Phaser.Geom.Point(this.turret2.x, this.turret2.y);
          var rotation = Phaser.Math.Angle.BetweenPoints(shipPoint, turretPoint2);               
          this.turret2.rotation = rotation;
          this.turret2.angle -= 90;
          var turretPoint3 = new Phaser.Geom.Point(this.turret3.x, this.turret3.y);
          var rotation = Phaser.Math.Angle.BetweenPoints(shipPoint, turretPoint3);               
          this.turret3.rotation = rotation;
          this.turret3.angle -= 90;
          //Turrets Fire
          if (timestamp - this.turretEnergyBlastLastSpawned > 350)
          {                      
              if (Phaser.Math.Distance.Between(this.turret1.x, this.turret1.y, this.ship.x, this.ship.y) < 500)
              {
                  if (!this.turret1.stopShooting) {
                    this.turret1_turretblast1 = new Bullet(this, this.turret1.x + 25, this.turret1.y - 15, 'energyblast', 0.045, this.shoot);
                    this.physics.add.overlap(this.ship, this.turret1_turretblast1, this.shipHit, undefined, { scope: this, bulletToDestroy: this.turret1_turretblast1 });
                    Phaser.Actions.RotateAround([this.turret1_turretblast1], this.turret1, this.turret1.rotation)
                    this.turret1_turretblast1.rotation += this.turret1.rotation;  
                    var velocity1 = this.physics.velocityFromRotation(this.turret1.rotation - 1.55, 600);
                    this.turret1_turretblast1.fire(velocity1.x, velocity1.y);
                
                    this.turret1_turretblast2 = new Bullet(this, this.turret1.x - 20, this.turret1.y - 20, 'energyblast', 0.045, this.shoot);
                    this.physics.add.overlap(this.ship, this.turret1_turretblast2, this.shipHit, undefined, { scope: this, bulletToDestroy: this.turret1_turretblast2 });
                    Phaser.Actions.RotateAround([this.turret1_turretblast2], this.turret1, this.turret1.rotation)
                    this.turret1_turretblast2.rotation += this.turret1.rotation;  
                    var velocity1 = this.physics.velocityFromRotation(this.turret1.rotation - 1.55, 600);
                    this.turret1_turretblast2.fire(velocity1.x, velocity1.y);
                  }
              }
              if (Phaser.Math.Distance.Between(this.turret2.x, this.turret2.y, this.ship.x, this.ship.y) < 500)
              {
                  if (!this.turret2.stopShooting) {
                      this.turret2_turretblast1 = new Bullet(this, this.turret2.x + 25, this.turret2.y - 15, 'energyblast', 0.045, this.shoot);
                      this.physics.add.overlap(this.ship, this.turret2_turretblast1, this.shipHit, undefined, { scope: this, bulletToDestroy: this.turret2_turretblast1 });
                      Phaser.Actions.RotateAround([this.turret2_turretblast1], this.turret2, this.turret2.rotation)  
                      this.turret2_turretblast1.rotation += this.turret2.rotation;       
                      var velocity2 = this.physics.velocityFromRotation(this.turret2.rotation - 1.55, 600);
                      this.turret2_turretblast1.fire(velocity2.x, velocity2.y);

                      this.turret2_turretblast2 = new Bullet(this, this.turret2.x - 20, this.turret2.y - 20, 'energyblast', 0.045, this.shoot);
                      this.physics.add.overlap(this.ship, this.turret2_turretblast2, this.shipHit, undefined, { scope: this, bulletToDestroy: this.turret2_turretblast2 });
                      Phaser.Actions.RotateAround([this.turret2_turretblast2], this.turret2, this.turret2.rotation)
                      this.turret2_turretblast2.rotation += this.turret2.rotation;  
                      var velocity2 = this.physics.velocityFromRotation(this.turret2.rotation - 1.55, 600);
                      this.turret2_turretblast2.fire(velocity2.x, velocity2.y);
                  }
              }
              if (Phaser.Math.Distance.Between(this.turret3.x, this.turret3.y, this.ship.x, this.ship.y) < 500)
              {
                  if (!this.turret3.stopShooting) {    
                      this.turret3_turretblast1 = new Bullet(this, this.turret3.x + 25, this.turret3.y - 15, 'energyblast', 0.045, this.shoot);
                      this.physics.add.overlap(this.ship, this.turret3_turretblast1, this.shipHit, undefined, { scope: this, bulletToDestroy: this.turret3_turretblast1 });
                      Phaser.Actions.RotateAround([this.turret3_turretblast1], this.turret3, this.turret3.rotation)  
                      this.turret3_turretblast1.rotation += this.turret3.rotation;       
                      var velocity2 = this.physics.velocityFromRotation(this.turret3.rotation - 1.55, 600);
                      this.turret3_turretblast1.fire(velocity2.x, velocity2.y);

                      this.turret3_turretblast2 = new Bullet(this, this.turret3.x - 20, this.turret3.y - 20, 'energyblast', 0.045, this.shoot);                      
                      this.physics.add.overlap(this.ship, this.turret3_turretblast2, this.shipHit, undefined, { scope: this, bulletToDestroy: this.turret3_turretblast1 });
                      Phaser.Actions.RotateAround([this.turret3_turretblast2], this.turret3, this.turret3.rotation)
                      this.turret3_turretblast2.rotation += this.turret3.rotation;  
                      var velocity2 = this.physics.velocityFromRotation(this.turret3.rotation - 1.55, 600);
                      this.turret3_turretblast2.fire(velocity2.x, velocity2.y);
                  }
              }
              this.turretEnergyBlastLastSpawned = timestamp;
          }
          
          if (this.cursors.space.isDown) {
              if (timestamp - this.energyBlastLastSpawned > 150)
              {                  
                  this.energyblast1 = new Bullet(this, this.ship.x - 42, this.ship.y - 20, 'energyblast', 0.045, this.heroBulletSound); 
                  this.physics.add.overlap(this.energyblast1, this.turret1, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.turret1});   
                  this.physics.add.overlap(this.energyblast1, this.turret2, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.turret2});
                  this.physics.add.overlap(this.energyblast1, this.turret3, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.turret3});
                  this.physics.add.overlap(this.energyblast1, this.badguy1, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.badguy1});
                  this.physics.add.overlap(this.energyblast1, this.badguy2, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.badguy2});
                  this.physics.add.overlap(this.energyblast1, this.badguy3, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.badguy3});
                  this.physics.add.overlap(this.energyblast1, this.badguy4, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.badguy4});
                  this.physics.add.overlap(this.energyblast1, this.badguy5, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.badguy5});
                  this.physics.add.overlap(this.energyblast1, this.badguy6, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast1, enemyhit: this.badguy6});
                  this.energyblast1.fire(this.ship.body.velocity.x, -800);
                  
                  this.energyblast2 = new Bullet(this, this.ship.x + 42, this.ship.y - 20, 'energyblast', 0.045, this.heroBulletSound);
                  this.physics.add.overlap(this.energyblast2, this.turret1, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit: this.turret1});
                  this.physics.add.overlap(this.energyblast2, this.turret2, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit: this.turret2});
                  this.physics.add.overlap(this.energyblast2, this.turret3, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit: this.turret3});
                  this.physics.add.overlap(this.energyblast2, this.badguy1, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit: this.badguy1});
                  this.physics.add.overlap(this.energyblast2, this.badguy2, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit: this.badguy2});
                  this.physics.add.overlap(this.energyblast2, this.badguy3, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit: this.badguy3});
                  this.physics.add.overlap(this.energyblast2, this.badguy4, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit: this.badguy4});
                  this.physics.add.overlap(this.energyblast2, this.badguy5, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit: this.badguy5});
                  this.physics.add.overlap(this.energyblast2, this.badguy6, this.enemyHit, undefined, { scope: this, bulletToDestroy: this.energyblast2, enemyhit : this.badguy6});
                  this.energyblast2.fire(this.ship.body.velocity.x, -800);  
                  
                  this.energyBlastLastSpawned = timestamp;
              }
          }
          if (this.cameras.main.y < 0) {
            this.cameras.main.y += 0;
            this.p.y -= 0;
              
          }
          try {
              if (this.cameras.main.y < 0 && this.cursors.down.isUp && this.cursors.up.isUp && this.cursors.right.isUp && this.cursors.left.isUp) {            
                  this.ship.setVelocityY(0);
                  this.ship.setVelocityX(0);                  
              } else if (this.cameras.main.y < 0) {
                  if (this.cursors.left.isDown)
                  {
                      this.ship.setVelocityX(-600);                
                  }
                  else if (this.cursors.right.isDown)
                  {
                      this.ship.setVelocityX(600);                
                  }
                  else
                  {               
                      this.ship.setVelocityX(0);                
                  }
                  if (this.cursors.up.isDown)
                  {
                      this.ship.setVelocityY(-600);                
                  }  
                  else if (this.cursors.down.isDown)
                  {
                      this.ship.setVelocityY(600);              
                  } 
                  else
                  {     
                      this.ship.setVelocityY(0);                
                  }
              } else {
                  if (this.cursors.left.isDown)
                  {
                      this.ship.setVelocityX(-600);                
                  }
                  else if (this.cursors.right.isDown)
                  {
                      this.ship.setVelocityX(600);                
                  }
                  else 
                  {
                      this.ship.setVelocityX(0);                
                  }
                  if (this.cursors.up.isDown)
                  {
                      this.ship.setVelocityY(-600);                
                  }  
                  else if (this.cursors.down.isDown)
                  {
                      this.ship.setVelocityY(600);              
                  } 
                  else 
                  {
                      this.ship.setVelocityY(0);
                  }
              }
          }
          catch
          {
              
          }
      }
  }

  shipHit(ship, bulletToDestroy) {
    // @ts-ignore
    var scope = this.scope;

    bulletToDestroy.destroy();    
    ship.health -= bulletToDestroy.damage;
    if (ship.health > 0)
    {
      // @ts-ignore
      var tween = scope.tweens.add({
          targets: ship,
          test: ship.setTint(0xff0000),
          //alpha: { start: 1, to: 0 },
          // alpha: 1,
          // alpha: '+=1',
          ease: 'Cubic.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 100,
          repeat: 0,            // -1: infinity
          yoyo: false,
          onComplete: function() { ship.setTint(0xffffff); }
      });
    }
    else
    {
      scope.cameras.main.shake(400, 0.01);        
      var expl = scope.physics.add.sprite(ship.x, ship.y, 'explosion');
      ship.destroy();
      expl.on('animationcomplete', function() { expl.destroy(); }, null);
      scope.explosion.play();
      expl.anims.play('explosion');
      scope.gameOver = true;
    }
  }

  enemyHit(bulletToDestroy, enemyHit) {  
    // @ts-ignore
    var scope = this.scope; 
    
    if (enemyHit.health <= 0) {
      scope.cameras.main.shake(300, 0.001);
      enemyHit.stopShooting = true;
      
      var expl = scope.physics.add.sprite(enemyHit.x, enemyHit.y, 'explosion');
      enemyHit.destroy();
      expl.on('animationcomplete', function () { expl.destroy(); }, this);
      scope.explosion.play();
      expl.anims.play('explosion');
    }
    else {      
      enemyHit.health -= bulletToDestroy.damage;
      var tween = scope.tweens.add({
          targets: enemyHit,
          test: enemyHit.setTint(0xff0000),
          //alpha: { start: 1, to: 0 },
          // alpha: 1,
          // alpha: '+=1',
          ease: 'Cubic.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 100,
          repeat: 0,            // -1: infinity
          yoyo: true,  
          onComplete: function () {enemyHit.setTint(0xffffff);}          
      });
    }
    bulletToDestroy.destroy();
  }
}