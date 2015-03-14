"use strict";

const React = require("react");

function tryAgain(failCursor, scoreCursor) {
	// this has to be called when the thing is actually clicked on - but
	// I wanted to make the function private to prevent it being called by
	// an external force - so closures + first class functions
	return function () {

		// even though it's come a long way, this'll still
		// cause an update of the root tree and, therefore, the
		// root component
		failCursor.edit(false);
		scoreCursor.edit(0);
	};
}

const FailScreen = React.createClass({

	propTypes: {
		// I try and set everything as required unless it's explicitly
		// optional
		score: React.PropTypes.object.isRequired,
		highscore: React.PropTypes.number.isRequired,
		fail: React.PropTypes.object.isRequired // cursor to the fail state
	},

	render: function () {

		let style = {
			title: {
				color: "red",
				fontSize: 18
			},
			span: {
				fontSize: 14,
				color: "red",
				cursor: "pointer"
			}
		};

		return (
			<div>
				<h2 style={style.title}>
					Fail! You got {this.props.score.get()}
				</h2>
				<p>
					your highscore is {this.props.highscore}
				</p>
				<span
					style={style.span}
					onClick={tryAgain(this.props.fail, this.props.score)}>
					Try again?
				</span>
			</div>
		);
	}
});

module.exports = FailScreen;
