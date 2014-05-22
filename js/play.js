var play_state = {

    /**
     * Creates the game world using the preloaded sprites
     *
     * @return {undefined}
     */
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, 'sky');

        this.platforms = game.add.group();
        this.platforms.enableBody = true;

        this.createFloor();

        this.ledge = this.platforms.create(600, 300, 'platform');
        this.ledge.scale.setTo(0.5, 0.5);
        this.ledge.body.immovable = true;


        this.ledge = this.platforms.create((600+60), 300, 'platformr');
        this.ledge.scale.setTo(0.5, 0.5);
        this.ledge.body.immovable = true;

        this.ledge = this.platforms.create((600-60), 300, 'platforml');
        this.ledge.scale.setTo(0.5, 0.5);
        this.ledge.body.immovable = true;

        this.midledge = this.platforms.create(230, 240, 'platforml');
        this.midledge.scale.setTo(0.5, 0.5);
        this.midledge.body.immovable = true;

        this.midledge = this.platforms.create(230+60, 240, 'platformr');
        this.midledge.scale.setTo(0.5, 0.5);
        this.midledge.body.immovable = true;


        this.ledge = this.platforms.create(100, 400, 'platforml');
        this.ledge.scale.setTo(0.5, 0.5);
        this.ledge.body.immovable = true;
        this.ledge = this.platforms.create((100+60), 400, 'platformr');
        this.ledge.scale.setTo(0.5, 0.5);
        this.ledge.body.immovable = true;

        // Stars to collect
        this.stars = game.add.group();
        this.stars.enableBody = true;

        this.starBurst();

        // My player
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        this.game.physics.arcade.enable(this.player);

        // Giving him some bounce
        this.player.body.bounce.y = 0.4;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        // He's ALIVE (animation)!
        // Note: Lookup flipping sprites
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        // The crazy sphere
        this.sphere = game.add.sprite(32, game.world.height - 250, 'sphere');
        this.game.physics.enable(this.sphere, Phaser.Physics.ARCADE);
        this.sphere.body.velocity.x = 100;
        this.sphere.body.velocity.y = 100;
        this.sphere.body.collideWorldBounds = true;
        this.sphere.body.bounce.set(1);

        this.cursors = game.input.keyboard.createCursorKeys();

        this.scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

        this.music = game.add.audio('awesome');
        this.music.play('', 0, 1, true);
    },

    /**
     * Game drawhandler that gets updated at regular intervals
     * @return {undefined}
     */
    update: function() {
        this.game.physics.arcade.collide(this.player, this.platforms);

        // We need this or the stars just go falling through the floor - funny but not useful
        this.game.physics.arcade.collide(this.stars, this.platforms);

        // Bouncy sphere
        this.game.physics.arcade.collide(this.sphere, this.platforms);
        this.game.physics.arcade.collide(this.sphere, this.player, this.sphereTouch, null, this);


        // Make the guy stay still when nowts being pressed
        this.player.body.velocity.x = 0;

        // Enables player to collect stars "collectStar" is the callback function
        this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

        // The sphere will start eating stars after it has been hit twice
        this.game.physics.arcade.collide(this.sphere, this.stars, this.eatStar, null, this);

        // Sorting out left, right and stop
        if (this.cursors.left.isDown){
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        }else if(this.cursors.right.isDown){
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }else{
            this.player.animations.stop();
            this.player.frame = 4;
        }

        // JUMP!
        if(this.cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -350;
        }

    },

    /**
     * Event handler for when the player touches a star - collecting it.
     * Will update the score globally and the scoreboard on screen.
     *
     * @param  {object} player  sprite
     * @param  {object} star    sprite
     * @return {undefined}
     */
    collectStar: function(player, star){
        star.kill();

        score++;
        this.scoreText.text = 'Score: ' + score;
    },

    /**
     * Event handler for when the sphere/orb touches a star. Checks if its been
     *  hit by player more than 5 times and if it has then it will eat the
     * star, turning red to show its blood thirsty nature.
     *
     * @param  {object} sphere sprite
     * @param  {object} star   sprite
     * @return {undefined}
     */
    eatStar: function(sphere, star){
        if(sphereHit >= 5){
            sphere.tint = 0xff0000;
            star.kill();
            console.log('Eating stars?');
            score--;
            this.scoreText.text = 'Score: ' + score;
        }
    },

    /**
     * Event handler for when the sphere/globe is touched by player. This will
     * cause a burst of stars and increment sphereHit counter.
     *
     * @param  {object} sphere sprite
     * @param  {object} player sprite
     * @return {undefined}
     */
    sphereTouch: function(sphere, player){
        sphereHit++;
        this.starBurst();
    },

    /**
     * Drops 12 stars from the top of the level screen
     *
     * @return {undefined}
     */
    starBurst: function(){
        // Stars to collect
        for (var i = 0; i < 12; i++) {
            this.star = this.stars.create(i * 70, 0, 'star');
            // Let them fall is a lot easier than placing them so as to avoid being
            // put inside objects I guess?
            this.star.body.gravity.y = 300;

            this.star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    },

    createFloor: function() {
        var i = 0;
        for(i=0;i<7;i++){
            this.ground = this.platforms.create((128*i), game.world.height - 64, 'ground1');
            this.ground.scale.setTo(1, 1);
            this.ground.body.immovable = true;
        }
    }
};