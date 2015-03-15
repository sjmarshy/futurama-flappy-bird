"use strict";

const React = require("react");

const FailScreen = React.createClass({

	propTypes: {
		// I try and set everything as required unless it's explicitly
		// optional
		onReset: React.PropTypes.func.isRequired,
		score: React.PropTypes.number.isRequired,
		highscore: React.PropTypes.number.isRequired,
		fail: React.PropTypes.number.isRequired
	},

	render: function () {

		let style = {
			main: {
				height: "auto",
				alignSelf: "center",
				fontFamily: "sans-serif",
				textAlign: "center",
				color: "white"
			},
			title: {
				fontSize: 18,
				padding: 10
			},
			span: {
				fontSize: 14,
				padding: 10,
				margin: 8,
				backgroundColor: "white",
				color: "red",
				display: "block",
				cursor: "pointer"
			}
		};

		return (
			<div style={style.main}>
				<h2 style={style.title}>
					Fail! You got {this.props.score}
				</h2>
				<p>
					your highscore is {this.props.highscore}
				</p>
				<span
					style={style.span}
					onClick={this.props.onReset}>
					Try again?
				</span>
			</div>
		);
	}
});

module.exports = FailScreen;
