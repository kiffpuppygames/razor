export default class Turret extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, key: string, health: number, scale: number) {
      super(scene, x, y, key);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setCollideWorldBounds(true);      
      this.setScale(scale);
      
      this.health = health;

      return this;
    }

    public health: number;
  }
  