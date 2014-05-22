var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gama');

// Game global vartiables
//var platforms;
//var player;
//ar cursors;
//var stars;
var score = 0;
//var sphere;
var sphereHit = 0;
//var music;

game.state.add('load', load_state);
game.state.add('credits', credits_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);
game.state.add('win', win_state);

game.state.start('load');