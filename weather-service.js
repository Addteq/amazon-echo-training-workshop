var rp =  require('request-promise')

var API_KEY = '3c2f5b2bd78c2c1d28e9051298effefa'

module.exports.getWeatherForCity = function(city) {
	return new Promise(function(resolve, reject) {
		requestWeatherFromAPI(city)
		
		.then(function(result) {
			resolve({
				min: toFarenheit(result.main.temp_min), 
				max: toFarenheit(result.main.temp_max)
			})
		})

		.catch(function(err) {
			reject(err)
		})
	})
}



function requestWeatherFromAPI(city) {

	var options = {
	    uri: 'http://api.openweathermap.org/data/2.5/weather',
	    qs: {
	        q: city,
	        APPID: API_KEY
	    },
	    headers: {
	        'User-Agent': 'Request-Promise'
	    },
	    json: true
	};

	return rp(options)
}

function toFarenheit(kelvin) {
	return kelvin * (9/5) - 459.67
}