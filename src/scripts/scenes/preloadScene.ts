export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')

    this.load.audio('shoot', 'assets/shoot.mp3')
    this.load.audio('heroshoot', 'assets/shoot.mp3')
    this.load.audio('music', 'assets/Orbital Colossus_0.mp3')
    this.load.audio('explosion', 'assets/explosion.wav')
    this.load.atlas('dust-atlas', 'assets/shapes.png', 'assets/shapes.json')
    this.load.text('dust', 'assets/dust.json')
    this.load.atlas('thruster-atlas', 'assets/thruster/shapes.png', 'assets/thruster/shapes.json')
    this.load.text('thruster', 'assets/thruster/thruster.json')
    
    this.load.image('ship', 'assets/shipconcept.png')
    this.load.image('energyblast', 'assets/energyblast.png')
    this.load.image('badguy1', 'assets/badguy1.png')
    this.load.image('turret_base', 'assets/turret1_base.png')
    this.load.spritesheet('turret_top_ss', 'assets/turret_top_ss.png', { frameWidth: 107, frameHeight: 137 })
    this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 128, frameHeight: 128 })

    this.load.image('close-background', 'assets/Leve1_layer1.png');
    this.load.image('middle-background', 'assets/Leve1_layer2.png');
    this.load.image('far-background', 'assets/Leve1_layer3.png');
    this.load.image('star-field', 'assets/stars.png');
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
