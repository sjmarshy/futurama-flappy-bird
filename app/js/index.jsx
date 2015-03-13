"use strict";

const React = require("react");
const Baobab = require("baobab");
const Keyboard = require("./keyboard");

// components
const Obstacle = require("./components/obstacle.jsx");
const Menu = require("./components/menu.jsx");
const ScoreDisplay = require("./components/score-display.jsx");
const Bird = require("./components/bird.jsx");
const FailScreen = require("./components/fail-screen.jsx");

// game constants
const height = 500;
const width = 700;

// state object should go here
const gameState = new Baobab({
	game: {

		pause: true,

		menu: true,

		fail: false,

		score: 0,

		height: height,

		width: width,

		bird: {
			velocity: 0,
			position: height / 2,
			x: width / 2,
			height: 50,
			width: 50
		},

		obstacles: []

	}
});

function genObstacle() {

	let obstacleHeight = Math.random() *
		((height * 0.75) - (height * 0.25)) + (height * 0.25);

	return {
		height: obstacleHeight,
		width: 300,
		x: 700,
		top: height - obstacleHeight,
		scored: false
	};
}

// here we'll sort stuff like colision detection, generate new obstacles
// and the movement of the bird
function updateGame(state, velocityMod) {

	const forwardVelocity = 7;

	let pause = state.get("pause");
	let fail = state.get("fail");
	let obstacleChance = 0.0075;

	if (!pause && !fail) {

		// bird movement first;
		let bird = state.select("bird");

		if (velocityMod > 0) {
			bird.set("velocity", velocityMod);
		}

		let bdata = bird.get();

		let velocity = bdata.velocity;
		let birdY = bdata.position;

		let newPosition = birdY - velocity;

		if (newPosition < height - (bird.get("height") / 2)) {
			bird.set("position", newPosition);
		} else {
			state.set("fail", true);
			state.set("pause", true);
			bird.set("position", height / 2);
			bird.set("velocity", 0);
			return;
		}

		if (velocity > -10) {
			bird.set("velocity", velocity - 1);
		}

		// obstacles

		// pretty much a d10 system - if we `roll` under our chance,
		// then we `fail` and an obstale is generated and added to the
		// list
		let rand = Math.random();

		if (rand < obstacleChance) {
			let obstacles = state.get("obstacles");

			obstacles.push(genObstacle());

			state.set("obstacles", obstacles);
		}

		// move every obstacle to the left until it's off the screen,
		// then we can delete it.

		let obstacles = state.get("obstacles");

		state.set("obstacles", obstacles.map(function (o) {
			o.x -= forwardVelocity;

			if (o.x < -o.width) {
				return null;
			} else if (o.x < o.width - (width / 2) && !o.scored) {
				let score = state.get("score");
				state.set("score", score + 1);
				o.scored = true;
			}

			return o;
		}).filter(function (o) {
			return !!o;
		}));
	}
}

// GameContainer - the root React component that will re-render all
// 	relevant children when the state changes.
const GameContainer = React.createClass({

	mixins: [ gameState.mixin ],

	cursor: ["game"],

	render: function () {

		let data = this.state.cursor;

		let obstacles = data.obstacles.map(function (o) {
			return <Obstacle {...o} />;
		});

		let menu = data.menu ? <Menu/> : null;
		let failScreen = data.fail ?
			<FailScreen
				score={data.score}
				fail={this.cursor.select("fail")} /> :
			null;

		let score = data.fail ?
			null :
			<ScoreDisplay score={data.score} />;

		let style = {
			height: data.height,
			width: data.width,
			backgroundColor: "grey",
			margin: 0,
			padding: 0,
			overflow: "hidden"
		};


		return (
			<div>
				<div
					data-component-menu
					style={{
						position: "absolute",
						display: "flex",
						justifyContent: "center",
						top: 0,
						width: width,
						height: height,
						margin: 0,
						padding: 10
					}}>

					{failScreen}
					{menu}
					{score}
				</div>
				<div style={style} data-component-game>
					{obstacles}
					<Bird {...data.bird} />
				</div>
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
	let state = gameState.select("game");

	if (key) {
		velocityMod = 20;
		state.set("pause", false);
	}

	updateGame(state, velocityMod);

	window.requestAnimationFrame(frame);
}

// update our state in time with the browsers animation frame
window.requestAnimationFrame(frame);
