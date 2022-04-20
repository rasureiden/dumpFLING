class OnePlayer extends Phaser.Scene {
    constructor() {
        super("onePlayScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('filling', './assets/p1.png');
        this.load.image('wrapper', './assets/wrapper.png');
        this.load.image('board', './assets/board2.png');
        this.load.image('end', './assets/end.png');
        this.load.image('counter', './assets/counter.png');
        // load explosion spritesheet
        this.load.spritesheet('wrap', './assets/dumpWrap.png', {frameWidth: 47, frameHeight: 47, startFrame: 0, endFrame: 9});
    } // end preload()
    
    create() {
        // place tile sprite
        this.board = this.add.tileSprite(0, 0, 640, 480, 'board').setOrigin(0, 0);
        this.counter = this.add.tileSprite(0, 0, 640, 480, 'counter').setOrigin(0, 0);
        
        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
        // add Spoon 1 (p1)
        this.p1Filling = new Filling(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'filling', 0, keyLEFT, keyRIGHT, keyUP).setOrigin(0.5, 0);
        // add spaceship (x3)
        this.ship01 = new Wrapper(this, game.config.width + borderUISize*6, borderUISize*4, 'wrapper', 0, 30).setOrigin(0, 0);
        this.ship02 = new Wrapper(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'wrapper', 0, 20).setOrigin(0, 0);
        this.ship03 = new Wrapper(this, game.config.width, borderUISize*6 + borderPadding*4, 'wrapper', 0, 10).setOrigin(0, 0);
  
        // animation config
        this.anims.create({
            key: 'wrap',
            frames: this.anims.generateFrameNumbers('wrap', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#60291a',
            color: '#fefbfa',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5, 
            },
            fixedWidth: 100
        } 
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        
        // 60-sec play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.image(0, 0, 'end').setOrigin(0, 0);
            this.gameOver = true;
        }, null, this);

    } // end create()

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        // check for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene');
        }
        
        // display timer
        //this.timerRight = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.clock.getRemainingSeconds().toFixed(0) + "s", scoreConfig);

        this.board.tilePositionX -= 3;
        this.counter.tilePositionX -= 1;
        
        if(!this.gameOver) {         // upd8 ONLY if game not over + one player
            this.p1Filling.update();     // player 1 filling mvt
            this.ship01.update();       // update & move spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 

        // check collisions for p1
        if(this.checkCollision(this.p1Filling, this.ship03)) {
            this.p1Filling.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Filling, this.ship02)) {
            this.p1Filling.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Filling, this.ship01)) {
            this.p1Filling.reset();
            this.shipExplode(this.ship01);
        }
    } // end update()

    checkCollision(filling, ship) {
        // simple AABB checking
        if(filling.x < ship.x + ship.width && filling.x + filling.width > ship.x && filling.y < ship.y + ship.height && filling.height + filling.y > ship.y) {
            return true;
        } else {
            return false;
        }
    } // end checkCollision()

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite @ ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'wrap').setOrigin(0, 0);
        boom.anims.play('wrap');             // play explode anim
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.score += ship.points;
        this.scoreLeft.text = this.score;
        // time add and repaint
        // this.timer += ship.timeBoost;
        // this.timerRight.text = this.timerRight;

        // play explosion sfx
        this.sound.play('sfx_wrap');
    } // end shipExplode()
} // end class Play