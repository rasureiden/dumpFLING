// filling prefab
class Filling extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, leftKey, rightKey, fireKey) {
        super(scene, x, y, texture, frame);

        //add obj to existing scene
        scene.add.existing(this);
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.fireKey = fireKey;
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxFling = scene.sound.add('sfx_fling'); // add filling sfx
    } // end constructor

    update() {
        // left/right mvt
        if(!this.isFiring) {
            if(this.leftKey.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (this.rightKey.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if(Phaser.Input.Keyboard.JustDown(this.fireKey) && !this.isFiring) {
            this.isFiring = true;
            this.sfxFling.play();  // play filling sfx
        }
        
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    } // end update()

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    } // end reset()
} // end class filling