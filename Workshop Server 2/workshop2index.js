const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var dateFormat = require('dateformat');

app.set("port", 3030);
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "workshop2",
	password: "4vvdpgmk",
	database: "workshop2",
};

const pool = new Pool(config);

app.post("/create-user", async (req,res) => {
	const fname = req.body.firstname;
	const lname = req.body.lastname;
	const uname = req.body.username;
	const email = req.body.email;

	try {
		const template = "SELECT username FROM users WHERE username = $1";
		const response = await pool.query(template, [uname]);

		if (response.rowCount > 0) {
			res.json({status: "username taken"});
		} else {
			const template2 = "INSERT INTO users (username, firstname, lastname, email) VALUES ($1, $2, $3, $4)";
			const response2 = await pool.query(template2, [uname, fname, lname, email]);
			res.json({status: "user added"});
		}
	} 
	catch (err) {
		console.error("Error running query " + err);
		res.json({status: "error"});		
	}
});

app.delete("/delete-user", async (req,res) => {
	try{
		const dtemp = "DELETE from users where username = $1";
		const dresponse = await pool.query(dtemp, [req.query.username]);
	
		if (dresponse.rowCount > 0) {
			res.json({status: "username not found"});
		} else {
			res.json({status: "deleted"});
		}
	}
	catch (err) {
		console.error("Error running query " + err);
		res.json({status: "error"});		
	}
});

app.get("/list-users", async (req, res) => {
	try{
		const type = req.query.type;
		const template3 = "SELECT * FROM users WHERE NOT username IN ('spam')";
		const temp4 = "SELECT firstname, lastname FROM users WHERE NOT firstname IN ('Spam')";
		const response3 = await pool.query(template3);
		const response4 = await pool.query(temp4);
		
		if (type != "full") {
			res.json({users: response4.rows});
		}
		else{
			res.json({users: response3.rows});
		}
	}
	catch (err){
		console.error("Error running query " + err);
		res.json({status: "error"});
	}
});

app.post ("/add-workshop", async (req, res) => {
	const title = req.body.title;
	const wdate = req.body.date;
	const loc = req.body.location;
	const seatcount = req.body.maxseats;
	const teacher = req.body.instructor;

	try {
		const template5 = "SELECT title FROM workshops WHERE title = $1 AND date = $2 AND location = $3";
		const response5 = await pool.query(template5, [title, wdate, loc]);

		if (response5.rowCount > 0) {
			res.json({status: "workshop already in database"});
		} else {
			const temp6 = "INSERT INTO workshops (title, date, location, maxseats, instructor) VALUES ($1, $2, $3, $4, $5)";
			const response6 = await pool.query(temp6, [title, wdate, loc, seatcount, teacher]);
			res.json({status: "workshop added"});
		}
		
	} 
	catch (err) {
		console.error("Error running query " + err);
		res.json({status: "error"});		
	}
});

app.post ("/enroll", async (req, res) => {
	const title = req.body.title;
	const wdate =  req.body.date;
	const loc = req.body.location;
	const maxseats = req.body.maxseats;
	const teacher = req.body.instructor;
	const uname = req.body.username;

	try {
		const template7 = "SELECT username FROM users WHERE username = $1";
		const temp8 = "SELECT title FROM workshops WHERE title = $1";
		const temp88 = "SELECT title, date, location FROM workshops WHERE title = $1 AND date = $2 AND location = $3";
		const template9 = "SELECT username, title, date, location FROM linking WHERE username = $1 AND title = $2 AND date = $3 AND location = $4";
		const temp10 = "SELECT maxseats FROM linking WHERE title = $1 AND location = $2 AND date = $3";
		const response7 = await pool.query(template7, [uname]);
		const response8 = await pool.query(temp8, [title]);
		const response88 = await pool.query(temp88, [title, wdate, loc]);
		const response9 = await pool.query(template9, [uname, title, wdate, loc]);
		const response10 = await pool.query(temp10, [title, loc, wdate]);

		if (response7.rowCount == 0) {
			res.json({status: "user not in database"});
		}
		else if (response8.rowCount == 0) {
			res.json({status: "workshop does not exist"});
		}
		else if (response88.rowCount == 0) {
			res.json({status: "workshop does not exist"});
		}
		else if (response9.rowCount > 0) {
			res.json({status: "user already enrolled"});
		}
		else if (response10.rowCount == req.body.maxseats) {
			res.json({status: "no seats available"});
		}
		else {
			const addTemp = "INSERT INTO linking (title, date, location, maxseats, instructor, username) VALUES ($1, $2, $3, $4, $5, $6)";
			const addResponse = await pool.query(addTemp, [title, wdate, loc, maxseats, teacher, uname]);
			res.json({status: "user added"});
		}
	}
	catch (err){
		console.error("Error running query " + err);
		res.json({status: "error"});
	}
});

app.get("/list-workshops", async (req, res) => {
	
	try {
		const getTemp = "SELECT title, date, location FROM workshops ORDER BY title, date";
		const getResponse = await pool.query(getTemp);
			
		if (getResponse.rowCount == 0) {
			res.json({status: "workshops can't be displayed"});
		} else {
			res.json({workshops: getResponse.rows});
		}
		
	}
	catch (err) {
		console.error("Error running query " + err);
		res.json({status: "error"});
	}
});

app.get("/attendees", async (req, res) => {
	const title = req.query.title;
	const wdate = req.query.date;
	const loc = req.query.location;

	try{
		const template11 = "SELECT users.firstname, users.lastname FROM users JOIN linking ON users.username = linking.username WHERE linking.title = $1 AND linking.date = $2 AND linking.location = $3 ORDER BY linking.username";
		const template13 = "SELECT username FROM linking WHERE title = $1 AND date = $2 AND location = $3";
		const getResponse2 = await pool.query(template11, [title, wdate, loc]);
		const getResponse4 = await pool.query(template13, [title, wdate, loc]);
		
		if (getResponse2.rowCount == 0) {
			res.json({error: "workshop does not exist"});
		} 		
		else if (getResponse4.rowCount == 0) {
			res.json({eror: "nobody's enrolled"});
		} 
		else {
			res.json({attendees: getResponse2.rows});
		}
	}
	catch (err) {
		console.error("Error running query" + error);
		res.json({status: "error"});
	}
});

app.listen(app.get("port"), () => {
	console.log(`Find the server at port :${app.get("port")}`);
});
