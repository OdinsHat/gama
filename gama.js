(function(){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    var platforms;
    var player;
    var cursors;
    var stars;
    var score = 0;
    var sphere;
    var sphereHit = 0;
    var music;

    function preload() {
        game.load.image('sky', 'assets/sky.png');

        game.load.image('ground1', 'assets/ground2.png');
        game.load.image('ground2', 'assets/ground5.png');

        game.load.image('platform', 'assets/stone1.png');
        game.load.image('platformr', 'assets/stoner.png');
        game.load.image('platforml', 'assets/stonel.png');

        game.load.image('star', 'assets/star.png');
        game.load.image('sphere', 'assets/sphere.png');

        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

        game.load.audio('awesome', ['assets/awesome-music.ogg']);
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');

        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, game.world.height - 64, 'ground1');
        ground.scale.setTo(1, 1);
        ground.body.immovable = true;
        ground = platforms.create(128, game.world.height - 64, 'ground1');
        ground.scale.setTo(1, 1);
        ground.body.immovable = true;
        ground = platforms.create((128*2), game.world.height - 64, 'ground1');
        ground.scale.setTo(1, 1);
        ground.body.immovable = true;
        ground = platforms.create((128*3), game.world.height - 64, 'ground1');
        ground.scale.setTo(1, 1);
        ground.body.immovable = true;
        ground = platforms.create((128*4), game.world.height - 64, 'ground1');
        ground.scale.setTo(1, 1);
        ground.body.immovable = true;
        ground = platforms.create((128*5), game.world.height - 64, 'ground1');
        ground.scale.setTo(1, 1);
        ground.body.immovable = true;
        ground = platforms.create((128*6), game.world.height - 64, 'ground1');
        ground.scale.setTo(1, 1);
        ground.body.immovable = true;


        var ledge = platforms.create(600, 300, 'platform');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;


        ledge = platforms.create((600+60), 300, 'platformr');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;

        ledge = platforms.create((600-60), 300, 'platforml');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;

        var midledge = platforms.create(230, 240, 'platforml');
        midledge.scale.setTo(0.5, 0.5);
        midledge.body.immovable = true;

        var midledge = platforms.create(230+60, 240, 'platformr');
        midledge.scale.setTo(0.5, 0.5);
        midledge.body.immovable = true;


        ledge = platforms.create(100, 400, 'platforml');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;
        ledge = platforms.create((100+60), 400, 'platformr');
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;

        // Stars to collect
        stars = game.add.group();
        stars.enableBody = true;

        starBurst();

        // My player
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);

        // Giving him some bounce
        player.body.bounce.y = 0.4;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        // He's ALIVE (animation)!
        // Note: Lookup flipping sprites
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        // The crazy sphere
        sphere = game.add.sprite(32, game.world.height - 250, 'sphere')
        game.physics.enable(sphere, Phaser.Physics.ARCADE);
        sphere.body.velocity.x = 100;
        sphere.body.velocity.y = 100;
        sphere.body.collideWorldBounds = true;
        sphere.body.bounce.set(1);

        cursors = game.input.keyboard.createCursorKeys();

        scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

        music = game.add.audio('awesome');
        music.play('', 0, 1, true);
    }

    function update() {
        game.physics.arcade.collide(player, platforms);

        // We need this or the stars just go falling through the floor - funny but not useful
        game.physics.arcade.collide(stars, platforms);

        // Bouncy sphere
        game.physics.arcade.collide(sphere, platforms);
        game.physics.arcade.collide(sphere, player, sphereTouch, null, this);


        // Make the guy stay still when nowts being pressed
        player.body.velocity.x = 0;

        // Enables player to collect stars "collectStar" is the callback function
        game.physics.arcade.overlap(player, stars, collectStar, null, this);

        // The sphere will start eating stars after it has been hit twice
        game.physics.arcade.collide(sphere, stars, eatStar, null, this);

        // Sorting out left, right and stop
        if (cursors.left.isDown){
            player.body.velocity.x = -150;
            player.animations.play('left');
        }else if(cursors.right.isDown){
            player.body.velocity.x = 150;
            player.animations.play('right');
        }else{
            player.animations.stop();
            player.frame = 4;
        }

        // JUMP!
        if(cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -350;
        }

    }

    function collectStar(player, star){
        star.kill();

        score++;
        scoreText.text = 'Score: ' + score;
    }

    function eatStar(sphere, star){
        if(sphereHit >= 2){
            star.kill();
            console.log('Eating stars?');
            score--;
            scoreText.text = 'Score: ' + score;
        }
    }


    function sphereTouch(sphere, player){
        sphereHit++;
        starBurst();
    }

    // STARBURST collision event with bouncy ball
    function starBurst(){
        // Stars to collect
        for (var i = 0; i < 12; i++) {
            var star = stars.create(i * 70, 0, 'star');
            // Let them fall is a lot easier than placing them so as to avoid being
            // put inside objects I guess?
            star.body.gravity.y = 300;

            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
    }
})();