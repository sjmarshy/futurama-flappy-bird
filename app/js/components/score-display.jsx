"use strict";

const React = require("react");

const ScoreDisplay = React.createClass({

	propTypes: {

		score: React.PropTypes.number.isRequired

	},

	render: function () {

		return (
			<div>
				<span>{this.props.score}</span>
			</div>
		);
	}
});

module.exports = ScoreDisplay;
