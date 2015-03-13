"use strict";

const React = require("react");
const Baobab = require("baobab");

// state object should go here
const gameState = new Baobab({
	game: {

		paused: true,

		menu: true,

		fail: false,

		score: 0,

		bird: {
			velocity: 0,
			position: [0, 0]
		},

		obstacles: []

	}
});

// GameContainer - the root React component that will re-render all
// 	relevant children when the state changes.
const GameContainer = React.createClass({

	mixins: [ gameState.mixin ],

	cursor: ["game"],

	render: function () {

		let obstacles = this.state.game.obstacles.forEach(function (o) {
			return <Obstacle {...o} />;
		});

		let menu = this.state.game.menu ? <Menu/> : null;

		return (
			<div data-component-game>
				{menu}
				<ScoreDisplay score={this.state.game.score}/>
				<Bird {...this.state.game.bird} />
				{obstacles}
			</div>
		);
	}
});

// replace the document.body with the Game
React.render(
	<GameContainer />,
	document.body
);

// handle the Keyboard and update game state
function frame() {

	let key = Keyboard.get();
	let velocityMod = 0;

	if (key && key === "SPACE") {
		velocityMod = 10;
	}

	updateGame(gameState, velocityMod);

	window.requestAnimationFrame(frame);
}

// update our state in time with the browsers animation frame
window.requestAnimationFrame(frame);
