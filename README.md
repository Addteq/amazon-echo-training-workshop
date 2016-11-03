## **Sample Alexa app - Simple Weather Service**
___

## **Overview**
This is a simple example of an Alexa app to use with Amazon Echo.

* **weather-service.js** retrieves the current temperature from OpenWeatherAPI

* **index.js** contains the interface Amazon Alexa. It defines a simple intent (an action) to retrieve the weather for a city, with CITY as a slot (user input), and a few utterances (accepted user commands) that trigger the action.

* **weatherAPIKey.json** must have the API Key obtained from OpenWeatherAPI site to use their service. The saved version in this repo does NOT have an API key, you must generate one and put it in this file.

## **Requirements**
___
Install NodeJS LTS (preferably v4.3.0, so it matches AWS Lambda).

After cloning this repository, install the Node dependencies with the command:
~~~
npm install
~~~
Also, make sure to generate a new API key from OpenWeatherAPI to use this app. It's free and quick. Just go to https://openweathermap.org/api, sign up for an account and it'll provide you an API key to use.

Place your API key in the file **weatherAPIKey.json**

Additionally, to test this app locally without using Amazon Echo / Alexa yet, do the following:
* Clone the project **alexa-app-server** from this Github repository: https://github.com/matt-kruse/alexa-app-server. Install the dependencies with **npm install** after doing it.
* In the new cloned directory, locate the folder **examples/apps** and copy this project's folder in it. You directory path should be **alexa-app-server/examples/apps/simple-weather**
* Go to the **examples** folder, and run this command to start the test server:
    ~~~
    node server
    ~~~
* With the server running, we can use it to test our Alexa app launch and intents. Go to this URL and play with it: **http://localhost:8080/alexa/simpleweather**

## **Using with Amazon Echo / Alexa**
___
To use this app with an Alexa device, we need to do 2 things: Upload the app code to AWS Lambda, and create a new Alexa Skill in Amazon Alexa Service.

### Uploading to AWS Lambda
Create an AWS account in https://aws.amazon.com/. The Free Tier/Plan is good enough for this.

Create a new zip of the files that contain the code used by the app. This includes the **node_modules/** directory, since these are the packages that the app depends on. Files/Folders you need to package are:
* index.js
* weather-service.js
* weatherAPIKey.json
* node_modules/

Go to AWS Lambda console and do the following:
1. Click on **Create a Lambda Function**
2. Select the template **Blank Function** and click Next
3. In the trigger screen, click in the empty dotted space, and select **Alexa Skills Kit**. This will allow the Alexa Service to run the app in Lambda. Then next
4. Provide a name to the function, and set the field "Existing Role" to **lambda_basic_execution**
5. In the field "Code Entry Type", select option **Upload ZIP file** and upload the zip file we created before. Click next.
6. After the function has been created, look in the top-right of the screen for the **ARN** string. Copy this string.

### Creating a new Alexa Skill
1. Go to the page https://developer.amazon.com/, sign in with your Amazon account and click in **ALEXA** tab
2. Click in the option **Alexa Skills Kit -> Get started**
3. Click in **Add a new skill**
4. In the "Skill information" screen, provide a name and an invocation name. The invocation name is what the user will use to launch your Alexa app from the device.
5. In the "Interaction Model" screen, paste the **Intent Schema** and **Sample Utterances** that your Alexa skill will receive. You can obtain these from the **alexa-app-server** used during testing (check the "Requirements" section above about this).
6. In the "Configuration" screen, select the Endpoint type **AWS Lambda ARN**, with region "North America", and provide the ARN string copied from the Lambda console.

After this, your Alexa skill will be ready for testing. There is no need to continue with the Publishing setup, because now your registered Amazon Echo devices are able to connect to your Alexa skill.