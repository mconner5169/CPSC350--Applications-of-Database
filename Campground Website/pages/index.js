import Layout from '../components/MyLayout';
import Link from 'next/link';

export default function Index() {
	return (
		<Layout>
		  <h1>Campground Encyclopedia</h1>
			<center>
			<img src="https://www.smartertravel.com/uploads/2015/05/Camping-Gear-Hate-HERO-1400x500.jpg"
			width="1400"
			height="500"
			alt="Photo of forest with mountains in bakcground and a picnic table" />
			</center>
			<h3>Camping in the great outdoors transforms a regular old road trip into an epic experience.
			Sometimes spending time in the woods is not enough to capture the feeling of a special place.
			If you want the full experience of spending the day in the wilderness, then research a
			campground to find the perfect spot for you. Better start packing your bags because today
			you are going camping.</h3>
		<style jsx>{`
			h1,
			a {
				font-family: 'Arial';
				text-decoration: underline;
				text-align: center;
				margin: 200xp 0;
				color: brown;
			}

			h3,
			a {
				font-family: 'Arial';
				text-align: center;
				margin: 50px 0;
				color: brown;
			}
		`}</style>
		</Layout>
	);
}
