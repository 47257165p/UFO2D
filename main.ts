/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;
    private ufo:Phaser.Sprite;
    private cursor:Phaser.CursorKeys;
    private ACCELERATION = 500;
    private MAX_SPEED = 300;
    private walls:Phaser.TilemapLayer;
    private map:Phaser.Tilemap;

    preload():void {
        super.preload();

        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.load.tilemap('tilemap', 'assets/backgroundtiled.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'assets/Background_low.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create():void {
        super.create();

        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('paredes', 'background');
        var background = this.map.createLayer('fondo');
        this.walls = this.map.createLayer('paredes');



        /*background = this.add.sprite(0, 0, 'background');
        var scale = this.world.height / background.height;
        background.scale.setTo(scale, scale);
         */
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        //this.ufo.scale.setTo(scale - 0.05, scale - 0.05);
        this.ufo.anchor.setTo(0.5, 0.5);

        this.physics.enable(this.ufo);

        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.set(0.7);
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);

        this.cursor = this.input.keyboard.createCursorKeys();

        this.ufo.body.c
    }

    update():void {
        super.update();
        this.moveUfo();
        this.game.debug.bodyInfo(this.ufo, 0, 0);


    }

    moveUfo():void
    {
        if (this.cursor.left.isDown)
        {
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursor.right.isDown)
        {
            this.ufo.body.acceleration.x = this.ACCELERATION;
        }

        else if (this.cursor.up.isDown)
        {
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        }
        else if (this.cursor.down.isDown)
        {
            this.ufo.body.acceleration.y = this.ACCELERATION;
        }
        else
        {
            this.ufo.body.acceleration.x = 0;
            this.ufo.body.acceleration.y = 0;
            this.ufo.body.velocity.x = 0;
            this.ufo.body.velocity.y = 0;
        }
    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new SimpleGame();
}
