var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gama');

// Game global vartiables
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var sphere;
var sphereHit = 0;
var music;

game.state.add('menu', menu_state);
game.state.add('game', game_state);