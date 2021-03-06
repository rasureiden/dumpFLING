class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.image('menu', './assets/menu.png');
        this.load.audio('sfx_select', './assets/select.mp3');
        this.load.audio('sfx_wrap', './assets/wrap.mp3');
        this.load.audio('sfx_fling', './assets/fling.mp3');
    } // end preload()

    create() {
        this.add.image(0, 0, 'menu').setOrigin(0, 0);

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
            this.scene.start('oneTorialScene');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // two player
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('twoTorialScene');
        }
    } // end update()
} // end class 