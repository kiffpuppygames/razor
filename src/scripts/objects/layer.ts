export default class Layer extends Phaser.GameObjects.TileSprite {
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string) {
      super(scene, x, y, width, height, key);
      scene.add.existing(this);
    }
  }
  