"use strict";

const React = require("react");
const Baobab = require("baobab");
const Keyboard = require("./keyboard");

// components
const Obstacle = require("./components/obstacle.jsx");

// game constants
const height = 500;
const width = 300;

// state object should go here
const gameState = new Baobab({
	game: {

		paused: true,

		menu: true,

		fail: false,

		score: 0,

		height: height,

		width: width,

		bird: {
			velocity: 0,
			position: height / 2
		},

		obstacles: []

	}
});


// here we'll sort stuff like colision detection, generate new obstacles
// and the movement of the bird
function updateGame(state, velocityMod) {

	// bird movement first;
	let bird = state.select("bird");

	if (velocityMod > 0) {
		bird.set("velocity", velocityMod);
	}

	let velocity = bird.get("velocity");
	let birdY = bird.get("position");

	bird.set("position", birdY - velocity);
}

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

var keys = new Keyboard("<space>");

// handle the Keyboard and update game state
function frame() {



	let key = keys.get();
	let velocityMod = 0;

	if (key && key === "SPACE") {
		velocityMod = 10;
	}

	updateGame(gameState, velocityMod);

	window.requestAnimationFrame(frame);
}

// update our state in time with the browsers animation frame
window.requestAnimationFrame(frame);
