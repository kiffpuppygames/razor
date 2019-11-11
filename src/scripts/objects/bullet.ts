export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, key: string, scale: number, soundFx: Phaser.Sound.BaseSound) {
    super(scene, x, y, key)
    scene.add.existing(this)
    scene.physics.add.existing(this);
    this.setScale(scale)

    this.damage = 10

    this.fireSoundEffect = soundFx;
  }

  private fireSoundEffect: Phaser.Sound.BaseSound;

  public damage: number;

  public fire(velocityX: number, velocityY: number): void {
    this. setVelocity(velocityX, velocityY);
    this.fireSoundEffect.play();
  }
}
