const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 3000);
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "workshop1",
	password: "kmqzx9Un",
	database: "workshop1",
};

const pool = new Pool(config);

app.get("/api", async (req, res) => {
	try{
		const template = "SELECT DISTINCT workshop FROM attendees";
		const temp2 = "SELECT attendee FROM attendees WHERE workshop = $1";
		const response = await pool.query(template);
		const response2 = await pool.query(temp2, [req.query.workshop]);

		if(req.query.workshop != undefined){
			if (response2.rowCount == 0){
				res.json({error: "workshop not found"});
			} else {
				const attendee = response2.rows.map(function(item) {
					return item.attendee;
				});
			res.json({attendees: attendee});
			}
		}

		if (req.query.workshop == undefined){
			if (response.rowCount == 0){
				res.json({error: "can't display workshops"});
			} else {
				const workshops = response.rows.map(function(item) {
					return item.workshop;
				});
			res.json({workshops: workshops});
			}
		}
	}
	catch (err){
		console.error("Error running query " + err);
		res.json({status: "error"});
	}
});

app.post("/api", async (req,res) => {
	const name = req.body.attendee;
	const wksp = req.body.workshop;

	try {
		const temp2 = "SELECT * FROM attendees WHERE attendee = $1 AND workshop = $2";
		const response2 = await pool.query(temp2, [name, wksp]);

		if (response2.rowCount > 0) {
			res.json({error: "attendee already enrolled"});
		} else {
			const template = "INSERT INTO attendees (attendee, workshop) VALUES ($1, $2)";
			const response = await pool.query(template, [name, wksp]);
			res.json({attendee: name, workshop: wksp});
		}

	}

	catch (err) {
		console.error("Error running query " + err);
		res.json({status: "error"});
	}
});

app.listen(app.get("port"), () => {
	console.log(`Find the server at http://localhost:${app.get("port")}`);
});
