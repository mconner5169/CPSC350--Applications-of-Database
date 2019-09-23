const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("port", 8080);

app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

//The address to print a message to http://localhost:8080
app.get("/hello", (req, res) => {
	res.json("Hello! I just figured out how to create a website from behind the scenes.");
});

//Get request
app.get("/vacancy", (req, res) => {
	console.log(req.query);
	const campground = req.query.q;
	if (campground == 'Saddle'){
		res.json({campground: campground, sites: 5});
	} else {
		res.json({campground: campground, sites: 0});
	}
});

//Post request
app.post("/reserve", (req, res) => {
	console.log(req.body);
	const first = req.body.firstname;
	const last = req.body.lastname;
	const campground = req.body.campground;
	const sites = req.body.sites;
	res.json({reservation_number: 1, campground: campground});
});

app.listen(app.get("port"), () => {
	console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});

