
# What is this file is for ? 🦝
This file is for the routes of the API handled by **MOCKOON**. 

It will specify the routes and their DTO. And how to import the configuration file in Mockoon.



# Where is it running ?
By default, the API will run on port http://localhost:3000/. Feel free to change it on the .env file  (REACT_APP_AXIOS).


# How to import the configuration file in Mockoon
The configuration file is named `mockoon.json` and is located in the root of the project.
To import the configuration file, open Mockoon and click on the `Import/Export` button on the top right corner of the screen. Then, click on the `File` button and select the `Open environnement` file.



# Routes

### GET /api/atelier/workshop/vehicles/
- Description: Returns all the vehicles in the workshop or empty array if no vehicles.
- Response: 
  - 200: 
  ``` JSON
   [
    {
     "id": "uuid",
     "img": "url",
     "matriculation": "ABC-123-ABC",
     "model": "206",
     "brand": "Peugeot",
     "owner": {
       "id": "uuid",
       "name": "Mathis Brouard"
     },
     "repair_type": "Carrosserie",
     "repair_duration": 180,
     "status": 0
   }
  ]
  ```

### POST api/workshop/vehicles/assignment
- Description: Affect the mechanic to the car uuid on a date provided in the body.
- Requirements: the date must be equal to "2021-09-01T00:00:00.000Z" to get 200
- Request: 
  - Body: 
  ``` JSON
  {
    "vehicle_id": "uuid",
    "mechanic_id": "uuid",
    "date": "2021-09-01T00:00:00.000Z"
  }
  ```
- Response:
- 200: 
  ``` JSON
  {
   "message": "Prise en charge le (date) planifié avec succès"
  }
  ```
- 400: 
  ``` JSON
  {
   "message": "Ce mécanicien ou ce véhicule n'est pas disponible à cette date"
  }
  ```
