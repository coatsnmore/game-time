define('main', ['pixi','player'], function(PIXI, Player) {

    var interactive = true;
    var stage = new PIXI.Stage(0xFFFFFF, interactive);
    var renderer = new PIXI.autoDetectRenderer(800, 480);
    renderer.view.style.display = 'block';

    document.body.appendChild(renderer.view);

    requestAnimFrame(animate);

    var manTexture = PIXI.Texture.fromImage("assets/man.png");
    var man = new PIXI.Sprite(manTexture);
    var player = new Player(man);

    stage.addChild(man);

    function animate() {
        requestAnimFrame(animate);

        //move player
        player.applyFriction();
        man.position.x += player.getVelocity();
        man.position.y += player.getVelocityY();
        renderer.render(stage);
    }

    document.onkeydown = function(e) {
        //37 left
        //38 up
        //39 right
        //40 down
        //32 space

        var keyMap = {
            37: player.left,
            39: player.right,
            38: player.up,
            40: player.down,
            32: player.jump
        };

        e = e || window.event;

        if (keyMap[e.keyCode]) {
            keyMap[e.keyCode]();
        }

        e.preventDefault();
    };
});

(function(root) {
  define('pixi', function() {
    return root.PIXI;
  });  
})(this);


define('player',
    function() {
        var thisPlayer = this;

        function Player(sprite) {
            sprite.position.x = 200;
            sprite.position.y = 150;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            // sprite.alpha = 0.3;//between 0 and 1
            thisPlayer.velocity = 0;
            thisPlayer.sprite = sprite;
            // makeInteractive(sprite);

            thisPlayer.velocityY = 0;
            thisPlayer.jumping = false;
        }

        Player.prototype.applyFriction = function() {
            thisPlayer.velocity = thisPlayer.velocity * 0.93;
            if (Math.abs(thisPlayer.velocity) < 0.1) {
                thisPlayer.velocity = 0;
            }
            thisPlayer.velocityY = thisPlayer.velocityY * 0.93;
            if (Math.abs(thisPlayer.velocityY) < 0.1) {
                thisPlayer.velocityY = 0;
            }
        };

        Player.prototype.right = function() {

            if (thisPlayer.velocity >= 0 || thisPlayer.velocity >= -0.5) {
                if (thisPlayer.velocity <= 2) {
                    thisPlayer.velocity = 2;
                }

                thisPlayer.velocity = thisPlayer.velocity * 1.5;
            }
        };

        Player.prototype.left = function() {

            if (thisPlayer.velocity <= 0 || thisPlayer.velocity <= 0.5) {
                if (thisPlayer.velocity >= -2) {
                    thisPlayer.velocity = -2;
                }

                thisPlayer.velocity = thisPlayer.velocity * 1.5;
            }
        };

        Player.prototype.down = function() {

            if (thisPlayer.velocityY >= 0 || thisPlayer.velocityY >= -0.5) {
                if (thisPlayer.velocityY <= 2) {
                    thisPlayer.velocityY = 2;
                }

                thisPlayer.velocityY = thisPlayer.velocityY * 1.5;
            }
        };

        Player.prototype.up = function() {

            if (thisPlayer.velocityY <= 0 || thisPlayer.velocityY <= 0.5) {
                if (thisPlayer.velocityY >= -2) {
                    thisPlayer.velocityY = -2;
                }

                thisPlayer.velocityY = thisPlayer.velocityY * 1.5;
            }
        };

        Player.prototype.jump = function() {
            if (!thisPlayer.jumping) {
                thisPlayer.jumping = true;
                thisPlayer.velocityY = -4;

                setTimeout(function() {
                    thisPlayer.velocityY = 4;
                    setTimeout(function() {
                        thisPlayer.velocityY = 0;
                    }, 100);
                }, 100);

                thisPlayer.jumping = false;
            }
        };



        Player.prototype.getVelocity = function() {
            return thisPlayer.velocity;
        };

        Player.prototype.getVelocityY = function() {
            return thisPlayer.velocityY;
        };

        return Player;
    }
);

// var Player = ()();
