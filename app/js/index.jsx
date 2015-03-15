"use strict";

const React = require("react");
const Baobab = require("baobab");
const Keyboard = require("./keyboard");
const game = require("./game");

// components
const Obstacle = require("./components/obstacle.jsx");
const Menu = require("./components/menu.jsx");
const ScoreDisplay = require("./components/score-display.jsx");
const Bird = require("./components/bird.jsx");
const FailScreen = require("./components/fail-screen.jsx");

// game constants
const height = 500;
const width = 700;

// here we hold the state for the whole game. Rather than splitting the
// state down on a component level, keeping all the state managed in a central
// place inside a managed data structure means we know when any of it is
// updated, and so when we need to update the screen.
const gameState = new Baobab({
	game: {

		pause: true, // we'll start the game paused

		fail: false,

		reset: false, // we use this as a trigger to reset the game

		score: 0,

		highscore: parseInt(window.localStorage.getItem("highscore"), 10) || 0,

		height: height,

		width: width,

		bird: {
			velocity: 0,
			maxVelocity: 12,
			minVelocity: -6,
			// position is the variable amount on the y axis
			// we'll start the bird in the centre of the screen
			position: height / 2,
			x: width / 2,
			height: 30,
			width: 75,
			src: "/images/ship.png"
		},

		obstacle: {

			src: "/images/futurama-brain.png",

			obstacles: [],

			velocity: 3,

			ratio: 1.39,

			height: {
				min: 0.35,
				max: 0.55
			},

			// the min/max number of seconds between obstacles
			// appearing
			timing: {
				min: 2500,
				max: 6500
			}
		},

		background: {
			src: "/images/bkg.png",
			width: width,
			position: width
		}

	}
});

function resetGame(state) {
	state.set("pause", true);
	state.set("fail", false);
	state.set("score", 0);
}

function resetGameClosure(state) {
	return () => {
		resetGame(state);
	};
}

// GameContainer - the root React component that will re-render all
// 	relevant children when the state changes.
const GameContainer = React.createClass({

	mixins: [ gameState.mixin ],

	cursor: ["game"],

	render: function () {

		let data = this.state.cursor;

		let obstacles = data.obstacle.obstacles.map(function (o) {
			return <Obstacle key={o.created} {...o} />;
		});

		let menu = data.pause && !data.fail ? <Menu/> : null;
		let failScreen = data.fail ?
			<FailScreen
				onReset={resetGameClosure(this.cursor)}
				highscore={this.cursor.get("highscore")}
				score={this.cursor.get("score")}
				fail={this.cursor.get("fail")} /> :
			null;

		let score = data.fail ?
			null :
			<ScoreDisplay score={data.score} />;

		let style = {
			height: data.height,
			width: data.width,
			backgroundImage: "url(" + data.background.src + ")",
			backgroundPosition: data.background.position,
			margin: 0,
			padding: 0,
			overflow: "hidden",
			position: "absolute",
			zIndex: -1
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

	// as our keyboard buffer is only looking for the
	// space key, this should only exist when a space
	// key has been hit. We also need to make sure that we
	// don't unpause the game when it's already failed
	if (key && !state.get("fail")) {
		velocityMod = state.get("bird", "maxVelocity");
		state.set("pause", false);
	} else if (key && state.get("fail")) {
		resetGame(state);
	}

	game.updateGame(state, velocityMod);

	// and loop (well, recur)
	window.requestAnimationFrame(frame);
}

// update our state in time with the browsers animation frame
window.requestAnimationFrame(frame);
