require("isomorphic-fetch");

funciton getProfile(foodSearch){
	return fetch(`http://zacharski.org/files/courses/cs350/food.sql`)
}

function handleError(error){
	console.warn(error);
	return null;
}

module.exports = {
	getInfo: function(foodSearch){
		return getProfile(foodSearch).catch(handleError);
	}
}