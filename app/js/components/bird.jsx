"use strict";

const React = require("react");

function rotateBy(velocity) {
	let minTurn = 1;
	let maxTurn = 0;

	let turn = (velocity / 100) * (maxTurn - minTurn) + minTurn;

	return turn;
}

const Bird = React.createClass({

	propTypes: {
		position: React.PropTypes.number.isRequired,
		velocity: React.PropTypes.number.isRequired,
		src: React.PropTypes.string.isRequired,
		height: React.PropTypes.number.isRequired,
		width: React.PropTypes.number.isRequired,
		x: React.PropTypes.number.isRequired
	},

	render: function () {

		let style = {
			height: this.props.height,
			width: this.props.width,
			position: "relative",
			top: this.props.position - (this.props.height / 2),
			left: this.props.x - (this.props.width / 2),
			backgroundImage: "url(" + this.props.src + ")",
			backgroundSize: "cover",
			transform: "rotate(" + rotateBy(this.props.velocity) + "turn)"
		};

		return (
			<div style={style}>
			</div>
		);
	}
});

module.exports = Bird;
