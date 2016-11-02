
// Import Alexa's node package
var alexa = require('alexa-app'),
	weatherService = require('./weather-service.js')

// Create a new Alexa app for our project
var app = new alexa.app("simpleweather")


/*
	This is what runs when starting your app in Alexa
*/
app.launch(function(req, res) {
	var prompt = "Select a city"
	var reprompt = "Could not find that city. Select another one"

	res .say(prompt) 			 		// Make Alexa say something
		.reprompt(prompt)				/* If user takes too long to respond...
											keep asking until user gives a response */
		.shouldEndSession(false)		// Do not end the app yet.
})


/*
	Defining an available intents
	This one takes 1 input from the user (the slot), the slot "CITY", which is a LITERAL (a string)
	The possible phrases an user can call this intent (the utterances) are:
		"Weather <CITY>"
		"Weather for <CITY>"
		"Weather at <CITY>"
		"Weather in <CITY>"
*/
app.intent('AskWeatherInCity', {
		slots: { CITY: "LITERAL" },
		utterances: ["{Weather} {|for|at|in} {CITY}"]
	}, 

	function(req, res) {							/* This is the body of the intent,
													   what will happen when the user calls it */

		var city = req.slot("CITY")					// Get the value in the slot "CITY"

		weatherService.getWeatherForCity(city) 		// Use our app's weather service
		.then(function(result) {
			var response = `Weather at City ${city} with min ${result.min} and max ${result.max}`

			res.say(response).send()				// Say the response we created

			res.shouldEndSession(true);				// End the app
		})
		.catch(function	(err) {

			res.say(`Sorry, weather is not available`).send() 	// Also have a nice error message

		})
		return false
	}
)

module.exports = app