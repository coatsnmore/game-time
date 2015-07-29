define(['pixi','player'], function(PIXI, Player) {

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
