var credits_state = {
    create: function() {
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);

        var text = this.game.add.text(
            (game.world.width/2),
            (game.world.height/2) - 100,
            "Developer: Me\n\n" + "Art: Photonstorm + Aetherna + athile\n\n" + "Music: Sonic?",
            {font: "30px Arial", fill: "#ffffff"}
        );

        var text2 = this.game.add.text(
            (game.world.width/2),
            (game.world.height/2) + 200,
            "NOW PRESS SPACE",
            {font: "40px Arial", fill: "#ffffff"}
        );
        text.anchor.setTo(0.5, 0.5);
        text2.anchor.setTo(0.5, 0.5);
    },
    start: function(){
        this.game.state.start('play');
    }
}
