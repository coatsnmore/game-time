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
