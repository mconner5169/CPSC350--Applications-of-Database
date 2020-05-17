import Layout from '../components/MyLayout';
import Link from 'next/link';
import React from 'react';
import {getInfo} from '../lib/utils.js';

class searchCampground extends React.Component {
	constructor(props) {
		super(props);
		this.state={search: ""};
	}

	handleUpdate(evt){
		this.setState({search: evt.target.value});
	}

	async handleSearch(evt){
		const campground = await getInfo(this.state.search);
		this.setState({campground});
	}

	render() {
		return (
		<Layout>
		<h1>Campground Search</h1>
		<center>
		<p><input type='text' placeholder='Search...' value={this.state.search} onChange={this.handleUpdate.bind(this)}/></p>
		
		<div className='button-style' onClick={this.handleSearch.bind(this)}>Search</div>
		
		{this.state.campground ? <div> 
			<br />
			<h3> {this.state.campground.name}</h3>
			<img style={{maxWidth: '300px', maxHeight: '300px' }} 
			src= {this.state.campground.image_url} /> <br />
			<h4>{this.state.campground.closest_town}</h4>
			<h4>{this.state.campground.restrooms}</h4>
			<p>{this.state.campground.description}</p>
			</div> : null}
		</center>
		<style jsx>{`
			h1,
			a {
				font-family: 'Arial';
				text-align: center;
				color: brown;
				text-decoration: underline;
			}
	
			.button-style {
				margin: auto auto;
				cursor: pointer;
				background-color: #4633FF;
				color: #ffffff;
				width: 100px;
				font-family: 'Arial';
				text-align: center;
			}

		`}</style>
		</Layout>
		);
	}
}

export default searchCampground;
