/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.ACCELERATION = 500;
        this.MAX_SPEED = 300;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        this.load.image('0-0', 'assets/Background parts/Background-0-0.png');
        this.load.image('0-1', 'assets/Background parts/Background-0-1.png');
        this.load.image('0-2', 'assets/Background parts/Background-0-2.png');
        this.load.image('1-0', 'assets/Background parts/Background-1-0.png');
        this.load.image('1-1', 'assets/Background parts/Background-1-1.png');
        this.load.image('1-2', 'assets/Background parts/Background-1-2.png');
        this.load.image('2-0', 'assets/Background parts/Background-2-0.png');
        this.load.image('2-1', 'assets/Background parts/Background-2-1.png');
        this.load.image('2-2', 'assets/Background parts/Background-2-2.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        //var background;
        var image00 = this.add.sprite(0, 0, '0-0');
        var image01 = this.add.sprite(image00.width, 0, '1-0');
        var image02 = this.add.sprite(image00.width + image01.width, 0, '2-0');
        var image10 = this.add.sprite(0, image00.height, '0-1');
        var image11 = this.add.sprite(image10.width, image00.height, '1-1');
        var image12 = this.add.sprite(image10.width + image11.width, image00.height, '2-1');
        var image20 = this.add.sprite(0, image00.height + image10.width, '2-0');
        var image21 = this.add.sprite(image20.width, 0, '1-2');
        var image22 = this.add.sprite(image20.width + image21.width, 0, '2-2');
        //background = this.add.sprite(0, 0, 'background');
        //var scale = this.world.height / background.height;
        //background.scale.setTo(scale, scale);
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        //this.ufo.scale.setTo(scale - 0.05, scale - 0.05);
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.set(0.7);
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.ufo.body.c;
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.moveUfo();
        this.game.debug.bodyInfo(this.ufo, 0, 0);
    };
    mainState.prototype.moveUfo = function () {
        if (this.cursor.left.isDown) {
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursor.right.isDown) {
            this.ufo.body.acceleration.x = this.ACCELERATION;
        }
        else if (this.cursor.up.isDown) {
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        }
        else if (this.cursor.down.isDown) {
            this.ufo.body.acceleration.y = this.ACCELERATION;
        }
        else {
            this.ufo.body.acceleration.x = 0;
            this.ufo.body.acceleration.y = 0;
            this.ufo.body.velocity.x = 0;
            this.ufo.body.velocity.y = 0;
        }
    };
    return mainState;
})(Phaser.State);
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=main.js.map