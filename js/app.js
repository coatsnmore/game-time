define('main', ['pixi'], function(PIXI) {

  var stage = new PIXI.Stage(0xFFFFFF, true);

  var renderer = new PIXI.autoDetectRenderer(800, 480);

  renderer.view.style.display = 'block';

  document.body.appendChild(renderer.view);

});

(function(root) {
  define('pixi', function() {
    return root.PIXI;
  });  
})(this);

