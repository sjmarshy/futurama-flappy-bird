"use strict";

const React = require("react");

const Menu = React.createClass({
	render: function () {

		let style = {
			div: {
				height: "auto",
				color: "white",
				width: 400,
				fontFamily: "sans-serif",
				alignSelf: "center",
				textAlign: "center",
				backgroundColor: "#4D5069"
			}
		};

		return (
			<div style={style.div}>
				<p>
				A Futurama themed flappy bird clone built for
				retrofuzz. The mechanics are much the same as
				flappy bird, though the obstacles are handled a
				little differently.
				</p><br/>
				<p>
				Fry has once again defeated the brains, who he
				managed to trap in individual glass boxes for
				some raisin. Unfortunately, using his superior
				brain, he forgot that the brains could float -
				so the glass boxes don't really do anything...
				guess he better use his piloting skills to get
				away.
				</p>
				<h3>
				Press the space-bar to play
				</h3>
			</div>
		);
	}
});

module.exports = Menu;
