class Game extends Phaser.Game {

	constructor() {
		super(config);

	}

}

let game = new Game();

game.scene.start('GameMenu');