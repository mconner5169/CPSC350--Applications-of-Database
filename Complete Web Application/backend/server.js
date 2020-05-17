const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 3030);
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "food",
	password: "c5mmrc3",
	database: "food_nutrition",
};

const pool = new Pool(config);

app.get("/api" async (req, res) => {


const template = "SELECT description, kcal, protein_g, carbohydrate_g FROM entries WHERE description LIKE $1% LIMIT 25";
const template2 = "SELECT description, kcal, protein_g, carbohydrate_g FROM entries WHERE description LIKE %$1% LIMIT 25";
const response2 = await pool.query(template, [req.query.q]);
const response = await pool.query(template, [req.query.q]);

	if(response.rowCount == 0){
		return null;
	}
	else {
		res.json(response.rows);
	}

	if(response2.rowCount == 0) {
		return null;
	}
	else {
		res.json(response2.rows);
	}
});

app.listen(app.get("port"), () => {
	console.log(`Find the server at port: ${app.get("port")}`);
});