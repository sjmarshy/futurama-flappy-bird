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

		menu: true, // and when a menu is implemented we'll start with it showing

		fail: false,

		reset: false, // we use this as a trigger to reset the game

		score: 0,

		highscore: window.localStorage.getItem("highscore") || 0,

		height: height,

		width: width,

		bird: {
			velocity: 0,
			// position is the variable amount on the y axis
			// we'll start the bird in the centre of the screen
			position: height / 2,
			x: width / 2,
			height: 50,
			width: 50
		},

		obstacle: {

			obstacles: [],

			velocity: 7,

			width: 150,
			height: {
				min: 0.35,
				max: 0.55
			},

			// the min/max number of seconds between obstacles
			// appearing
			timing: {
				min: 1000,
				max: 4500
			}
		}

	}
});

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

		let menu = data.menu ? <Menu/> : null;
		let failScreen = data.fail ?
			<FailScreen
				highscore={this.cursor.get("highscore")}
				score={this.cursor.select("score")}
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
	// key has been hit
	if (key) {
		velocityMod = 20;
		state.set("pause", false);
	}

	game.updateGame(state, velocityMod);

	// and loop (well, recur)
	window.requestAnimationFrame(frame);
}

// update our state in time with the browsers animation frame
window.requestAnimationFrame(frame);
