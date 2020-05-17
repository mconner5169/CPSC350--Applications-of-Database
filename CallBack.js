//CallBack example from Asynchronous Javascript Proramming

function getData(ms, query){
	setTimeout(function() {
		console.log(query);
	}, ms);
}

function query() {
	getData(3000, "Unicorn Store");
	console.log("A1");
	getData(1000, "Captain Marvel");
	console.log("A2");
}

query();
