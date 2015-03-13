"use strict";

const React = require("react");

const Obstacle = React.createClass({

	propTypes: {

		height: React.PropTypes.number.isRequired,

		width: React.PropTypes.number.isRequired,

		x: React.PropTypes.number.isRequired,

		top: React.PropTypes.number.isRequired

	},

	render: function () {

		let style = {
			height: parseInt(this.props.height),
			width: this.props.width,
			position: "absolute",
			left: this.props.x,
			top: parseInt(this.props.top),
			backgroundColor: "black"
		};


		return <div style={style}/>;
	}
});

module.exports = Obstacle;
