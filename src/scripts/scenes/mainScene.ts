import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;  
  cursors: any;
  ship: any;
  energyblast: any;
  energyBlastLastSpawned: any;
  turretEnergyBlastLastSpawned: any;
  turretHit: any;
  explosionAnimation: any;
  gameOver: any;
  
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
  layer4: Phaser.GameObjects.TileSprite;
  layer3: Phaser.GameObjects.TileSprite;
  layer2: Phaser.GameObjects.TileSprite;
  layer1: Phaser.GameObjects.TileSprite;
  p: Phaser.GameObjects.Particles.ParticleEmitterManager;

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
    //this.music.volume = 0.5;
    //this.music.loop = true;
    this.music.play();
    
    this.layer4 = this.add.tileSprite(512, 5120, +this.game.config.width, +this.game.config.height, "layer4"); 
    this.layer3 = this.add.tileSprite(512, 5120, +this.game.config.width, +this.game.config.height, "layer3");        
    this.layer2 = this.add.tileSprite(512, 5120, +this.game.config.width, +this.game.config.height, "layer2");
    this.layer1 = this.add.tileSprite(512, 5120, +this.game.config.width, +this.game.config.height, "layer1");
    this.p = this.add.particles('dust-atlas',  new Function('return ' + this.cache.text.get('dust'))());
    this.p.y = 9285;
    this.p.x = 0;        
    
    this.cameras.main.setBounds(0, 0, 1024, 955);
    //this.cameras.main.zoom = 0.08;
    this.cameras.main.x = 0;
    this.cameras.main.y = -9285;
    this.ship = this.physics.add.sprite(512, 10240, 'ship').setScale(0.3);
    this.ship.health = 300;
    this.ship.setCollideWorldBounds(true);        
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
          this.layer2.tilePositionY -= 1;
          this.layer3.tilePositionY -= 0.2;
          this.layer4.tilePositionY -= 0.1;
          
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
                      var turret1_turretblast1 = this.physics.add.sprite(this.turret1.x + 25, this.turret1.y - 15, 'energyblast').setScale(0.045);
                      this.physics.add.collider(this.ship, turret1_turretblast1, this.shipHit, undefined, { scope: this, bulletToDestroy: turret1_turretblast1 });
                      Phaser.Actions.RotateAround([turret1_turretblast1], this.turret1, this.turret1.rotation)
                      turret1_turretblast1.rotation += this.turret1.rotation;  
                      var velocity1 = this.physics.velocityFromRotation(this.turret1.rotation - 1.55, 600);
                      turret1_turretblast1.setVelocityX(velocity1.x);
                      turret1_turretblast1.setVelocityY(velocity1.y);
                      this.shoot.play();
                  
                      var turret1_turretblast2 = this.physics.add.sprite(this.turret1.x - 20, this.turret1.y - 20, 'energyblast').setScale(0.045);
                      this.physics.add.collider(this.ship, turret1_turretblast2, this.shipHit, undefined, { scope: this, bulletToDestroy: turret1_turretblast2 });
                      Phaser.Actions.RotateAround([turret1_turretblast2], this.turret1, this.turret1.rotation)
                      turret1_turretblast2.rotation += this.turret1.rotation;  
                      var velocity1 = this.physics.velocityFromRotation(this.turret1.rotation - 1.55, 600);
                      turret1_turretblast2.setVelocityX(velocity1.x);
                      turret1_turretblast2.setVelocityY(velocity1.y);
                      this.shoot.play();
                  }
              }
              if (Phaser.Math.Distance.Between(this.turret2.x, this.turret2.y, this.ship.x, this.ship.y) < 500)
              {
                  if (!this.turret2.stopShooting) {
                      var turret2_turretblast1 = this.physics.add.sprite(this.turret2.x + 25, this.turret2.y - 15, 'energyblast').setScale(0.045);
                      this.physics.add.collider(this.ship, turret2_turretblast1, this.shipHit(turret2_turretblast1), undefined, { scope: this, bulletToDestroy: turret2_turretblast1 });
                      Phaser.Actions.RotateAround([turret2_turretblast1], this.turret2, this.turret2.rotation)  
                      turret2_turretblast1.rotation += this.turret2.rotation;       
                      var velocity2 = this.physics.velocityFromRotation(this.turret2.rotation - 1.55, 600);
                      turret2_turretblast1.setVelocityX(velocity2.x);
                      turret2_turretblast1.setVelocityY(velocity2.y);
                      this.shoot.play();
                      var turret2_turretblast2 = this.physics.add.sprite(this.turret2.x - 20, this.turret2.y - 20, 'energyblast').setScale(0.045);
                      this.physics.add.collider(this.ship, turret2_turretblast2, this.shipHit(turret2_turretblast2), undefined, { scope: this, bulletToDestroy: turret2_turretblast2 });
                      Phaser.Actions.RotateAround([turret2_turretblast2], this.turret2, this.turret2.rotation)
                      turret2_turretblast2.rotation += this.turret2.rotation;  
                      var velocity2 = this.physics.velocityFromRotation(this.turret2.rotation - 1.55, 600);
                      turret2_turretblast2.setVelocityX(velocity2.x);
                      turret2_turretblast2.setVelocityY(velocity2.y);
                      this.shoot.play();
                  }
              }
              if (Phaser.Math.Distance.Between(this.turret3.x, this.turret3.y, this.ship.x, this.ship.y) < 500)
              {
                  if (!this.turret3.stopShooting) {                
                      var turret3_turretblast1 = this.physics.add.sprite(this.turret3.x + 25, this.turret3.y - 15, 'energyblast').setScale(0.045);
                      this.physics.add.collider(this.ship, turret3_turretblast1, this.shipHit(turret3_turretblast1), undefined, { scope: this, bulletToDestroy: turret3_turretblast1 });
                      Phaser.Actions.RotateAround([turret3_turretblast1], this.turret3, this.turret3.rotation)  
                      turret3_turretblast1.rotation += this.turret3.rotation;       
                      var velocity2 = this.physics.velocityFromRotation(this.turret3.rotation - 1.55, 600);
                      turret3_turretblast1.setVelocityX(velocity2.x);
                      turret3_turretblast1.setVelocityY(velocity2.y);
                      this.shoot.play();
                      var turret3_turretblast2 = this.physics.add.sprite(this.turret3.x - 20, this.turret3.y - 20, 'energyblast').setScale(0.045);
                      this.physics.add.collider(this.ship, turret3_turretblast2, this.shipHit(turret3_turretblast2), undefined, this);
                      Phaser.Actions.RotateAround([turret3_turretblast2], this.turret3, this.turret3.rotation)
                      turret3_turretblast2.rotation += this.turret3.rotation;  
                      var velocity2 = this.physics.velocityFromRotation(this.turret3.rotation - 1.55, 600);
                      turret3_turretblast2.setVelocityX(velocity2.x);
                      turret3_turretblast2.setVelocityY(velocity2.y);
                      this.shoot.play();
                  }
              }
              this.turretEnergyBlastLastSpawned = timestamp;
          }
          
          if (this.cursors.space.isDown) {
              if (timestamp - this.energyBlastLastSpawned > 150)
              {
                  var scope = this;
                  
                  var energyblast1 = this.physics.add.sprite(this.ship.x - 42, this.ship.y - 20, 'energyblast').setScale(0.045); 
                  this.physics.add.overlap(energyblast1, this.turret1, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.turret1});   
                  this.physics.add.overlap(energyblast1, this.turret2, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.turret2});
                  this.physics.add.overlap(energyblast1, this.turret3, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.turret3});
                  this.physics.add.overlap(energyblast1, this.badguy1, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.badguy1});
                  this.physics.add.overlap(energyblast1, this.badguy2, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.badguy2});
                  this.physics.add.overlap(energyblast1, this.badguy3, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.badguy3});
                  this.physics.add.overlap(energyblast1, this.badguy4, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.badguy4});
                  this.physics.add.overlap(energyblast1, this.badguy5, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.badguy5});
                  this.physics.add.overlap(energyblast1, this.badguy6, this.enemyHit(energyblast1, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast1, turrethit: this.badguy6});
                  energyblast1.setVelocityY(-800);                
                  energyblast1.setVelocityX(this.ship.body.velocity.x);
                  this.heroshoot.play();
                  var energyblast2 = this.physics.add.sprite(this.ship.x + 42, this.ship.y - 20, 'energyblast').setScale(0.045);
                  this.physics.add.overlap(energyblast2, this.turret1, this.enemyHit(energyblast2, this.turret1), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.turret1});
                  this.physics.add.overlap(energyblast2, this.turret2, this.enemyHit(energyblast2, this.turret2), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.turret2});
                  this.physics.add.overlap(energyblast2, this.turret3, this.enemyHit(energyblast2, this.turret3), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.turret3});
                  this.physics.add.overlap(energyblast2, this.badguy1, this.enemyHit(energyblast2, this.badguy1), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.badguy1});
                  this.physics.add.overlap(energyblast2, this.badguy2, this.enemyHit(energyblast2, this.badguy2), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.badguy2});
                  this.physics.add.overlap(energyblast2, this.badguy3, this.enemyHit(energyblast2, this.badguy3), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.badguy3});
                  this.physics.add.overlap(energyblast2, this.badguy4, this.enemyHit(energyblast2, this.badguy4), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.badguy4});
                  this.physics.add.overlap(energyblast2, this.badguy5, this.enemyHit(energyblast2, this.badguy5), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.badguy5});
                  this.physics.add.overlap(energyblast2, this.badguy6, this.enemyHit(energyblast2, this.badguy6), undefined, { scope: this, bulletToDestroy: energyblast2, turrethit: this.badguy6});
                  
                  energyblast2.setVelocityY(-800);
                  energyblast2.setVelocityX(this.ship.body.velocity.x);
                  this.heroshoot.play();
                  this.energyBlastLastSpawned = timestamp;
              }
          }
          if (this.cameras.main.y < 0) {
              this.cameras.main.y += 0;
              this.p.y -= 0;
              
          }
          try {
              if (this.cameras.main.y < 0 && this.cursors.down.isUp && this.cursors.up.isUp && this.cursors.right.isUp && this.cursors.left.isUp) {            
                  this.ship.setVelocityY(-80);
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

  shipHit(bulletToDestroy) {
    bulletToDestroy.destroy();
    this.ship.health -= 10;
    if (this.ship.health > 0)
    {
        var tween = this.tweens.add({
            targets: this.ship,
            test: this.ship.setTint(0xff0000),
            //alpha: { start: 1, to: 0 },
            // alpha: 1,
            // alpha: '+=1',
            ease: 'Cubic.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 100,
            repeat: 0,            // -1: infinity
            yoyo: false,
            onComplete: this.resetShipTint
        });
    }
    else
    {     
        this.cameras.main.shake(400, 0.01);        
        var expl = this.physics.add.sprite(this.ship.x, this.ship.y, 'explosion');
        this.ship.destroy();
        expl.on('animationcomplete', this.shipExplosionAnimComplete(expl), this);
        this.explosion.play();
        expl.anims.play('explosion');
    }
    return undefined;
  }

  resetShipTint() {
    this.ship.setTint(0xffffff);
  }

  enemyHit(bulletToDestroy, turrethit) {  
    bulletToDestroy.destroy();
    if (turrethit.health <= 0) {
      this.cameras.main.shake(300, 0.001);
      turrethit.stopShooting = true;
      
      var expl = this.physics.add.sprite(turrethit.x, turrethit.y, 'explosion');
      turrethit.destroy();
      expl.on('animationcomplete', this.enemyExplosionAnimComplete(expl), this);
      this.explosion.play();
      expl.anims.play('explosion');
    }
    else {      
      turrethit.health -= 10;
      var tween = this.tweens.add({
          targets: turrethit,
          test: turrethit.setTint(0xff0000),
          //alpha: { start: 1, to: 0 },
          // alpha: 1,
          // alpha: '+=1',
          ease: 'Cubic.easeOut',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 100,
          repeat: 0,            // -1: infinity
          yoyo: true,  
          onComplete: function () {turrethit.setTint(0xffffff);}          
      });
    }
    return undefined;
  }

  enemyExplosionAnimComplete(exlp) {
    return exlp.destroy();
  }

  shipExplosionAnimComplete(exlp) {
    this.gameOver = true;
    return exlp.destroy();          
  }
}