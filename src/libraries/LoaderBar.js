import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import styled, { keyframes } from "styled-components";
import { RotateSpinner } from "react-spinners-kit";
// import Loader from 'react-loader-spinner'
// var Loader = require('react-loader');
import ReactLoading from 'react-loading';

var options = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	lines: 13,
	length: 20,
	width: 10,
	radius: 30,
	scale: 1.00,
	corners: 1,
	color: '#ab91c1',
	background: 'white',
	opacity: 0.5,
	rotate: 0,
	direction: 1,
	speed: 1,
	trail: 60,
	fps: 20,
	zIndex: 2e9,
	shadow: false,
	hwaccel: false
};

export class LoaderBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loader: true
		};

	}

	componentDidMount() {
		if (this.props.isLoggedIn === null || this.props.isLoggedIn) {
			this.setState({ loader: true });
		}
		this.subcri = PubSub.subscribe('msg', (msg, data) => {
			this.setState({ loader: data });
		});
		//setTimeout(this.unsubscribe,5000);
	}

	componentWillUnmount() {
		PubSub.unsubscribe(this.subcri);
	}

	unsubscribe = () => {
		this.setState({ loader: true });
	}

	render() {
		return (
			this.state.loader ?

				<div className="loader">
					<ReactLoading type="spin" color="#ff8b92" className="loader-section" />
				</div>

				:
				<div>
					<div className="loader-hide">
						<ReactLoading type="spin" color="#ff8b92" className="loader-section-hide" />
					</div>
				</div>
		)
	}
}



