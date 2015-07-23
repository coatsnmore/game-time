define('main', ['pixi'], function(PIXI) {

//TODO move Plyaer to another file
    var Player = (function() {
        function Player(sprite) {

            console.log("this: " + this);
            sprite.position.x = 200;
            sprite.position.y = 150;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            // sprite.alpha = 0.3;//between 0 and 1

            this.velocity = 0;
            this.sprite = sprite;

            // makeInteractive(sprite);
        }

        Player.prototype.accelerate = function accelerate() {
            console.log("accel vel: " + this.velocity);
            this.velocity++;
        };

        Player.prototype.slow = function() {
            console.log("slow vel: " + this.velocity);
            this.velocity--;
        };

        Player.prototype.getVelocity = function() {
            return this.velocity;
        };

        return Player;
    })();



    var interactive = true;
    var stage = new PIXI.Stage(0xFFFFFF, interactive);
    var renderer = new PIXI.autoDetectRenderer(800, 480);
    renderer.view.style.display = 'block';

    document.body.appendChild(renderer.view);

    requestAnimFrame(animate);

    var manTexture = PIXI.Texture.fromImage("assets/man.png");
    var man = new PIXI.Sprite(manTexture);
    var xpos = man.position.x;
    var player = new Player(man);

    stage.addChild(man);

    function animate() {
        requestAnimFrame(animate);

        //move player
        man.position.x += player.getVelocity();

        if (xpos != man.position.x) {
            xpos = man.position.x;
            console.log("man.position.x: " + man.position.x);
            console.log("veloctiy: " + player.velocity);
        }

        renderer.render(stage);
    }


    function makeInteractive(mySprite) {

        mySprite.setInteractive(true);

        mySprite.mouseover = function(mouseData) {
            console.log("MOUSE OVER!");
        };

        mySprite.mouseout = function(mouseData) {
            console.log("MOUSE OUT!");
        };

        mySprite.mousedown = function(mouseData) {
            console.log("MOUSE DOWN!");
        };

        mySprite.mouseup = function(mouseData) {
            console.log("MOUSE UP!");
        };

        mySprite.click = function(mouseData) {
            console.log("CLICK!");
        };

        mySprite.touchstart = function(touchData) {
            console.log("TOUCH START!");
        };

        mySprite.touchend = function(touchData) {
            console.log("TOUCH END!");
        };

        mySprite.tap = function(touchData) {
            console.log("TAP!");
        };
    }

    document.onkeydown = function(e) {
        //37 left
        //38 up
        //39 right
        //40 down

        e = e || window.event;

        console.log("keyCode: " + e.keyCode);
        if (keyMap[e.keyCode]) {
            keyMap[e.keyCode]();
        }

        e.preventDefault();
    };

    var keyMap = {
        37: player.slow,
        39: player.accelerate
    };
});

(function(root) {
  define('pixi', function() {
    return root.PIXI;
  });  
})(this);

