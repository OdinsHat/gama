var load_state = {
    preload: function() {
        this.game.stage.backgroundColor = '#000000';
        this.game.load.image('sky', 'assets/sky.png');

        this.game.load.image('ground1', 'assets/ground2.png');
        this.game.load.image('ground2', 'assets/ground5.png');

        this.game.load.image('platform', 'assets/stone1.png');
        this.game.load.image('platformr', 'assets/stoner.png');
        this.game.load.image('platforml', 'assets/stonel.png');

        this.game.load.image('star', 'assets/star.png');
        this.game.load.image('sphere', 'assets/sphere.png');

        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

        this.game.load.audio('awesome', ['assets/awesome-music.ogg']);
    },
    create: function() {
        this.game.state.start('menu');
    }
};