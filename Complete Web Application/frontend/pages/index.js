import Layout from '../components/MyLayout';
import React from 'react';
import {getInfo} from '../lib/utils.js';

class foodSearch extends React.Component {
	constructor(props) {
                super(props);
                this.state={search: ""};
        }

        handleUpdate(evt){
                this.setState({search: evt.target.value});
        }

        async handleSearch(evt){
                const food = await getInfo(this.state.search);
                this.setState({food});
        }

    render() {
		return (
			<Layout>
			<center>
			<img src="https://i.pinimg.com/originals/70/f3/43/70f343423a5addd6f95d5ece02c2adb5.png"
			width="200"
			height="200"
			alt="Fruit basket" />
			<h1>Food Nutrition Information</h1>
			<h3>Search A Food Item</h3>
			<p><input type='text' placeholder='Search Food...' value={this.state.search} onChange={this.handleUpdate.bind(this)}/></p>
			</center>

			<div className='button-style' onClick={this.handleSearch.bind(this)}>Search</div>

			{this.state.food ? <div>
				<br />
				<
				}

	<style jsx>{`
		h1,
		a {
			font-family: 'Comic Sans MS';
			text-align: center;
			color: white;
		}
		h3,
		a {
			font-family: 'Comic Sans MS';
			text-decoration: underline;
		}
		`}</style>
		</Layout>
		);
	}
}

export default foodSearch;