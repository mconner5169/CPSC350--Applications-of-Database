require ("isomorphic-fetch");

function getProfile(campground){
	return fetch(`http://35.190.190.219/info?q=${campground}`).then(function(resp){
		return resp.json();
	})
}

function handleError(error){
	console.warn(error);
	return 'Campground not found';
};

module.exports = {
	getInfo: function(campground) {
		return getProfile(campground).catch(handleError);
	}
};
