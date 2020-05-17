import Link from 'next/link';

const linkStyle = {
		marginLeft: 320
};

const Header = () => (
	        <div>
	          <Link href="/">
	                <a style={linkStyle}>Home</a>
	          </Link>
	          <Link href="/about">
	                <a style={linkStyle}>About</a>
	          </Link>
		  <Link href="/campground">
			<a style={linkStyle}>Search a Campground</a>
		  </Link>
		<style jsx>{`
			a:link {
				color: green;
			}
			
			a:visited {
				color: blue;
			}
			
			a:hover {
				color: blue;
			}
			
			a:active {
				color: blue;
			}
		`}</style>
	        </div>
);

export default Header;
