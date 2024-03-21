
# What is this file is for ? 🦝
This file is for the routes of the API handled by Mockoon. 
It will specify the routes and their DTO. And how to import the configuration file in Mockoon.



# Where is it running ?
By default, the API will run on port http://localhost:3000/. Feel free to change it on the .env file  (REACT_APP_AXIOS).


# How to import the configuration file in Mockoon
The configuration file is named `mockoon.json` and is located in the root of the project.
To import the configuration file, open Mockoon and click on the `Import/Export` button on the top right corner of the screen. Then, click on the `File` button and select the `Open environnement` file.



# Routes

### GET /api/v1/health
- Description: Check the health of the API
- Response: 
  - 200: The API is healthy
  - 500: The API is not healthy

