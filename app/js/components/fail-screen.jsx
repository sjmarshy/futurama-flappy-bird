"use strict";

const React = require("react");

function tryAgain(failCursor) {
	// this has to be called when the thing is actually clicked on - but
	// I wanted to make the function private to prevent it being called by
	// an external force - so closures + first class functions
	return function () {

		// even though it's come a long way, this'll still
		// cause an update of the root tree and, therefore, the
		// root component
		failCursor.edit(false);
	};
}

const FailScreen = React.createClass({

	propTypes: {
		// I try and set everything as required unless it's explicitly
		// optional
		score: React.PropTypes.number.isRequired,
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
					Fail! You got {this.props.score}
				</h2>
				<span
					style={style.span}
					onClick={tryAgain(this.props.fail)}>
					Try again?
				</span>
			</div>
		);
	}
});

module.exports = FailScreen;
