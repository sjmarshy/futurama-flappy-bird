"use strict";

const React = require("react");

const Bird = React.createClass({

	propTypes: {
		position: React.PropTypes.number.isRequired
	},

	render: function () {

		let height = 100;

		let style = {
			height: height,
			width: height,
			position: "relative",
			top: this.props.position - (height / 2),
			backgroundColor: "black"
		};

		return (
			<div style={style}>
			</div>
		);
	}
});

module.exports = Bird;
