var win_state = {
    create: function() {
        var text = this.game.add.text(
            (game.world.width/2),
            (game.world.height/2),
            "WOOOOO!\n YOU WIN!",
            {
                font: "30px Arial",
                fill: "#ffffff",
                align: 'center'
            }
        );
        text.anchor.setTo(0.5, 0.5);

        if (score > 0) {
            var score_label = this.game.add.text(game.world.centerX, game.world.centerY, "score: " + score, {font: "30px Arial", fill: "#ffffff"});
            score_label.anchor.setTo(0.5, 0.5);
        }
    }
}