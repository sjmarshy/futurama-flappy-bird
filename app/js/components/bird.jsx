"use strict";

const React = require("react");

const Bird = React.createClass({

	propTypes: {
		position: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		width: React.PropTypes.number.isRequired,
		// x is set - it's just a way to make sure
		// the bird is always displayed in the centre widthways
		x: React.PropTypes.number.isRequired
	},

	render: function () {

		let style = {
			height: this.props.height,
			width: this.props.width,
			position: "relative",
			top: this.props.position - (this.props.height / 2),
			left: this.props.x - (this.props.width / 2),
			backgroundColor: "black"
		};

		return (
			<div style={style}>
			</div>
		);
	}
});

module.exports = Bird;
