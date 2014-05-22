var menu_state = {
    create: function() {
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);

        var c_key = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        c_key.onDown.add(this.credits, this);

        var text = this.game.add.text(
            (game.world.width/2),
            (game.world.height/2),
            "Press space to start\nPress c for credits",
            {font: "30px Arial", fill: "#ffffff"}
        );
        text.anchor.setTo(0.5, 0.5);

        if (score > 0) {
            var score_label = this.game.add.text(game.world.centerX, game.world.centerY, "score: " + score, {font: "30px Arial", fill: "#ffffff"});
            score_label.anchor.setTo(0.5, 0.5);
        }
    },
    start: function() {
        this.game.state.start('play');
    },
    credits: function() {
        this.game.state.start('credits');
    }
};