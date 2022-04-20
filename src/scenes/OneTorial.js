class OneTorial extends Phaser.Scene {
    constructor() {
        super("oneTorialScene");
    }

    preload() {

        this.load.image('tutorial', './assets/ONEtorial.png');
        this.load.audio('sfx_select', './assets/select.mp3');

    } // end preload()

    create() {
        this.add.image(0, 0, 'tutorial').setOrigin(0, 0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    } // end create()

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // one player
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('onePlayScene');
        }
    } // end update()
} // end class 