# 🌦️ Django Weather API

## 📌 Project Overview  
This is a Django-based backend API that retrieves weather information from [WeatherAPI.com](https://www.weatherapi.com/) based on a given **state** (or city) and **date**. The project is developed inside a **virtual environment** to keep dependencies isolated and avoid conflicts with other projects.

---

## 1. Project Setup

### Goal  
Create an isolated environment for the project to prevent dependency conflicts.

### Steps  
1. Create a project folder.  
2. Activate a virtual environment using `venv`.  
3. Install Django and required dependencies:  
   ```bash
   pip install django django-cors-headers requests.
   ```
---

## 2. Creating the Weather App
### Goal
Create a dedicated Django module for handling weather-related logic.

### Steps
1. Run:
````python
python manage.py startapp weather
````
2. Add 'weather' and 'corsheaders' to INSTALLED_APPS in settings.py.
---

## 3. Setting up the Weather Endpoint
### Goal
Provide an endpoint that returns weather information for a given state and date.

**Endpoint:**
```python
GET /api/weather?state=STATE_NAME&date=YYYY-MM-DD
```
### Steps
1. Create a view in views.py to handle state and date parameters.
2. Register the endpoint in ***urls.py***.

## 4. External API Integration 
### Goal
Fetch real weather data from WeatherAPI.com.

### Steps
1. Use the requests library in views.py.
2.Query the Weather API with the provided state and date.
3.Return the response as JSON.

**Example view:**

````python
import requests
from django.http import JsonResponse

def get_weather(request):
    state = request.GET.get('state')
    date = request.GET.get('date')
    api_key = "THE_API_KEY(de5ea590b1a3424db79151652250808)"
    url = f"http://api.weatherapi.com/v1/history.json?key={api_key}&q={state}&dt={date}"
    response = requests.get(url)
    return JsonResponse(response.json())
````
## 5 T.esting with Postman
### Goal
Verify that the endpoint works correctly.

### Steps
1. Start the server:

````bash
python manage.py runserver
````
2. Send a GET request with Postman:

-URL: [http://127.0.0.1:8000/api/weather?state=Tunis&date=2025-08-09]

3. Verify the JSON response containing location, date, condition, and temperature data.




## 5.README.md Documentation
### Goal
Provide clear instructions on how to install, configure, and run the project. 
 