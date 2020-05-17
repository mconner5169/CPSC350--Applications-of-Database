import Layout from '../components/MyLayout';
import Link from 'next/link';

export default function About() {
	return (
		<Layout>
		  <h1>About</h1>
			<center>
			<img src="https://blog.trekaroo.com/wp-content/uploads/2013/05/RV-Camping-with-kids-Shutterstock.jpg" 
			width="600" 
			height="400" 
			alt="People gathered around a campfire listening to a band" />
			</center>
		  	<h3>This website allows you to search for various campgrounds that interests you. 
		     	If you would like to know more about a particular campground,
		     	click the Search Campground link at the top of this page. Otherwise, close this website 
		    	because it's only equipped to display information about campgrounds.</h3>
		<style jsx>{`
			h1,
			a {
				font-family: 'Arial';
				text-decoration: underline;
				text-align: center;
				color: brown;
			}

			h3,
			a {
				font-family: 'Arial';
				margin: 50px 0;
				text-align: center;
				color: brown;
			}
		`}</style>
		</Layout>
	);
}
